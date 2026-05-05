interface GovukPageTemplateSupportScriptProps {
  nonce?: string;
}

const scriptContent =
  "document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');";

export const GovukPageTemplateSupportScript = ({
  nonce,
}: GovukPageTemplateSupportScriptProps) => (
  <script nonce={nonce}>{scriptContent}</script>
);
