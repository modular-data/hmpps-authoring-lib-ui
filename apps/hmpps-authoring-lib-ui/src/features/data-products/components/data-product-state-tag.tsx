import { Tag, TagColour, type TagProps } from '@modular-data/gds-components';
import { DataProductStateType } from '@/generated/core-api';

interface DataProductStateTagProps extends TagProps {
  state: DataProductStateType;
}

const labelByState: Record<DataProductStateType, string> = {
  [DataProductStateType.DRAFT]: 'Draft',
  [DataProductStateType.PUBLISHED]: 'Published',
  [DataProductStateType.LAUNCHED]: 'Launched',
};

const tagColourByState: Record<DataProductStateType, TagColour> = {
  [DataProductStateType.DRAFT]: TagColour.Blue,
  [DataProductStateType.PUBLISHED]: TagColour.Yellow,
  [DataProductStateType.LAUNCHED]: TagColour.Green,
};

export const DataProductStateTag = ({
  state,
  ...restProps
}: DataProductStateTagProps) => {
  return (
    <Tag colour={tagColourByState[state]} {...restProps}>
      {labelByState[state]}
    </Tag>
  );
};
