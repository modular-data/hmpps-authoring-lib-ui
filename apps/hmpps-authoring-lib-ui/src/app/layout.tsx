import { type Metadata, type Viewport } from 'next';
import {
  GovukPageTemplateRoot,
  GovukPageTemplateShell,
  getGovukPageTemplateMetadata,
  getGovukPageTemplateViewport,
} from '@modular-data/gds-components';
import { Providers } from './providers';
import './global.scss';

const govukRebrand = false;

export const metadata: Metadata = {
  ...getGovukPageTemplateMetadata({
    title: 'Authoring UI',
    govukRebrand,
  }),
  description: 'TODO: Add description',
};

export const viewport: Viewport = getGovukPageTemplateViewport({
  govukRebrand,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GovukPageTemplateRoot govukRebrand={govukRebrand}>
      <Providers>
        <GovukPageTemplateShell govukRebrand={govukRebrand}>
          {children}
        </GovukPageTemplateShell>
      </Providers>
    </GovukPageTemplateRoot>
  );
}
