import React, { FunctionComponent, useState } from 'react';
import styles from './burger-ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Ingredient } from '../../utils/ingredients';

interface OwnProps {
  item: Ingredient
  count?: number;
  onClick?: () => void;
}

type Props = OwnProps;

const BurgerIngredient: FunctionComponent<Props> = ({ item, onClick, count = 0 }) => {
  const { price, name, image_large: img } = item;
  const [modalVisible, setModalVisible] = useState(false);
  const onModalClose = () => {
    setModalVisible(false);
  }
  const onImageClick: React.MouseEventHandler = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setModalVisible(true);
  }
  return (
    <div className={ classnames(styles['burger-ingredient'], 'mt-2') } onClick={ onClick }>
      <img className={ 'ml-4 mr-4' } alt={ name } src={ img } onClick={onImageClick}/>
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
      { modalVisible && <IngredientDetails onClose={onModalClose} item={item}/> }
    </div>
  );
};

export default BurgerIngredient;
