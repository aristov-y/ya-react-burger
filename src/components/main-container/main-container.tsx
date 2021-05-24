import React, { FunctionComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

const MainContainer: FunctionComponent<Props> = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: '40px'}}>
      {props.children}
    </div>
  );
};

export default MainContainer;
