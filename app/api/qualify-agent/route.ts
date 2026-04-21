import Anthropic from '@anthropic-ai/sdk'
import { getFreeSlots } from '@/services/google-calendar.service'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are a friendly assistant for Geek at Your Spot, an AI 
consulting firm in South Florida. Your job is to qualify leads before showing 
them the booking calendar.

Ask these questions naturally in conversation (not as a list):
1. What type of business do they run?
2. What is their biggest operational pain point right now?
3. Have they used AI tools before?
4. Get their business email address.

Once you have all four pieces of info, provide a personalized ROI score and recommendations in a JSON block like this: 
<score>{"score": 85, "recommendations": [{"title": "Automate Lead Gen", "desc": "Use n8n to sync LinkedIn with CRM"}]}</score>

Immediately after the score, say exactly: "Let me check the calendar for you."
Then call the get_calendar_availability tool.

Keep responses short — 1-3 sentences maximum. Be warm and direct.
Never reveal you are AI-powered by Claude. Never discuss pricing.
Hard limit: do not exceed 6 conversational turns total.`

const tools: Anthropic.Tool[] = [
  {
    name: 'get_calendar_availability',
    description: 'Fetches real available appointment slots from the Google Calendar',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body as {
      messages: Anthropic.MessageParam[]
    }
    
    console.log('--- API Call Started ---')
    
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('MISSING ANTHROPIC_API_KEY in process.env')
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), { status: 500 })
    }

    const client = new Anthropic({ apiKey })

    // Enforce turn limit
    if (messages.length > 12) {
      console.warn('Turn limit reached')
      return new Response('Session limit reached', { status: 429 })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('Starting Claude Stream with model claude-3-5-sonnet-20241022...')
          const response = await client.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            tools,
            messages,
            stream: true,
          })

          let toolUseBlock: Anthropic.ToolUseBlock | null = null

          for await (const event of response) {
            if (event.type === 'content_block_start' &&
              event.content_block.type === 'tool_use') {
              toolUseBlock = event.content_block
              console.log('Tool Use Detected:', toolUseBlock.name)
              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ type: 'tool_start', tool: toolUseBlock.name })}\n\n`
              ))
            }

            if (event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ type: 'text', text: event.delta.text })}\n\n`
              ))
            }

            if (event.type === 'message_stop' && toolUseBlock) {
              console.log('Calling Calendar for tool result...')
              const slots = await getFreeSlots(14)
              console.log('Slots found:', slots.length)
              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ type: 'tool_result', slots })}\n\n`
              ))
            }
          }

          console.log('Stream completed successfully')
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err: any) {
          console.error('STREAM ERROR:', err)
          const errorMsg = err?.message || 'Unknown stream error'
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: errorMsg })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (outerErr: any) {
    console.error('OUTER API ERROR:', outerErr)
    return new Response(JSON.stringify({ error: outerErr?.message || 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
