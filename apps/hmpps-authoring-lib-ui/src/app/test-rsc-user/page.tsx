// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { GovukPageTemplateContent } from '@modular-data/gds-components';
import { getDprUser } from '@/server/request-context';
import NestedUserProbe from './components/nested-user-probe';

export const dynamic = 'force-dynamic';

export default function TestRscUserPage() {
  const dprUser = getDprUser<Record<string, unknown>>();

  return (
    <GovukPageTemplateContent>
      <h1>Nested RSC dprUser Test</h1>
      <pre>
        {JSON.stringify(
          {
            layer: 'page-rsc',
            dprUserProbe: getUserProbe(dprUser),
          },
          null,
          2,
        )}
      </pre>
      <NestedUserProbe />
    </GovukPageTemplateContent>
  );
}

function getUserProbe(dprUser: Record<string, unknown> | undefined) {
  if (!dprUser) {
    return { present: false };
  }

  return {
    present: true,
    keys: Object.keys(dprUser),
    id: dprUser.id,
    username: dprUser.username,
    displayName: dprUser.displayName,
    hasToken: Boolean(dprUser.token),
  };
}
