// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { NextResponse } from 'next/server';
import { getServices } from '@/server/services-registry';

export async function GET() {
  try {
    const { dataSourceService } = getServices();
    const dataSources = await dataSourceService.getList();

    return NextResponse.json({
      success: true,
      dataSourceCount: dataSources.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
