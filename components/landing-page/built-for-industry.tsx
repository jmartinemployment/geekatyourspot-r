import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faFunnelDollar,
  faBellConcierge,
  faFileInvoiceDollar,
  faUsersBetweenLines,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BuiltForIndustrySection() {
  return (
    <>
      {/* <section>
    
    
      </section> */}
      <section className="w-full grid grid-cols-12 gap-4 bg-[#0A080D] min-h-screen h-auto justify-center px-20">
        <div className="col-span-12">
          <h2 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            AI Use
            <span className="text-[#024059] text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
              Cases
            </span>
          </h2>
        </div>
        <div className="col-span-6 min-w-full min-h-screen bg-[#012840] px-0 mx-0 flex justify-center">
          <FontAwesomeIcon
            icon={faRobot}
            className="text-white mx-auto object-cover max-w-1/2"
          />
        </div>
        <div className="col-span-6 grid place-items-center min-w-full min-h-screen bg-white px-10">
          <div className="container">
            <h3 className="text-black text-2xl font-bold shadow-text">
              Marketing
            </h3>
            <ul className="list-disc text-lg text-black shadow-text pt-1">
              <li>
                <p className="text-black text-lg shadow-text">
                  <strong>Automated Content:</strong> Generative AI tools help
                  draft blog posts, social media captions, and email
                  newsletters, reducing the time needed for a full marketing
                  campaign from weeks to days.
                </p>
              </li>
              <li>
                <p>
                  <strong>Ad Spend Optimization:</strong> Deploy machine
                  learning algorithms to analyze campaign performance and
                  automatically shift budget to the highest-performing channels.
                </p>
              </li>
              <li>
                <p>
                  <strong>Customer Segmentation:</strong>Use predictive AI to
                  group customers by behavior and predict their lifetime value.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-4 min-w-full min-h-screen">
          <Card className="w-[full] py-0">
            <CardHeader className="space-y-0 gap-0 my-0 py-0 bg-[#023059] text-center">
              <FontAwesomeIcon
                icon={faRobot}
                className="w-72 h-72 text-white mx-auto"
              />
              <CardTitle className="text-white font-bold text-xl shadow-text "></CardTitle>
              <CardDescription className="my-0 py-0"></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc text-lg text-black shadow-text pt-1">
                <li>
                  <p>
                    <strong>Automated Content:</strong> Generative AI tools help
                    draft blog posts, social media captions, and email
                    newsletters, reducing the time needed for a full marketing
                    campaign from weeks to days.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Ad Spend Optimization:</strong> Deploy machine
                    learning algorithms to analyze campaign performance and
                    automatically shift budget to the highest-performing
                    channels.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Customer Segmentation:</strong>Use predictive AI to
                    group customers by behavior and predict their lifetime
                    value.
                  </p>
                </li>
              </ul>
              <p className="text-medium shadow-text">
                Streamline workflows by automating repetitive tasks like data
                entry, invoicing, and document management. Optimize supply
                chains, predict issues before they happen, and keep your
                business running efficiently.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4 min-w-full min-h-screen">
          <Card className="w-[full] py-0">
            <CardHeader className="space-y-0 gap-0 my-0 py-0 bg-[#012840] text-center">
              <FontAwesomeIcon
                icon={faRobot}
                className="w-72 h-72 text-white mx-auto"
              />
              <CardTitle className="text-white font-bold text-xl shadow-text ">
                <h3 className="pt-1">Sales</h3>
              </CardTitle>
              <CardDescription className="my-0 py-0"></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc text-lg text-black shadow-text pt-1">
                <li>
                  <p>
                    <strong>Lead Scoring:</strong> Predict which prospects are
                    most likely to convert based on historical interaction data.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Email Outreach:</strong> Automate hyper-personalized
                    email sequences and follow-ups.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Forecasting:</strong> Analyze pipeline data to
                    provide leadership with more accurate quarterly revenue
                    projections.
                  </p>
                </li>
              </ul>
              <p className="text-medium shadow-text">
                Streamline workflows by automating repetitive tasks like data
                entry, invoicing, and document management. Optimize supply
                chains, predict issues before they happen, and keep your
                business running efficiently.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4 min-w-full min-h-screen">
          <Card className="w-[full] py-0">
            <CardHeader className="space-y-0 gap-0 my-0 py-0 bg-[#025E73] text-center">
              <FontAwesomeIcon
                icon={faRobot}
                className="w-72 h-72 text-white mx-auto"
              />
              <CardTitle className="text-white font-bold text-xl shadow-text ">
                <h3 className="pt-1">Accounting</h3>
              </CardTitle>
              <CardDescription className="my-0 py-0"></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc text-lg text-black shadow-text pt-1">
                <li>
                  <p>
                    <strong>Fraud Detection:</strong> Monitor transactions in
                    real time to spot anomalies or unnecessary spending.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Automated Invoicing:</strong> Use optical character
                    recognition (OCR) mixed with AI to extract data from
                    physical or digital invoices and reconcile them with
                    purchase orders.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Report Generation:</strong> Summarize complex
                    financial documents and variance analyses into plain-text
                    executive summaries.
                  </p>
                </li>
              </ul>
              <p className="text-medium shadow-text">
                Streamline workflows by automating repetitive tasks like data
                entry, invoicing, and document management. Optimize supply
                chains, predict issues before they happen, and keep your
                business running efficiently.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-6 min-w-full min-h-screen"></div>
      </section>

      <section className="w-full bg-[#0A080D] min-h-screen">
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="grid grid-cols-2 container">
            <div>
              <div className="flex">
                <h2 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
                  Built For
                  <br />
                  <span className="text-[#024059] text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
                    Industry
                  </span>
                </h2>
              </div>
              <p className="text-white text-xl font-normal shadow-text py-5"></p>
            </div>
          </div>
          <Tabs
            defaultValue=""
            orientation="vertical"
            className="flex flex-row container gap-108"
          >
            <TabsList className="flex flex-col h-auto">
              <TabsTrigger
                variant="industryBuilt"
                value="Operations"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
              >
                Operations & Automation
              </TabsTrigger>
              <TabsTrigger
                value="Marketing"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
                variant="industryBuilt"
              >
                Marketing & Sales
              </TabsTrigger>
              <TabsTrigger
                value="Customer"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
                variant="industryBuilt"
              >
                Customer Service
              </TabsTrigger>
              <TabsTrigger
                value="Finance"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
                variant="industryBuilt"
              >
                Finance & Accounting
              </TabsTrigger>
              <TabsTrigger
                value="Human"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
                variant="industryBuilt"
              >
                Human Resources
              </TabsTrigger>
              <TabsTrigger
                value="Security"
                className="w-[400px] font-bold text-white text-xl shadow-text mb-1"
                variant="industryBuilt"
              >
                Security & Protection
              </TabsTrigger>
            </TabsList>

            <div className="w-full">
              <TabsContent
                value="Operations"
                className="flex flex-col w-full h-auto"
              >
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader className="space-y-0 gap-0 my-0 py-0">
                    <CardTitle className="">
                      <p>
                        <FontAwesomeIcon
                          icon={faRobot}
                          className="w-10 h-10 text-white shadow-box"
                        />
                      </p>
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Operations & Automation
                      </h3>
                    </CardTitle>
                    <CardDescription className="my-0 py-0">
                      <p className="text-white text-medium shadow-text">
                        Streamline workflows by automating repetitive tasks like
                        data entry, invoicing, and document management. Optimize
                        supply chains, predict issues before they happen, and
                        keep your business running efficiently.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Marketing">
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader className="space-y-0 gap-0 my-0 py-0">
                    <CardTitle className="text-white font-bold">
                      <FontAwesomeIcon
                        icon={faFunnelDollar}
                        className="w-8 h-8 text-white shadow-box"
                      />
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Marketing & Sales
                      </h3>
                    </CardTitle>
                    <CardDescription className="my-0 py-0">
                      <p className="text-white text-medium shadow-text">
                        Generate content in seconds, personalize customer
                        experiences, and identify high-quality leads. Use AI to
                        optimize pricing, improve conversions, and accelerate
                        revenue growth.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Customer">
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader className="space-y-0 gap-0 my-0 py-0">
                    <CardTitle className="text-white font-bold">
                      <FontAwesomeIcon
                        icon={faBellConcierge}
                        className="w-8 h-8 text-white shadow-box"
                      />
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Customer Service
                      </h3>
                    </CardTitle>
                    <CardDescription className="my-0 py-0">
                      <p className="text-white text-medium shadow-text">
                        Provide instant, 24/7 support with AI-powered chat
                        systems. Analyze customer sentiment in real time and
                        resolve issues faster while reducing support workload.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Finance">
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader>
                    <CardTitle className="text-white font-bold">
                      <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="w-8 h-8 text-white shadow-box"
                      />
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Finance & Accounting
                      </h3>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-white text-medium shadow-text">
                        Automate reporting, detect fraud, and improve financial
                        accuracy with AI-driven insights that keep your business
                        compliant and efficient.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Human">
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader>
                    <CardTitle className="text-white font-bold">
                      <FontAwesomeIcon
                        icon={faUsersBetweenLines}
                        className="w-8 h-8 text-white shadow-box"
                      />
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Human Resources
                      </h3>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-white text-medium shadow-text">
                        Simplify hiring with automated candidate screening and
                        streamline onboarding with AI assistants that support
                        employees from day one.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Security">
                <Card className="w-[full] bg-[#024059] shadow-box">
                  <CardHeader>
                    <CardTitle className="text-white font-bold">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        className="w-8 h-8 text-white shadow-box"
                      />
                      <h3 className="text-white font-bold text-xl shadow-text pt-1">
                        Security & Protection
                      </h3>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-white text-medium shadow-text">
                        Monitor systems in real time, detect threats instantly,
                        and protect your business with advanced AI-powered
                        cybersecurity and identity verification.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
}
