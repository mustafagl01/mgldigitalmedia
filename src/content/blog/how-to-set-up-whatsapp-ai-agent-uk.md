---
title: "How to Set Up a WhatsApp AI Agent for Your UK Business in 30 Minutes"
description: "Step-by-step guide to deploying a WhatsApp AI chatbot for UK SMBs using Evolution API and n8n. No coding required."
date: "2026-04-28"
language: "en"
tags: ["whatsapp", "ai-agent", "uk-business", "n8n", "automation"]
cover: ""
faqs:
  - question: "Is WhatsApp AI automation legal in the UK?"
    answer: "Yes, with proper GDPR compliance. You must inform users they are communicating with an automated system, obtain consent for data processing, and provide a way to opt out. The ICO (Information Commissioner's Office) guidance on AI and automated processing should be followed."
  - question: "What is Evolution API and why use it instead of WhatsApp Business API?"
    answer: "Evolution API is an open-source, self-hosted WhatsApp layer built on Baileys. Unlike Meta's official WhatsApp Business API, it has no per-message fees, no approval process, and can be deployed in hours. For UK SMBs processing hundreds of messages monthly, it's typically 5-10x more cost-effective."
  - question: "How many messages can a WhatsApp AI agent handle simultaneously?"
    answer: "A properly configured Evolution API + n8n setup handles virtually unlimited concurrent conversations. The practical limit is your LLM API rate limit (GPT-4o: 10,000 requests/min on Tier 3), which far exceeds any SMB's messaging volume."
  - question: "Can the AI agent book appointments into my calendar?"
    answer: "Yes. n8n integrates with Google Calendar, Calendly, Acuity Scheduling, and most UK booking platforms. When a customer requests an appointment, the agent checks availability in real-time and creates the booking directly."
  - question: "What happens if the AI doesn't know the answer?"
    answer: "You define fallback behaviour in your n8n workflow. Common options: escalate to a human agent, ask the customer to call during business hours, or send a 'I'll get back to you' message and notify your team via Slack/email."
  - question: "How do I get started with MGL?"
    answer: "Book a free 15-minute audit at mgl-ai.uk/whatsapp-ai-asistan. We'll assess your current setup, identify the highest-impact automation opportunities, and walk you through what a WhatsApp AI agent would look like for your specific business."
---

**TL;DR:** A WhatsApp AI agent answers your business messages 24/7, books appointments, handles FAQs, and qualifies leads — all without human involvement. Using Evolution API + n8n, a functional agent can be live within 30 minutes for testing (full production setup takes 2-5 days). No coding required if you use a visual workflow builder.

---

## Why UK Businesses Are Adopting WhatsApp AI Agents

WhatsApp has 2+ billion users globally and over 30 million active UK users. For consumer-facing UK businesses — solicitors, dental practices, estate agents, beauty salons, restaurants — WhatsApp has become the preferred contact channel for a significant portion of customers.

The problem: most SMBs respond to WhatsApp messages like they responded to emails in 2005 — manually, during office hours, with inconsistent quality. A WhatsApp AI agent solves this.

**What changes with an AI agent:**
- Messages answered in under 3 seconds, 24/7
- Consistent, accurate responses every time
- Appointment booked without involving staff
- Lead details captured and synced to CRM automatically
- Staff freed from repetitive triage work

## The Technology Stack

This guide uses three components:

**1. Evolution API** — The WhatsApp layer. Self-hosted, open-source software that connects your WhatsApp number to your automation system. Think of it as a bridge between WhatsApp and your workflow engine.

**2. n8n** — The workflow engine. A visual automation tool where you design what happens with each incoming message: classify it, send it to AI, retrieve calendar data, send a reply, log to CRM.

**3. OpenAI GPT-4o** (or Claude 3.5 Sonnet) — The AI brain. Processes the customer's message and generates a natural, context-aware response based on your business's knowledge base.

## Step-by-Step Setup

### Step 1: Deploy Evolution API (15 minutes)

You need a VPS server (DigitalOcean, Hetzner, or similar — €4-15/month for a 2GB RAM instance).

On your server, run:
```bash
# Install Docker if not present
curl -fsSL https://get.docker.com | sh

# Pull and run Evolution API
docker run -d \
  --name evolution_api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=your_secret_key \
  atendai/evolution-api:latest
```

Access the Evolution API dashboard at `http://your-server-ip:8080`. Create a new instance, scan the QR code with your WhatsApp Business number.

### Step 2: Set Up n8n (5 minutes)

