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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
