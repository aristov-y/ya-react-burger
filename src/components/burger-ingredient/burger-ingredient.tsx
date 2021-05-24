import React, { FunctionComponent } from 'react';
import styles from './burger-ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

interface OwnProps {
  img: string;
  price: number;
  name: string;
  count?: number;
  onClick?: () => void;
}

type Props = OwnProps;

const BurgerIngredient: FunctionComponent<Props> = ({ price, name, img, onClick, count = 0 }) => {
  return (
    <div className={ classnames(styles['burger-ingredient'], 'mt-2') } onClick={ onClick }>
      <img className={ 'ml-4 mr-4' } alt={ name } src={ img }/>
      <div className="mt-1">
        <span
          className={
            classnames(
              styles['burger-ingredient-price-text'],
              'text_type_digits-default')
          }
        >
          { price }
          <CurrencyIcon type={ 'primary' }/>
        </span>
      </div>
      <span className={ 'text text_type_main-default mt-1' }>{ name }</span>
      { (count > 0) && <Counter count={ count } size="default"/> }
    </div>
  );
};

export default BurgerIngredient;
