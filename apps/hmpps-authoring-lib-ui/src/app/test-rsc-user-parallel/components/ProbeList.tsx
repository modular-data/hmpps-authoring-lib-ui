// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { Suspense } from 'react';
import ProbeListItem from './ProbeListItem';

type ProbeListProps = {
  itemCount: number;
};

export default function ProbeList({ itemCount }: ProbeListProps) {
  const items = Array.from({ length: itemCount }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((itemIndex) => (
        <Suspense
          key={itemIndex}
          fallback={
            <pre>{JSON.stringify({ probe: itemIndex, loading: true })}</pre>
          }
        >
          <ProbeListItem itemIndex={itemIndex} />
        </Suspense>
      ))}
    </div>
  );
}
