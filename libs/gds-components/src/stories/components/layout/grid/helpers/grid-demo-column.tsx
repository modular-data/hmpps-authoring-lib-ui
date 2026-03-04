import {
  type GridColumnProps,
  GridColumn,
} from '../../../../../components/layout';
import { Typography } from '../../../../../components/typography';

export const GridDemoColumn = (props: GridColumnProps) => {
  const { variant, desktopVariant, children } = props;
  const variantLabel = variant && `govuk-grid-column-${variant}`;
  const desktopVariantLabel =
    desktopVariant && `govuk-grid-column-${desktopVariant}-from-desktop`;

  return (
    <GridColumn {...props}>
      <Typography>
        {variantLabel}
        {variantLabel && desktopVariantLabel && (
          <>
            <br />
            <br />
          </>
        )}
        {desktopVariantLabel}
      </Typography>
      {children}
    </GridColumn>
  );
};
