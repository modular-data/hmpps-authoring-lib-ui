import { type FieldErrors } from 'react-hook-form';
import { type ErrorSummaryItems } from '@modular-data/gds-components';

const isRootErrorPath = (fieldPath: string): boolean => {
  return fieldPath === 'root' || fieldPath.startsWith('root.');
};

const isTraversableErrorNode = (
  errorNode: unknown,
): errorNode is FieldErrors => {
  return (
    typeof errorNode === 'object' && errorNode !== null && !('ref' in errorNode)
  );
};

export const rhfToErrorSummaryItems = (
  errors: FieldErrors,
  prefix = '',
): ErrorSummaryItems => {
  const items: ErrorSummaryItems = [];

  for (const [key, errorNode] of Object.entries(errors)) {
    if (!errorNode) {
      continue;
    }

    const fieldPath = prefix ? `${prefix}.${key}` : key;

    if (typeof errorNode.message === 'string') {
      items.push({
        children: errorNode.message,
        href: isRootErrorPath(fieldPath) ? undefined : `#${fieldPath}`,
      });
    } else if (isTraversableErrorNode(errorNode)) {
      items.push(...rhfToErrorSummaryItems(errorNode, fieldPath));
    }
  }

  return items;
};
