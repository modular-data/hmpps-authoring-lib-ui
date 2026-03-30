// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { Button } from '@modular-data/gds-components';
import { getServices } from '../server/services-registry';
import { getDprUser } from '../server/request-context';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const services = getServices();

  const { dataSourceService } = services;

  const dprUser = getDprUser();

  const dataSources = await dataSourceService.getList();

  return (
    <div>
      Hello Authoring UI!
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button href="/data-products">Go to Data Products</Button>
        <Button href="preview">Go to Preview</Button>
        <Button href="/test-action">Server Action Test</Button>
        <Button href="/api/test-deps">Route Handler Test</Button>
        <Button href="/api/test-user">Route Handler dprUser Test</Button>
        <Button href="/test-rsc-user">Nested RSC dprUser Test</Button>
        <Button href="/test-rsc-user-parallel">
          Parallel RSC dprUser Test
        </Button>
      </div>
      <pre>{JSON.stringify(dprUser, null, 2)}</pre>
      <pre>{JSON.stringify(dataSources, null, 2)}</pre>
    </div>
  );
}
