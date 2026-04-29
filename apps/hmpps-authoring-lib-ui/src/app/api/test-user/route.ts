// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { NextResponse } from 'next/server';
import { getDprUser } from '@/server/request-context';

export async function GET() {
  const dprUser = getDprUser<Record<string, unknown>>();

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    dprUserProbe: getUserProbe(dprUser),
  });
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
