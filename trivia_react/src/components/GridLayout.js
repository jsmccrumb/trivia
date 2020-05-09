import React from 'react';
const VALID_DISPLAY = ['grid', 'inline-grid'];

const GridLayout = ({
  display = 'grid',
  rows = 'auto', // sets grid-template-rows
  columns = 'auto', // sets grid-template-columns
  areas = null, // sets grid-area, can give names to the cells
  rowGap = '10px',
  columnGap = '10px',
  justifyItems = 'stretch',
  alignItems = 'stretch',
  justifyContent = 'stretch',
  alignContent = 'stretch',
  autoRows = null,
  autoColumns = null,
  autoFlow = null,
  children,
}) => {
  if (VALID_DISPLAY.indexOf(display) < 0) {
    display = 'grid';
  }
  // set up the styling based on props
  const gridStyle = {
    display,
    gridTemplateRows: rows,
    gridTemplateColumns: columns,
    rowGap: rowGap,
    columnGap: columnGap,
    justifyItems: justifyItems,
    alignItems: alignItems,
    justifyContent: justifyContent,
    alignContent: alignContent,
  };
  if (areas !== null) gridStyle.gridTemplateAreas = areas;
  if (autoRows !== null) gridStyle.gridAutoRows = autoRows;
  if (autoColumns !== null) gridStyle.gridAutoColumns = autoColumns;
  if (autoFlow !== null) gridStyle.gridAutoFlow = autoFlow;
  return <div className='h-full w-full' style={gridStyle}>{children}</div>;
};

export default GridLayout;
