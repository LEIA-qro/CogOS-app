# CogOS Backend API & Prompt Pipeline

Backend engine for **CogOS (Cognitive Operating System)**, built for the *North American AI Challenge for Neurodiverse Learning* (ASU Spark Center × Mostla × Kairós Inclusión).

## 🚀 Overview

The backend orchestrates the AI pipelines and prompt guardrails for the 5 core modules designed to empower neurodivergent employees during their first 90 days of employment:

1. **Accommodation Passport** (`/api/passport/generate`) — Generates sovereign workplace accommodation agreements for HR and Managers.
2. **Task Unblocker** (`/api/unblocker/breakdown`) — Deconstructs ambiguous corporate assignments into concrete 2-5 min micro-steps with an unequivocal *Definition of Done*.
3. **Tone & Message Decoder** (`/api/decoder/analyze`) — Translates terse corporate communication (Slack, Teams, Email), neutralizes catastrophizing bias, and drafts 3 assertive response options.
4. **Sensory Pause / Crisis Breaker** (`/api/crisis/pause`) — Provides immediate somatic grounding (5-4-3-2-1) and drafts discreet workplace notifications without medical disclosure.
5. **Company Culture & Policy Navigator** (`/api/navigator/query`) — Demystifies unwritten social norms vs official HR policy.

## 🛠️ Stack & Architecture

- **Runtime:** Node.js (v20+) + Express + TypeScript.
- **Validation:** Zod schemas for all inbound payloads.
- **AI Engine:**
  - **Live Mode:** Google Gemini Flash via `@google/genai` with system prompts and JSON schema constraints.
  - **Mock Sandbox Mode:** Deterministic, rubric-aligned fallback when running offline or without an API key.

## 📦 Setup & Scripts

```bash
cd backend

# Install dependencies
npm install

# Run automated tests (Integration tests across all 5 endpoints)
npm test

# Build TypeScript to dist/
npm run build

# Start server in development mode (hot reload)
npm run dev

# Start compiled server
npm start
```

## 📋 Endpoints Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check, module inventory, active AI mode. |
| `POST` | `/api/passport/generate` | Generates workplace accommodation document. |
| `POST` | `/api/unblocker/breakdown` | Breaks down vague tasks into micro-steps. |
| `POST` | `/api/decoder/analyze` | Tone analysis, panic neutralization & response options. |
| `POST` | `/api/crisis/pause` | Somatosensory grounding & discreet out-of-office message. |
| `POST` | `/api/navigator/query` | RAG query on corporate onboarding & unwritten rules. |
