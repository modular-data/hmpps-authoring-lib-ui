type PatchableSchema = {
  properties?: Record<string, unknown>;
  required?: string[];
};

const DATA_PRODUCT_OVERVIEW_SCHEMA = 'DataProductOverview';

const requireSchemaProperty = (
  schema: PatchableSchema,
  propertyName: string,
) => {
  if (!schema.properties?.[propertyName]) {
    return;
  }

  schema.required = Array.from(
    new Set([...(schema.required ?? []), propertyName]),
  );
};

export const createSchemaContractWorkarounds = (
  transformSchemaName: (name: string) => string,
) => {
  return (name: string, schema: PatchableSchema) => {
    if (transformSchemaName(name) !== DATA_PRODUCT_OVERVIEW_SCHEMA) {
      return;
    }

    requireSchemaProperty(schema, 'id');
  };
};
