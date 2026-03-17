import {
  type CheckboxesCheckboxItem,
  type CheckboxesValues,
} from '../checkboxes.types';

export const resolveCheckboxesItemChecked = (
  item: CheckboxesCheckboxItem,
  values: CheckboxesValues,
): boolean => {
  return item.checked ?? values.includes(item.value);
};
