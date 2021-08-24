import React, { FunctionComponent } from 'react';
import styles from './burger-ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import { Ingredient } from '../../utils/ingredients';
import { useDrag } from 'react-dnd';

interface OwnProps {
  item: Ingredient
  count?: number;
  onClick?: () => void;
  onImageClick?: () => void;
}

type Props = OwnProps;

const BurgerIngredient: FunctionComponent<Props> = ({ item, onClick, count = 0, onImageClick }) => {
  const { price, name, image_large: img } = item;
  const onImageClickInternal: React.MouseEventHandler = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    onImageClick && onImageClick();
  }
  const [,drag] = useDrag({
    type: 'source',
    item: {
      payload: item._id
    },
    end: (draggedItem: any, monitor) => {
      const dropResult = monitor.getDropResult<any>();

      if (dropResult) {
        onClick && onClick();
      }
    }
  }, [onClick, item._id])
  return (
    <div
      className={ classnames(styles['burger-ingredient'], 'mt-2') }
      onClick={ onClick }
      ref={drag}
    >
      <img className={ 'ml-4 mr-4' } alt={ name } src={ img } onClick={onImageClickInternal}/>
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
