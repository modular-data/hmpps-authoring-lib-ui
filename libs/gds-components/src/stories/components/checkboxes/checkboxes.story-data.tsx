import { type CheckboxesItem } from '../../../components/checkboxes';
import { Input, InputWidth } from '../../../components/input';

export const wasteItems: CheckboxesItem[] = [
  {
    value: 'carcasses',
    children: 'Waste from animal carcasses',
  },
  {
    value: 'mines',
    children: 'Waste from mines or quarries',
  },
  {
    value: 'farm',
    children: 'Farm or agricultural waste',
  },
];

export const nationalityItems: CheckboxesItem[] = [
  {
    value: 'british',
    children: 'British',
    hint: {
      children: 'including English, Scottish, Welsh and Northern Irish',
    },
  },
  {
    value: 'irish',
    children: 'Irish',
  },
  {
    value: 'other',
    children: 'Citizen of another country',
  },
];

export const countriesItems: CheckboxesItem[] = [
  {
    value: 'france',
    children: 'France',
  },
  {
    value: 'portugal',
    children: 'Portugal',
  },
  {
    value: 'spain',
    children: 'Spain',
  },
  {
    divider: 'or',
  },
  {
    value: 'none',
    children: 'No, I will not be travelling to any of these countries',
    behaviour: 'exclusive',
  },
];

export const organisationItems: CheckboxesItem[] = [
  {
    value: 'hmrc',
    children: 'HM Revenue and Customs (HMRC)',
  },
  {
    value: 'employment-tribunal',
    children: 'Employment Tribunal',
  },
  {
    value: 'MOD',
    children: 'Ministry of Defence',
  },
  {
    value: 'DfT',
    children: 'Department for Transport',
  },
];

export const contactItems: CheckboxesItem[] = [
  {
    value: 'email',
    children: 'Email',
    conditional: (
      <Input
        id="contact-by-email"
        name="contactByEmail"
        type="email"
        autoComplete="email"
        spellCheck={false}
        width={InputWidth.FluidOneThird}
        label={{ children: 'Email address' }}
      />
    ),
  },
  {
    value: 'phone',
    children: 'Phone',
    conditional: (
      <Input
        id="contact-by-phone"
        name="contactByPhone"
        type="tel"
        autoComplete="tel"
        width={InputWidth.FluidOneThird}
        label={{ children: 'Phone number' }}
      />
    ),
  },
  {
    value: 'text message',
    children: 'Text message',
    conditional: (
      <Input
        id="contact-by-text"
        name="contactByText"
        type="tel"
        autoComplete="tel"
        width={InputWidth.FluidOneThird}
        label={{ children: 'Mobile phone number' }}
      />
    ),
  },
];
