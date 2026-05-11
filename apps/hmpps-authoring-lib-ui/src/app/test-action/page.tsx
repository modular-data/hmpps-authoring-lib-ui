// TODO (integration-probe-cleanup): Cleanup temporary probe logic after published integration testing is complete.

import { GovukPageTemplateContent } from '@modular-data/gds-components';
import TestActionClient from './test-action-client';

export default async function TestActionPage() {
  return (
    <GovukPageTemplateContent>
      <h1>Server Action Test</h1>
      <TestActionClient />
    </GovukPageTemplateContent>
  );
}
