import { type ArgTypesEnhancer } from 'storybook/internal/csf';

const forceSelectForEnumControls: ArgTypesEnhancer = (context) => {
  const argTypes = context.argTypes ?? {};

  return Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => {
      const isEnum = argType?.type?.name === 'enum';
      const originalControlConfig =
        typeof argType.control === 'object' ? argType.control : {};

      if (!isEnum) {
        return [name, argType];
      }

      return [
        name,
        {
          ...argType,
          control: {
            ...originalControlConfig,
            type: 'select',
          },
        },
      ];
    }),
  );
};

export const argTypesEnhancers = [forceSelectForEnumControls];
