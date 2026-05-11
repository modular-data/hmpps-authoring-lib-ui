import { type Metadata, type Viewport } from 'next';

interface GovukPageTemplateHeadConfigOptions {
  assetPath?: string;
  themeColor?: string;
  govukRebrand?: boolean;
}

interface GovukPageTemplateHeadConfig {
  assetPath: string;
  themeColor: string;
}

export interface GovukPageTemplateMetadataOptions {
  title?: Metadata['title'];
  icons?: Metadata['icons'];
  assetPath?: string;
  assetUrl?: string | URL;
  themeColor?: string;
  opengraphImageUrl?: string | URL;
  govukRebrand?: boolean;
}

export interface GovukPageTemplateViewportOptions {
  themeColor?: string;
  govukRebrand?: boolean;
}

const GOVUK_PAGE_TEMPLATE_DEFAULT_TITLE =
  'GOV.UK - The best place to find government services and information';

const getGovukPageTemplateHeadConfig = ({
  assetPath,
  themeColor,
  govukRebrand = false,
}: GovukPageTemplateHeadConfigOptions = {}): GovukPageTemplateHeadConfig => {
  const defaultConfig = govukRebrand
    ? { assetPath: '/assets/rebrand', themeColor: '#1d70b8' }
    : { assetPath: '/assets', themeColor: '#0b0c0c' };

  return {
    assetPath: assetPath ?? defaultConfig.assetPath,
    themeColor: themeColor ?? defaultConfig.themeColor,
  };
};

const getGovukPageTemplateDefaultIcons = ({
  assetPath,
  themeColor,
}: GovukPageTemplateHeadConfig): Metadata['icons'] => ({
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
});

const joinUrlWithPath = (url: string | URL, path: string): string => {
  return `${String(url).replace(/\/$/, '')}${path}`;
};

export const getGovukPageTemplateMetadata = ({
  title = GOVUK_PAGE_TEMPLATE_DEFAULT_TITLE,
  icons: iconsOverride,
  assetPath,
  assetUrl,
  themeColor,
  opengraphImageUrl,
  govukRebrand = false,
}: GovukPageTemplateMetadataOptions = {}): Metadata => {
  const headConfig = getGovukPageTemplateHeadConfig({
    assetPath,
    themeColor,
    govukRebrand,
  });

  const icons =
    iconsOverride === undefined
      ? getGovukPageTemplateDefaultIcons(headConfig)
      : iconsOverride;

  const openGraphImageUrl =
    opengraphImageUrl ??
    (assetUrl === undefined
      ? undefined
      : joinUrlWithPath(assetUrl, '/images/govuk-opengraph-image.png'));

  const openGraphMetadata =
    openGraphImageUrl === undefined
      ? {}
      : {
          openGraph: {
            images: [openGraphImageUrl],
          },
        };

  return {
    title,
    manifest: `${headConfig.assetPath}/manifest.json`,
    icons,
    ...openGraphMetadata,
  };
};

export const getGovukPageTemplateViewport = (
  viewportOptions: GovukPageTemplateViewportOptions = {},
): Viewport => {
  const headConfig = getGovukPageTemplateHeadConfig(viewportOptions);

  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: headConfig.themeColor,
  };
};
