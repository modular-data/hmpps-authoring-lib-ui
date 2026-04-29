'use server';

// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { getServices } from '@/server/services-registry';
import { getDprUser } from '@/server/request-context';

export type TestDependenciesState = {
  ok: boolean;
  dataSourceCount?: number;
  timestamp?: string;
  error?: string;
  dataSources: unknown;
  dprUserProbe?: {
    present: boolean;
    keys?: string[];
    id?: unknown;
    username?: unknown;
    displayName?: unknown;
    hasToken?: boolean;
  };
};

export async function testDependencies(): Promise<TestDependenciesState> {
  try {
    const { dataSourceService } = getServices();
    const dataSources = await dataSourceService.getList();
    const dprUser = getDprUser<Record<string, unknown>>();

    return {
      ok: true,
      dataSourceCount: dataSources.length,
      timestamp: new Date().toISOString(),
      dataSources,
      dprUserProbe: getUserProbe(dprUser),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      ok: false,
      error: message,
      dataSources: [],
    };
  }
}

function getUserProbe(
  dprUser: Record<string, unknown> | undefined,
): TestDependenciesState['dprUserProbe'] {
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
