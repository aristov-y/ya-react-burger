import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import getIcon from './getIcon';

type IconTypes = 'BURGER' | 'LIST' | 'PROFILE';

interface OwnProps {
  text: string;
  type: IconTypes
  onClick?: () => void;
}

type Props = OwnProps;

const HeaderButton: FunctionComponent<Props> = ({ text, type, onClick }) => {
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    setIcon(getIcon(type));
  }, [type])
  return (
    <Button
      type="secondary"
      size="medium"
      onClick={onClick}
    >
      {icon}
      <span className="text ml-2" style={{verticalAlign: 'super'}}>
        {text}
      </span>
    </Button>
  );
};

export default HeaderButton;
