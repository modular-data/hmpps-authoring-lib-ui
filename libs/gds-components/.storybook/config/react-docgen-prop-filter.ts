import { type PropFilter } from 'react-docgen-typescript/lib/parser';

const ALWAYS_INCLUDE_PROPS = new Set([
  'id',
  'className',
  'type',
  'name',
  'value',
  'href',
  'role',
  'disabled',
  'aria-describedby',
  'pattern',
  'autoComplete',
  'spellCheck',
  'autoCapitalize',
]);

export const reactDocgenPropFilter: PropFilter = (prop) => {
  if (ALWAYS_INCLUDE_PROPS.has(prop.name)) {
    return true;
  }

  const declarations = prop.declarations ?? [];

  if (declarations.length) {
    return declarations.some(
      (declaration) => !declaration.fileName.includes('node_modules'),
    );
  }

  return true;
};
