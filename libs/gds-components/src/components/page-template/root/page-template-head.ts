import { type Metadata, type Viewport } from 'next';

const GOVUK_PAGE_TEMPLATE_DEFAULT_TITLE =
  'GOV.UK - The best place to find government services and information';

interface GovukPageTemplateHeadConfig {
  assetPath: string;
  themeColor: string;
}

export interface GovukPageTemplateMetadataOptions {
  title?: Metadata['title'];
  govukRebrand?: boolean;
}

const getGovukPageTemplateHeadConfig = (
  govukRebrand = false,
): GovukPageTemplateHeadConfig => ({
  assetPath: govukRebrand ? '/assets/rebrand' : '/assets',
  themeColor: govukRebrand ? '#1d70b8' : '#0b0c0c',
});

export const getGovukPageTemplateMetadata = ({
  title = GOVUK_PAGE_TEMPLATE_DEFAULT_TITLE,
  govukRebrand = false,
}: GovukPageTemplateMetadataOptions = {}): Metadata => {
  const { assetPath, themeColor } =
    getGovukPageTemplateHeadConfig(govukRebrand);

  return {
    title,
    manifest: `${assetPath}/manifest.json`,
    icons: {
      icon: [
        {
          url: `${assetPath}/images/favicon.ico`,
          sizes: '48x48',
        },
        {
          url: `${assetPath}/images/favicon.svg`,
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
      other: {
        rel: 'mask-icon',
        url: `${assetPath}/images/govuk-icon-mask.svg`,
        color: themeColor,
      },
      apple: `${assetPath}/images/govuk-icon-180.png`,
    },
  };
};

export const getGovukPageTemplateViewport = (
  govukRebrand = false,
): Viewport => {
  const { themeColor } = getGovukPageTemplateHeadConfig(govukRebrand);

  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor,
  };
};
