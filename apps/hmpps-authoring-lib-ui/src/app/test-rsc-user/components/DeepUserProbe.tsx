// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { getDprUser } from '../../../server/request-context';

export default function DeepUserProbe() {
  const dprUser = getDprUser<Record<string, unknown>>();

  return (
    <pre>
      {JSON.stringify(
        {
          layer: 'deep-nested-rsc',
          dprUserProbe: getUserProbe(dprUser),
        },
        null,
        2,
      )}
    </pre>
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
