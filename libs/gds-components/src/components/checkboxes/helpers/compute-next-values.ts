import {
  type CheckboxValue,
  type CheckboxesCheckboxItem,
  type CheckboxesItem,
  type CheckboxesValues,
} from '../checkboxes.types';
import { resolveCheckboxesItemChecked } from './resolve-item-checked';

const isExclusiveItem = (item: CheckboxesCheckboxItem): boolean => {
  return item.behaviour === 'exclusive';
};

const isCheckboxItem = (item: CheckboxesItem): item is CheckboxesCheckboxItem =>
  !('divider' in item);

const getCheckboxItems = (
  items: CheckboxesItem[],
): CheckboxesCheckboxItem[] => {
  return items.filter(isCheckboxItem);
};

const getSelectedValues = (
  checkboxItems: CheckboxesCheckboxItem[],
  values: CheckboxesValues,
): Set<CheckboxValue> => {
  return new Set(
    checkboxItems
      .filter((item) => resolveCheckboxesItemChecked(item, values))
      .map((item) => item.value),
  );
};

const getValuesInItemOrder = (
  checkboxItems: CheckboxesCheckboxItem[],
  selectedValues: Set<CheckboxValue>,
): CheckboxesValues => {
  return checkboxItems
    .map((item) => item.value)
    .filter((value) => selectedValues.has(value));
};

export const computeCheckboxesNextValues = ({
  items,
  values,
  toggledValue,
  checked,
}: {
  items: CheckboxesItem[];
  values: CheckboxesValues;
  toggledValue: CheckboxValue;
  checked: boolean;
}): CheckboxesValues => {
  const checkboxItems = getCheckboxItems(items);
  const toggledItem = checkboxItems.find((item) => item.value === toggledValue);
  const nextSelectedValues = getSelectedValues(checkboxItems, values);

  if (toggledItem) {
    if (!checked) {
      nextSelectedValues.delete(toggledValue);
    } else if (isExclusiveItem(toggledItem)) {
      nextSelectedValues.clear();
      nextSelectedValues.add(toggledValue);
    } else {
      nextSelectedValues.add(toggledValue);

      for (const item of checkboxItems) {
        if (isExclusiveItem(item)) {
          nextSelectedValues.delete(item.value);
        }
      }
    }
  }

  return getValuesInItemOrder(checkboxItems, nextSelectedValues);
};
