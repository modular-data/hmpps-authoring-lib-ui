import { type CheckboxesCheckboxItem } from '../checkboxes.types';

export const resolveCheckboxesItemId = (
  item: CheckboxesCheckboxItem,
  itemIndex: number,
  idPrefix: string,
): string => {
  return item.id || `${idPrefix}${itemIndex > 0 ? `-${itemIndex + 1}` : ''}`;
};
