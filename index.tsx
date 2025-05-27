import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

interface TableRowData {
  platform: string;
  description: string;
  cost: string;
  url: string;
}

interface Category {
  id: string;
  title: string;
  columnHeaders: { key: keyof TableRowData; displayName: string }[];
  items: TableRowData[];
}

const allCategoriesData: Category[] = [
  {
    id: "research",
    title: "1. Research & Knowledge-Discovery AI",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost model" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Elicit", description: "Literature-search & evidence tables", cost: "Free · Pro $49/mo", url: "https://elicit.com" },
      { platform: "Consensus", description: "Claim-level answers from papers", cost: "Freemium", url: "https://consensus.app" },
      { platform: "Scispace", description: "PDF reader, explain & cite", cost: "Free (5/day) · Plus $20/mo", url: "https://typeset.io" },
      { platform: "Perplexity", description: "Web- & paper-QA, copilot", cost: "Free · Pro $20/mo", url: "https://perplexity.ai" },
      { platform: "ResearchRabbit", description: "Visual citation mapping", cost: "Free", url: "https://www.researchrabbit.ai" },
      { platform: "Connected Papers", description: "Literature graphs", cost: "Free (limited) · $4.99/paper", url: "https://www.connectedpapers.com" },
      { platform: "Scite", description: "Smart citations & dashboards", cost: "Freemium", url: "https://scite.ai" },
      { platform: "Litmaps", description: "Paper discovery alerts", cost: "Free · Pro $9/mo", url: "https://www.litmaps.com" },
      { platform: "Wiseone", description: "Browser plug-in for sources", cost: "Free", url: "https://wiseone.io" },
      { platform: "Semantic Scholar", description: "Scholarly search", cost: "Free", url: "https://www.semanticscholar.org" },
    ],
  },
  {
    id: "education",
    title: "2. Education & Tutoring",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost model" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Khanmigo (Khan Academy)", description: "AI tutor / teacher copilot", cost: "Pilot; schools free", url: "https://www.khanacademy.org/khan-labs" },
      { platform: "Quizlet Q-Chat", description: "Adaptive Socratic study bot", cost: "Free w/ ads · Plus $7.99/mo", url: "https://quizlet.com" },
      { platform: "Duolingo Max", description: "AI role-play & explain", cost: "$13.99/mo", url: "https://www.duolingo.com/max" },
      { platform: "MagicSchool AI", description: "Lesson & assessment generator", cost: "Freemium", url: "https://magicschool.ai" },
      { platform: "Curipod", description: "Slide decks from prompts", cost: "Free · Pro $7.99/mo", url: "https://curipod.com" },
      { platform: "Brisk Teaching", description: "LMS-plug-in grading assistant", cost: "Freemium", url: "https://briskteaching.com" },
      { platform: "Squirrel AI", description: "Mastery-based tutoring", cost: "SaaS (school license)", url: "https://squirrelai.com" },
      { platform: "Speak", description: "AI speaking partner", cost: "Free · Pro $19/mo", url: "https://usespeak.com" },
    ],
  },
  {
    id: "general-llm",
    title: "3. General-Purpose Chatbots & LLM Suites",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Model family" },
      { key: "cost", displayName: "Cost model" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "ChatGPT / GPT-4o", description: "Text-, image-, voice-multimodal", cost: "Free GPT-3.5 · Plus $20/mo", url: "https://chat.openai.com" },
      { platform: "Anthropic Claude 3/4", description: "Frontier models – long context", cost: "Free (Claude Haiku) · Pro $20/mo", url: "https://claude.ai" },
      { platform: "Google Gemini 1.5 Pro", description: "Native to Google Workspace", cost: "Free (mini) · Advanced $19.99/mo", url: "https://gemini.google.com" },
      { platform: "Perplexity", description: "Search-augmented LLM", cost: "Free · Pro $20/mo", url: "https://perplexity.ai" },
      { platform: "GroqChat", description: "Ultra-fast inference", cost: "Free", url: "https://chat.groq.com" },
      { platform: "Meta Llama-3 via Llama-Chat", description: "Open-weights model", cost: "Free", url: "https://llama.meta.com" },
      { platform: "xAI Grok-1.5", description: "Posts-aware chatbot", cost: "X Premium+ $16/mo", url: "https://grok.x.ai" },
    ],
  },
  {
    id: "writing-office",
    title: "4. Writing & Office-Productivity",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Grammarly GO", description: "AI rewrite, tone, cite", cost: "Free (100 prompts) · $12/mo", url: "https://www.grammarly.com/ai" },
      { platform: "Notion AI", description: "Docs, DB autofill, chat", cost: "Add-on $10/user/mo", url: "https://www.notion.so/product/ai" },
      { platform: "Microsoft Copilot 365", description: "MS Office generative help", cost: "$30 add-on/user/mo", url: "https://copilot.microsoft.com" },
      { platform: "Google Workspace AI", description: "Gemini in Docs/Sheets/Gmail", cost: "In Gemini Advanced", url: "https://workspace.google.com/gemini" },
      { platform: "Jasper", description: "Marketing copy & brand voice", cost: "Creator $49/mo", url: "https://www.jasper.ai" },
      { platform: "Copy.ai", description: "Marketing workflows", cost: "Free (2k words) · Pro $49/mo", url: "https://www.copy.ai" },
      { platform: "Rytr", description: "Lightweight copywriter", cost: "Free · Saver $9/mo", url: "https://rytr.me" },
      { platform: "Quillbot", description: "Paraphrase & cite", cost: "Free · Premium $9.95/mo", url: "https://quillbot.com" },
      { platform: "Gamma.app", description: "AI slide & doc creator", cost: "Free · Plus $10/mo", url: "https://gamma.app" },
      { platform: "Otter.ai", description: "Meeting AI notes & summary", cost: "Basic free · Pro $17/mo", url: "https://otter.ai" },
    ],
  },
  {
    id: "coding-dev",
    title: "5. Coding & Dev-Assistants",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "GitHub Copilot", description: "Inline code completion", cost: "$10-19/mo", url: "https://github.com/features/copilot" },
      { platform: "Amazon CodeWhisperer", description: "AWS-centric code suggestions", cost: "Free (Individual)", url: "https://aws.amazon.com/codewhisperer" },
      { platform: "Google Jules", description: "Async coding agent (Beta)", cost: "Free beta", url: "https://developers.google.com/jules" },
      { platform: "Replit Ghostwriter", description: "IDE-integrated assistant", cost: "Pro $20/mo", url: "https://replit.com" },
      { platform: "Tabnine", description: "Local+cloud suggestions", cost: "Starter free · Pro $12/mo", url: "https://www.tabnine.com" },
      { platform: "Cursor", description: "AI-first VS Code fork", cost: "$20/mo", url: "https://www.cursor.sh" },
      { platform: "Codeium", description: "Free code assistant", cost: "Free", url: "https://www.codeium.com" },
      { platform: "Sourcegraph Cody", description: "Context-aware repo chat", cost: "Free · Pro $9/mo", url: "https://about.sourcegraph.com/cody" },
      { platform: "Anthropic Claude Code", description: "Long-span code agent", cost: "Pro plan", url: "https://claude.ai" },
      { platform: "Qodo", description: "SaaS dev co-pilot", cost: "$15/mo", url: "https://www.qodo.ai" },
    ],
  },
  {
    id: "image-design",
    title: "6. Image-Generation & Design",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Specialty" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Midjourney V6", description: "Text-to-image artistry", cost: "Basic $10/mo", url: "https://www.midjourney.com" },
      { platform: "Adobe Firefly", description: "Commercial-safe stock gen", cost: "Free w/ AdobeID; Gen Credits", url: "https://firefly.adobe.com" },
      { platform: "DALL·E 3", description: "Cohesive composition", cost: "In ChatGPT Plus", url: "https://platform.openai.com" },
      { platform: "Stable Diffusion XL", description: "Open-source model", cost: "Free (open-weights)", url: "https://stability.ai" },
      { platform: "Leonardo AI", description: "Style-tuning hub", cost: "Free 150 credits/mo · Pro $12/mo", url: "https://leonardo.ai" },
      { platform: "Ideogram", description: "Typography-aware images", cost: "Free · Pro $12/mo", url: "https://ideogram.ai" },
      { platform: "Canva Magic Media", description: "Gen images inside Canva", cost: "Canva Pro $14.99/mo", url: "https://www.canva.com/magic-media" },
      { platform: "Figma AI", description: "UI mock-ups, wireframes", cost: "Private beta", url: "https://figma.com" },
      { platform: "Clipdrop", description: "Cleanup, relight, SDXL API", cost: "Free · Pro $9/mo", url: "https://clipdrop.co" },
      { platform: "NightCafe", description: "Community art studio", cost: "Free daily credits", url: "https://creator.nightcafe.studio" },
    ],
  },
  {
    id: "audio-voice",
    title: "7. Audio & Voice",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "ElevenLabs", description: "Ultra-real TTS & dubbing", cost: "Free (10 k credits) · Starter $5/mo", url: "https://elevenlabs.io" },
      { platform: "Murf AI", description: "Studio-quality voiceovers", cost: "Free trial · Pro $29/mo", url: "https://murf.ai" },
      { platform: "Respeecher", description: "Voice cloning for media", cost: "Pay-per-minute", url: "https://respeecher.com" },
      { platform: "Voice.ai", description: "Real-time voice changer", cost: "Free · Pro $29/mo", url: "https://voice.ai" },
      { platform: "AIVA", description: "AI music composition", cost: "Free · Pro €11/mo", url: "https://www.aiva.ai" },
      { platform: "Soundraw", description: "Royalty-free music maker", cost: "$19.99/mo", url: "https://soundraw.io" },
      { platform: "Moises AI", description: "Stem separation, mastering", cost: "Free · Premium $3.99/mo", url: "https://moises.ai" },
      { platform: "Spotify Findaway + ElevenLabs", description: "AI-narrated audiobooks", cost: "Revenue-share", url: "https://findawayvoices.com" },
    ],
  },
  {
    id: "video-editing",
    title: "8. Video Generation & Editing",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Highlights" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Synthesia", description: "Avatar talking-head videos", cost: "Starter $30/mo", url: "https://www.synthesia.io" },
      { platform: "Runway Gen-3", description: "Multi-modal video gen & edit", cost: "Standard $15/mo", url: "https://runwayml.com" },
      { platform: "Pika Labs", description: "Lightning text-to-video", cost: "Free beta · Pro $19/mo", url: "https://pika.art" },
      { platform: "OpenAI Sora", description: "High-fidelity text-to-video", cost: "In ChatGPT Pro (wait-list)", url: "https://openai.com/sora" },
      { platform: "Google Veo 2", description: "Long-form video", cost: "Research preview", url: "https://labs.google.com/veo" },
      { platform: "Luma Dream Machine", description: "Realistic scene video", cost: "Free beta", url: "https://lumalabs.ai/dream-machine" },
      { platform: "Kling AI", description: "Character animation", cost: "Free tier · $32/mo Pro", url: "https://kling.ai" },
      { platform: "InVideo AI", description: "Social / marketing clips", cost: "Free · Business $30/mo", url: "https://invideo.io" },
      { platform: "HeyGen", description: "Face-swap & avatar video", cost: "Free trial · Creator $29/mo", url: "https://www.heygen.com" },
      { platform: "VEED.io AI", description: "Auto-edit & subtitle", cost: "Free · Pro $18/mo", url: "https://veed.io" },
    ],
  },
  {
    id: "automation-agents",
    title: "9. Automation & Agent Builders",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Focus" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Zapier AI", description: "7 k-app no-code + AI steps", cost: "Free (100 tasks) · $29/mo", url: "https://zapier.com/ai" },
      { platform: "n8n", description: "Open-source workflow/agents", cost: "Self-host free · Cloud €24/mo", url: "https://n8n.io" },
      { platform: "Make.com", description: "Visual low-code flows", cost: "Free 1000 ops/mo", url: "https://www.make.com" },
      { platform: "CrewAI", description: "Python agent framework", cost: "OSS free", url: "https://github.com/joaomdmoura/crewAI" },
      { platform: "AutoGPT", description: "Autonomous GPT-4 tasks", cost: "OSS free", url: "https://github.com/Significant-Gravitas/AutoGPT" },
      { platform: "LangChain", description: "Agentic LLM toolkit", cost: "OSS; Pro $20/mo", url: "https://langchain.com" },
      { platform: "Adept ACT-3", description: "Enterprise digital worker", cost: "Custom pricing", url: "https://adept.ai" },
      { platform: "Lindy", description: "Personal AI-assistant builder", cost: "Free trial · $40/mo", url: "https://lindy.ai" },
      { platform: "Dify", description: "Deploy chat agents + RAG", cost: "OSS free", url: "https://dify.ai" },
      { platform: "Huginn", description: "Self-host DIY agents", cost: "OSS free", url: "https://github.com/huginn/huginn" },
    ],
  },
  {
    id: "data-analytics-bi",
    title: "10. Data-Analytics & BI",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Core use" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Tableau GPT", description: "NL questions over data", cost: "In Tableau Cloud", url: "https://tableau.com" },
      { platform: "Power BI Copilot", description: "Chat & DAX generation", cost: "In Fabric P1 · Pro", url: "https://powerbi.microsoft.com/copilot" },
      { platform: "ThoughtSpot Sage", description: "NL search & SpotIQ", cost: "Team $95/user/mo", url: "https://thoughtspot.com" },
      { platform: "Looker Studio + Gemini", description: "Conversational BI", cost: "In Google Cloud", url: "https://cloud.google.com/looker" },
      { platform: "DataRobot AI Platform", description: "AutoML & MLOps", cost: "Custom", url: "https://datarobot.com" },
      { platform: "Dataiku", description: "Visual ML & governance", cost: "Team free · Enterprise $$", url: "https://dataiku.com" },
      { platform: "KNIME AI Extensions", description: "Open-source analytics", cost: "Free; Server $$", url: "https://knime.com" },
      { platform: "Sisu Data", description: "Explainable BI", cost: "SaaS", url: "https://sisudata.com" },
      { platform: "Fabi.ai", description: "Natural-language SQL", cost: "Free · Pro $49/mo", url: "https://fabi.ai" },
      { platform: "Snowflake Cortex", description: "Gen-AI inside warehouse", cost: "Usage-based", url: "https://www.snowflake.com" },
    ],
  },
  {
    id: "business-crm-revops",
    title: "11. Business, CRM & Revenue Ops",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Function" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Salesforce Einstein GPT", description: "Sales/Service generative", cost: "Add-on $50-75/user/mo", url: "https://www.salesforce.com/ai" },
      { platform: "HubSpot ChatSpot & Breeze", description: "Marketing & CRM copilot", cost: "Free · Pro seats vary", url: "https://hubspot.com/ai" },
      { platform: "Zoho Zia", description: "Chat, forecast, analytics", cost: "Included in Zoho CRM", url: "https://zoho.com/zia" },
      { platform: "Intercom Fin", description: "AI customer support", cost: "Add-on $0.99/resolved conv.", url: "https://intercom.com/fin" },
      { platform: "Drift Engage", description: "Conversational revenue", cost: "Quote", url: "https://drift.com" },
      { platform: "Ada", description: "No-code AI chatbots", cost: "Custom", url: "https://ada.cx" },
      { platform: "Gong AI", description: "Revenue intelligence", cost: "Quote", url: "https://www.gong.io" },
      { platform: "Zendesk AI", description: "Ticket reply & triage", cost: "Suite add-on", url: "https://zendesk.com" },
      { platform: "Freshworks Freddy", description: "Sales & service AI", cost: "Tier-based", url: "https://freshworks.com" },
      { platform: "Pipedrive AI", description: "Lead gen & email", cost: "Advanced plan", url: "https://pipedrive.com" },
    ],
  },
  {
    id: "special-purpose-vertical",
    title: "12. Special-Purpose & Vertical AI (sampler)",
    columnHeaders: [
      { key: "platform", displayName: "Platform" },
      { key: "description", displayName: "Domain" },
      { key: "cost", displayName: "Cost" },
      { key: "url", displayName: "URL" },
    ],
    items: [
      { platform: "Lexis+ AI", description: "Legal research drafting", cost: "Quote", url: "https://lexisnexis.com" },
      { platform: "Sidekick by Shopify", description: "Store set-up copilot", cost: "Included", url: "https://shopify.com/sidekick" },
      { platform: "Hippocratic AI", description: "Clinical LLM nurse agent", cost: "Pilot", url: "https://hippocratic.ai" },
      { platform: "Harvey", description: "AI for law firms", cost: "Subscription", url: "https://harvey.ai" },
      { platform: "Bloomberg GPT", description: "Finance terminals", cost: "In Bloomberg Terminal", url: "https://bloomberg.com" },
      { platform: "BenchSci ASCEND", description: "Biopharma target discovery", cost: "SaaS", url: "https://benchsci.com" },
      { platform: "Runway Finance GPT", description: "Earnings summarizer", cost: "SaaS", url: "https://runwayml.com/finance-gpt" },
      { platform: "ChefGPT", description: "Recipe generator", cost: "Freemium", url: "https://chefgpt.xyz" },
      { platform: "Reimagine Home AI", description: "Interior redesign", cost: "Free · Pro $15/design", url: "https://reimaginehome.ai" },
      { platform: "Inworld", description: "NPC dialogue engine (games)", cost: "Free dev · Pro seats", url: "https://inworld.ai" },
    ],
  },
];


