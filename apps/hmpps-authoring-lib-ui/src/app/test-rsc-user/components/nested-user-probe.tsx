// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { getDprUser } from '@/server/request-context';
import DeepUserProbe from './deep-user-probe';

export default function NestedUserProbe() {
  const dprUser = getDprUser<Record<string, unknown>>();

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            layer: 'nested-rsc',
            dprUserProbe: getUserProbe(dprUser),
          },
          null,
          2,
        )}
      </pre>
      <DeepUserProbe />
    </div>
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
