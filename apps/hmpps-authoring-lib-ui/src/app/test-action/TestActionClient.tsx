'use client';

// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { useActionState } from 'react';
import {
  testDependencies,
  type TestDependenciesState,
} from '../actions/test-action';

const initialState: TestDependenciesState = { ok: false, dataSources: [] };

export default function TestActionClient() {
  const [state, action, isPending] = useActionState(
    testDependencies,
    initialState,
  );

  return (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '40rem' }}>
      <form action={action}>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Running...' : 'Run Server Action'}
        </button>
      </form>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
