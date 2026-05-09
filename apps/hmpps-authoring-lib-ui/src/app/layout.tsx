import {
  GovukPageTemplateRoot,
  GovukPageTemplateShell,
} from '@modular-data/gds-components';
import './global.scss';

export const metadata = {
  title: 'Authoring UI',
  description: 'TODO: Add description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GovukPageTemplateRoot>
      <GovukPageTemplateShell>{children}</GovukPageTemplateShell>
    </GovukPageTemplateRoot>
  );
}