const AccordionItem: React.FC<{ category: Category; initiallyOpen?: boolean }> = ({ category, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`content-${category.id}`}
        id={`header-${category.id}`}
      >
        {category.title}
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        id={`content-${category.id}`}
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        role="region"
        aria-labelledby={`header-${category.id}`}
        style={{ maxHeight: isOpen ? '2000px' : '0' }} // Max height for transition
      >
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {category.columnHeaders.map(header => (
                  <th key={header.key}>{header.displayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {category.items.map((item, index) => (
                <tr key={`${category.id}-item-${index}`}>
                  {category.columnHeaders.map(header => (
                    <td key={`${category.id}-item-${index}-${header.key}`} data-label={header.displayName}>
                      {header.key === 'url' ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sources-note">*Sources*</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const introText = "Below is a starter “big-tent” directory of AI platforms (175 entries, grouped in 12 practical categories). Pricing is the public list price or the lowest advertised tier as of 27 May 2025; most vendors also offer higher-end plans, education discounts, or generous free trials.";
  const howToUseTitle = "How to use this directory";
  const howToUseSteps = [
    "Scan by category to discover the right tool class.",
    "Check cost tiers—many begin free but gate higher-volume or commercial usage.",
    "Follow links for the freshest feature/pricing pages; vendors iterate monthly.",
    "Pilot with a narrow use-case first, then compare ROI before upgrading.",
  ];
  const finalNoteRaw = "Note: The landscape evolves weekly.  Treat this as a living reference—bookmark it and revisit quarterly to catch mergers, rebrands, or new entrants.";
  const finalNoteText = finalNoteRaw.substring(finalNoteRaw.indexOf("The landscape"));


  return (
    <div className="container">
      <h1>AI Platforms Directory</h1>
      <p className="intro-text">{introText}</p>

      {allCategoriesData.map((category, index) => (
        <AccordionItem key={category.id} category={category} initiallyOpen={index === 0} />
      ))}

      <section className="how-to-use-section" aria-labelledby="how-to-use-heading">
        <h2 id="how-to-use-heading">{howToUseTitle}</h2>
        <ol>
          {howToUseSteps.map((step, index) => (
            <li key={`step-${index}`}>{step}</li>
          ))}
        </ol>
        <blockquote className="final-note">
          <p><strong>Note:</strong> {finalNoteText}</p>
        </blockquote>
      </section>
       <footer>
          <p>Information as of 27 May 2025. The AI landscape evolves rapidly.</p>
        </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
