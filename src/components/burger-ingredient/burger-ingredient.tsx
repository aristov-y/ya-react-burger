import React, { FunctionComponent } from 'react';
import styles from './burger-ingredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

interface OwnProps {
  img: string;
  price: number;
  name: string;
  count?: number;
  onClick?: () => void;
}

type Props = OwnProps;

const BurgerIngredient: FunctionComponent<Props> = ({ price, name, img, onClick}) => {
  return (
    <div className={classnames(styles['burger-ingredient'], 'mt-2')} onClick={onClick}>
      <img className={'ml-4 mr-4'} alt={name} src={img} />
      <div>
        <span className={'text_type_digits-default'}>
          {price}
          <CurrencyIcon type={'primary'} />
        </span>
      </div>
      <span>{name}</span>
    </div>
  );
};

export default BurgerIngredient;
