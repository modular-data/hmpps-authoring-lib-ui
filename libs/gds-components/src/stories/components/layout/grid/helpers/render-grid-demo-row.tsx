import {
  type GridColumnProps,
  GridRow,
} from '../../../../../components/layout';
import { GridDemoColumn } from './grid-demo-column';

export const renderGridDemoRow = (items: GridColumnProps[]) => (
  <GridRow>
    {items.map((item, index) => {
      const { variant, desktopVariant } = item;
      const key = `${variant ?? 'none'}-${desktopVariant ?? 'none'}-${index}`;

      return <GridDemoColumn key={key} {...item} />;
    })}
  </GridRow>
);
