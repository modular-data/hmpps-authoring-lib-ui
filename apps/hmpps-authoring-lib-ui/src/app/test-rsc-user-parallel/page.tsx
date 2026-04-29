// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import ProbeList from './components/probe-list';

export const dynamic = 'force-dynamic';

export default function TestRscUserParallelPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Parallel RSC dprUser Test (Parent List + Child Items)</h1>
      <p>
        Each child item reads <code>getDprUser()</code> before and after an
        async boundary.
      </p>
      <ProbeList itemCount={8} />
    </div>
  );
}
