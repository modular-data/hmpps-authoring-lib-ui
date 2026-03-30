// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import TestActionClient from './TestActionClient';

export default async function TestActionPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Server Action Test</h1>
      <TestActionClient />
    </div>
  );
}
