// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { getDprUser } from '../../../server/request-context';

type ProbeListItemProps = {
  itemIndex: number;
};

export default async function ProbeListItem({ itemIndex }: ProbeListItemProps) {
  const before = getDprUser<Record<string, unknown>>();

  // Introduce async boundary per item to test context propagation under concurrency.
  await delay((itemIndex % 4) * 30 + 20);

  const after = getDprUser<Record<string, unknown>>();

  return (
    <pre>
      {JSON.stringify(
        {
          probe: itemIndex,
          before: getUserProbe(before),
          after: getUserProbe(after),
          consistentPresence:
            Boolean(before) === Boolean(after) && Boolean(before) === true,
          consistentId: before?.id === after?.id,
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
    id: dprUser.id,
    username: dprUser.username,
    displayName: dprUser.displayName,
    hasToken: Boolean(dprUser.token),
  };
}

function delay(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutMs);
  });
}
