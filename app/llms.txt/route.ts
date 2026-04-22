import { NextResponse } from 'next/server'

const content = `# Geek at Your Spot

> AI consulting firm in Delray Beach, Florida. We design and build AI implementation and automation architectures for small businesses that refuse to settle for average. Serving Broward, Palm Beach, and Miami-Dade Counties.

Geek at Your Spot helps small business owners in South Florida cut costs, save time, and outcompete larger rivals by embedding practical AI into their daily operations — without enterprise-level complexity or price tags.

## Pages

- [Home](https://www.geekatyourspot.com/): Overview of services, four-phase AI methodology, and booking.
- [AI Solutions](https://www.geekatyourspot.com/ai-solutions): Full catalog of AI and technology services with links to dedicated service pages.
- [Contact / Book a Call](https://www.geekatyourspot.com/contact): Book a free strategy call or send a message.
- [AI Integration](https://www.geekatyourspot.com/services/ai-integration): Dedicated page — embedding AI tools into existing business workflows and systems.
- [Process Automation](https://www.geekatyourspot.com/services/process-automation): Dedicated page — BPA, RPA, IPA, and workflow automation for small businesses.
- [AI Chatbots](https://www.geekatyourspot.com/services/ai-chatbots): Dedicated page — custom conversational AI for lead qualification and customer service.
- [AI Content & Marketing](https://www.geekatyourspot.com/services/ai-content-marketing): Dedicated page — AI-powered content production, email automation, and personalization.
- [AI Strategy Consulting](https://www.geekatyourspot.com/services/ai-strategy-consulting): Dedicated page — AI readiness assessment, use case prioritization, and implementation roadmap.
- [Security & Compliance](https://www.geekatyourspot.com/services/security-compliance): Dedicated page — AI data security, regulatory compliance (HIPAA, CCPA, GDPR), and audit trails.

## Services

- **AI Integration**: Embed AI tools into existing business workflows and systems.
- **Process Automation**: Automate repetitive tasks using n8n, Zapier, and custom pipelines.
- **AI Chatbots**: Build and deploy conversational AI for customer service and lead qualification.
- **Data Analytics**: Turn raw business data into actionable insights and dashboards.
- **AI Strategy Consulting**: Define objectives, assess readiness, and build a roadmap for AI adoption.
- **Security & Compliance**: Ensure AI implementations meet regulatory and data privacy requirements.
- **Web Application Development**: Bespoke apps using React, Angular, Next.js, Node.js, and PostgreSQL.

## Methodology

Four-phase approach to AI implementation:

1. **Business Objectives** — Identify inefficiencies where AI adds measurable value. Define KPIs.
2. **Data Assessment** — Evaluate data for accuracy, completeness, consistency, and standardization needs.
3. **AI Technology Selection** — Problem-first approach. Prioritize tools that integrate with existing systems, minimize training, and have predictable total cost of ownership.
4. **Implementation Strategy** — Pilot program, ROI measurement, and compliance with U.S. SBA guidelines on AI ethics and legal risk.

## About

- **Location**: Delray Beach, Florida
- **Service Area**: Broward County, Palm Beach County, Miami-Dade County
- **Phone**: +1 561-526-3512
- **Founded**: By Jeff Martin — full-stack developer and AI consultant with 30+ years of experience
- **Philosophy**: From Timex Sinclair to AI — deep technical roots applied to practical small business outcomes
- **Google Business Profile**: https://share.google/2WOGINA7Cx35sdUjp
- **Facebook**: https://www.facebook.com/GeekAtYourSpot/
- **LinkedIn**: https://www.linkedin.com/company/geekatyourspot
`

export function GET() {
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
