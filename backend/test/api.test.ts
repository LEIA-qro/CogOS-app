process.env.NODE_ENV = 'test';
import http from 'http';
import { app } from '../src/index.js';

async function runTests() {
  console.log('🧪 Starting CogOS Backend Verification Tests...\n');

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(err.message || err);
      failed++;
    }
  }

  try {
    // 1. Health check
    await test('GET /api/health returns status healthy and all 5 modules', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (data.status !== 'healthy') throw new Error('Status not healthy');
      if (data.modules?.length !== 5) throw new Error('Expected 5 modules in health check');
    });

    // 2. Passport Generation
    await test('POST /api/passport/generate creates sovereign accommodation agreement', async () => {
      const res = await fetch(`${baseUrl}/api/passport/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Diego Perea',
          roleTitle: 'Fullstack AI Engineer',
          workStylePreferences: ['Written instructions', 'Asynchronous standups'],
          sensoryTriggers: ['Sudden audio interruptions'],
          communicationPreferences: {
            preferredFormat: 'written_first',
            feedbackStyle: 'explicit_direct',
          },
          executiveSupportNeeds: ['Granular acceptance criteria'],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (!data.formalAccommodations || data.formalAccommodations.length === 0) {
        throw new Error('No accommodations returned');
      }
      if (data.employeeInfo.fullName !== 'Diego Perea') {
        throw new Error('Employee name mismatch');
      }
    });

    // 3. Task Unblocker
    await test('POST /api/unblocker/breakdown turns vague task into micro-steps', async () => {
      const res = await fetch(`${baseUrl}/api/unblocker/breakdown`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vagueTask: 'Complete the sprint review documentation',
          totalAvailableMinutes: 45,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (!data.definitionOfDone || data.definitionOfDone.length === 0) {
        throw new Error('Definition of Done missing');
      }
      if (!data.microSteps || data.microSteps.length === 0) {
        throw new Error('Micro steps missing');
      }
    });

    // 4. Tone Decoder
    await test('POST /api/decoder/analyze neutralizes catastrophic anxiety and provides 3 response options', async () => {
      const res = await fetch(`${baseUrl}/api/decoder/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawMessage: 'Let us chat at 3:30 PM.',
          senderRole: 'Engineering Manager',
          channel: 'Slack',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (!data.catastrophizingNeutralizer?.probableReality) {
        throw new Error('Catastrophizing neutralizer missing');
      }
      if (!data.responseOptions || data.responseOptions.length !== 3) {
        throw new Error('Expected 3 response options');
      }
    });

    // 5. Crisis Breaker / Sensory Pause
    await test('POST /api/crisis/pause generates grounding routine and discreet message', async () => {
      const res = await fetch(`${baseUrl}/api/crisis/pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intensity: 'sensory_overload',
          durationMinutes: 15,
          communicationChannel: 'Slack',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (!data.groundingExercise?.steps) throw new Error('Grounding exercise missing');
      if (!data.discreetCorporateOutreach?.messageBody) throw new Error('Outreach message missing');
    });

    // 6. Company Culture Navigator
    await test('POST /api/navigator/query demystifies unwritten social norms', async () => {
      const res = await fetch(`${baseUrl}/api/navigator/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'How should I ask for help without looking incompetent?',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (!data.explicitRuleVsSocialNorm) throw new Error('Rule vs norm comparison missing');
      if (!data.safeTemplateToUse) throw new Error('Safe template missing');
    });

    // 7. Schema Validation Error Handling
    await test('POST /api/unblocker/breakdown returns 400 on invalid payload', async () => {
      const res = await fetch(`${baseUrl}/api/unblocker/breakdown`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vagueTask: '', // invalid: min length is 3
        }),
      });
      if (res.status !== 400) throw new Error(`Expected HTTP 400, got ${res.status}`);
    });
  } finally {
    server.close();
  }

  console.log(`\n📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests();