Fastest option: [n8n Cloud](https://n8n.io) free trial — no server setup.

Alternatively, self-hosted on the same server:
```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=your_password \
  n8nio/n8n
```

### Step 3: Build Your First Workflow

In n8n, create a new workflow with these nodes:

**1. Webhook node** — Receives events from Evolution API
- URL will look like: `https://your-n8n-url/webhook/whatsapp`
- Copy this URL into Evolution API's webhook settings

**2. IF node** — Filter: only process text messages (ignore status updates, receipts)
- Condition: `{{$json.event}}` equals `messages.upsert`

**3. OpenAI Message node** — Generate AI response
- System prompt: "[Your business context and instructions]"
- User message: `{{$json.body.messages[0].message.conversation}}`

**4. HTTP Request node** — Send reply via Evolution API
- Method: POST
- URL: `http://your-server:8080/message/sendText/your-instance-name`
- Headers: `apikey: your_secret_key`
- Body: `{ "number": "{{$json.body.messages[0].key.remoteJid}}", "text": "{{$ai_response}}" }`

### Step 4: Write Your System Prompt

This is the most important step. Your system prompt determines everything about how your agent behaves.

**Template for a UK SMB:**
```
You are a professional AI assistant for [Business Name], a [type] business based in [location].

Your role: Answer customer WhatsApp messages professionally, help them book appointments, and answer questions about our services.

Business information:
- Opening hours: Monday-Friday 9am-6pm, Saturday 10am-4pm
- Services: [list your services]
- Pricing: [key prices or "contact us for a quote"]
- Address: [address]
- Phone: [phone number]

Rules:
- Always be polite and professional
- If you cannot help, offer to connect them with a human agent
- For appointments, ask for: name, preferred date/time, service needed
- Do not make up information you don't have
- Always identify yourself as an AI assistant when directly asked

When a customer wants to book: collect their details and confirm you've noted the request. Tell them someone will confirm within [timeframe] or trigger the calendar booking tool.
```

### Step 5: Test Before Going Live

Test with your own phone number first:
1. Send "Hello" — does it respond naturally?
2. Ask about your opening hours — does it give correct info?
3. Request an appointment — does it collect the right details?
4. Ask something off-topic — does it handle gracefully?
5. Ask "Are you a bot?" — does it answer honestly?

Iterate on your system prompt until responses feel right. Plan for 2-3 hours of testing and refinement.

## Adding Appointment Booking

Connect n8n to your calendar system:

**For Google Calendar:**
1. Add Google Calendar credentials in n8n
2. Use "Google Calendar: Check Availability" node
3. Use "Google Calendar: Create Event" node

**Workflow logic:**
- Customer: "I'd like an appointment on Friday afternoon"
- n8n: Query Google Calendar for Friday 14:00-18:00 slots
- n8n: If slots available → offer them
- Customer: "3pm works"
- n8n: Create event, send confirmation

## GDPR Compliance for UK Businesses

Before going live, ensure you have:

**1. Transparency notice:** Add to your first message:
> "Hi! I'm an AI assistant for [Business]. I can help with [X, Y, Z]. For complex queries, I'll connect you with our team. Your messages are processed to provide this service. [Privacy Policy link]"

**2. Data minimisation:** Only collect what you need. Don't store full conversation history indefinitely — set a retention period (30-90 days is typical).

**3. Data processor agreement:** If your n8n or Evolution API is on a third-party server, ensure your hosting provider has a GDPR-compliant DPA.

**4. Right to opt out:** Include in your welcome message or FAQ: "To stop receiving messages from our AI assistant, reply STOP."

## What Results to Expect

Based on typical UK SMB deployments:

| Metric | Before AI Agent | After AI Agent |
|--------|----------------|----------------|
| Response time | 4-8 hours average | Under 3 seconds |
| Messages handled without staff | 0% | 65-80% |
| After-hours enquiries converted | 10-15% | 50-60% |
| Staff time on WhatsApp/week | 8-12 hours | 2-3 hours |
| Appointment no-shows (with reminders) | 20-25% | 8-12% |

## Getting Professional Help

Setting this up yourself takes 1-3 days if you're comfortable with servers and APIs. For most business owners, it's worth getting a specialist to handle the setup — so you can focus on your business.

MGL Digital Media sets up WhatsApp AI agents for UK businesses from £119/month (all-inclusive: setup, hosting, maintenance, updates).

Our stack: Evolution API + n8n + GPT-4o, hosted in EU for GDPR compliance.

[Book a free 15-minute strategy call → /whatsapp-ai-asistan](/whatsapp-ai-asistan)

You can also see our full service offering:
- [Voice AI agents → /sesli-ai](/sesli-ai)
- [n8n automation → /n8n-otomasyon](/n8n-otomasyon)
- [Lead generation → /lead-uretimi](/lead-uretimi)

---

*Author: Mustafa Gul · MGL Digital Media, Enfield, London · info@mgldigitalmedia.com*  
*Company No: 16007414 · Updated May 2026*
