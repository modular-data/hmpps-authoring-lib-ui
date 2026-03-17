import { type ReactNode } from 'react';
import {
  type FooterNavigationSections,
  type FooterLinkItems,
  type FooterMeta,
  type FooterNavigationSection,
  FooterLink,
} from '../../../components/footer';
import { GridColumnVariant } from '../../../components/layout';

const createNavigationItems = (count: number): FooterLinkItems => {
  return Array.from({ length: count }, (_, index) => ({
    href: `#${index + 1}`,
    children: `Navigation item ${index + 1}`,
  }));
};

const defaultNavigationItems = createNavigationItems(6);
const shortNavigationItems = defaultNavigationItems.slice(0, 3);

const createNavigationSection = ({
  items = defaultNavigationItems,
  ...options
}: FooterNavigationSection): FooterNavigationSection => ({
  items,
  ...options,
});

const metaLinks: FooterLinkItems = [
  { href: '#1', children: 'Bibendum Ornare' },
  { href: '#2', children: 'Nullam' },
  { href: '#3', children: 'Tortor Fringilla' },
  { href: '#4', children: 'Tellus' },
  { href: '#5', children: 'Egestas Nullam' },
  { href: '#6', children: 'Euismod Etiam' },
  { href: '#7', children: 'Fusce Sollicitudin' },
  { href: '#8', children: 'Ligula Nullam Ultricies' },
];

export const welshContentLicence: ReactNode = (
  <>
    Mae&apos;r holl gynnwys ar gael dan{' '}
    <FooterLink
      href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/"
      rel="license"
    >
      Drwydded y Llywodraeth Agored v3.0
    </FooterLink>
    , ac eithrio lle nodir yn wahanol
  </>
);

export const welshCopyright: ReactNode = <span>Hawlfraint y Goron</span>;

export const prototypeKitMeta: FooterMeta = {
  children: 'GOV.UK Prototype Kit v7.0.1',
};

export const metaLinksOnly: FooterMeta = {
  items: metaLinks,
};

export const magicalLawMeta: FooterMeta = {
  ...metaLinksOnly,
  children: (
    <>
      Built by the{' '}
      <FooterLink href="/department-of-magical-law-enforcement">
        Department of Magical Law Enforcement
      </FooterLink>
    </>
  ),
};

export const defaultWidthNavigationOneColumn: FooterNavigationSections = [
  createNavigationSection({ title: 'Navigation section' }),
];

export const defaultWidthNavigationTwoColumns: FooterNavigationSections = [
  createNavigationSection({ title: 'Navigation section', columns: 2 }),
];

export const navigationExample: FooterNavigationSections = [
  createNavigationSection({
    title: 'Two column list',
    width: GridColumnVariant.TwoThirds,
    columns: 2,
  }),
  createNavigationSection({
    title: 'Single column list',
    width: GridColumnVariant.OneThird,
    items: shortNavigationItems,
  }),
];

export const fullGdsMeta: FooterMeta = {
  items: [
    { href: '/help', children: 'Help' },
    { href: '/help/cookies', children: 'Cookies' },
    { href: '/contact', children: 'Contact' },
    {
      href: '/help/terms-conditions',
      children: 'Terms and conditions',
    },
    { href: '/cymraeg', children: 'Rhestr o Wasanaethau Cymraeg' },
  ],
  children: (
    <>
      Built by the{' '}
      <FooterLink href="/government-digital-service">
        Government Digital Service
      </FooterLink>
    </>
  ),
};

export const fullGdsNavigation: FooterNavigationSections = [
  {
    title: 'Coronavirus (COVID-19)',
    width: GridColumnVariant.TwoThirds,
    items: [
      {
        href: '/coronavirus',
        children: 'Coronavirus (COVID-19): guidance and support',
      },
    ],
  },
  {
    title: 'Brexit',
    width: GridColumnVariant.OneThird,
    items: [{ href: '/brexit', children: 'Check what you need to do' }],
  },
  {
    title: 'Services and information',
    width: GridColumnVariant.TwoThirds,
    columns: 2,
    items: [
      { href: '/browse/benefits', children: 'Benefits' },
      {
        href: '/browse/births-deaths-marriages',
        children: 'Births, deaths, marriages and care',
      },
      {
        href: '/browse/business',
        children: 'Business and self-employed',
      },
      {
        href: '/browse/childcare-parenting',
        children: 'Childcare and parenting',
      },
      {
        href: '/browse/citizenship',
        children: 'Citizenship and living in the UK',
      },
      {
        href: '/browse/justice',
        children: 'Crime, justice and the law',
      },
      { href: '/browse/disabilities', children: 'Disabled people' },
      { href: '/browse/driving', children: 'Driving and transport' },
      { href: '/browse/education', children: 'Education and learning' },
      {
        href: '/browse/employing-people',
        children: 'Employing people',
      },
      {
        href: '/browse/environment-countryside',
        children: 'Environment and countryside',
      },
      {
        href: '/browse/housing-local-services',
        children: 'Housing and local services',
      },
      { href: '/browse/tax', children: 'Money and tax' },
      {
        href: '/browse/abroad',
        children: 'Passports, travel and living abroad',
      },
      {
        href: '/browse/visas-immigration',
        children: 'Visas and immigration',
      },
      { href: '/browse/working', children: 'Working, jobs and pensions' },
    ],
  },
  {
    title: 'Departments and policy',
    width: GridColumnVariant.OneThird,
    items: [
      {
        href: '/government/how-government-works',
        children: 'How government works',
      },
      { href: '/government/organisations', children: 'Departments' },
      { href: '/world', children: 'Worldwide' },
      { href: '/government/policies', children: 'Policies' },
      { href: '/government/publications', children: 'Publications' },
      { href: '/government/announcements', children: 'Announcements' },
    ],
  },
];

export const threeEqualColumnsNavigation: FooterNavigationSections = Array.from(
  { length: 3 },
  (_, index) => {
    return createNavigationSection({
      title: `Single column list ${index + 1}`,
      width: GridColumnVariant.OneThird,
      columns: 1,
      items: defaultNavigationItems,
    });
  },
);
