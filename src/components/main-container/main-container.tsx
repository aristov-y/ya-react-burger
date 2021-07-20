import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

interface OwnProps {
  vertical?: boolean;
  style?: CSSProperties;
  className?: string;
}

type Props = OwnProps;

const MainContainer: FunctionComponent<Props> = (
  {
    vertical,
    style = {},
    className,
    children
  }
) => {
  const currentStyles = useMemo<CSSProperties>(() => {
    return {
      display: 'flex',
      justifyContent: vertical ? undefined : 'center',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: vertical ? 'center' : undefined,
      ...style
    }
  }, [vertical, style]);
  return (
    <div style={currentStyles} className={className}>
      {children}
    </div>
  );
};

export default MainContainer;
