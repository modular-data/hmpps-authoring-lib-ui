// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { GovukPageTemplateContent } from '@modular-data/gds-components';
import ProbeList from './components/probe-list';

export const dynamic = 'force-dynamic';

export default function TestRscUserParallelPage() {
  return (
    <GovukPageTemplateContent>
      <h1>Parallel RSC dprUser Test (Parent List + Child Items)</h1>
      <p>
        Each child item reads <code>getDprUser()</code> before and after an
        async boundary.
      </p>
      <ProbeList itemCount={8} />
    </GovukPageTemplateContent>
  );
}
