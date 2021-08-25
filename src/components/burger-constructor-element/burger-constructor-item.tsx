import React, { useRef } from 'react';
import classnames from 'classnames';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, reorderIngredient, useStoreDispatch } from '../../services/store';
import { Ingredient } from '../../utils/ingredients';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

interface OwnProps {
  item: Ingredient;
  index: number;
}

type Props = OwnProps;

type TDragObject = {
  id: string;
  index: number;
}

const BurgerConstructorItem = ({ item, index }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useStoreDispatch();

  const [,dropRef] = useDrop<TDragObject, never, never>({
    accept: 'ingredient',
    hover: (obj, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = obj.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorderIngredient([obj.id, hoverIndex]));
      obj.index = hoverIndex;
    }
  });
  const [, dragRef] = useDrag<TDragObject, never, never>({
    item: {
      id: item._id,
      index
    },
    type: 'ingredient'
  }, [index, item._id]);

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={
        classnames(
          styles['burger-constructor-item'],
          styles['burger-constructor-item__draggable']
        ) }
    >
      <DragIcon type={ 'primary' }/>
      <ConstructorElement
        text={ item.name }
        thumbnail={ item.image }
        price={ item.price }
        handleClose={ () => dispatch(removeIngredient(item._id)) }
      />
    </div>
  );
};

export default BurgerConstructorItem;
