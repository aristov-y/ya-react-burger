import React, { FunctionComponent, useCallback } from 'react';
import classnames from 'classnames';
import { Ingredient } from '../../utils/ingredients';
import BurgerIngredient from '../burger-ingredient';
import { addIngredient, useStoreDispatch } from '../../services/store';
import { useConstructorSelector } from '../../services/selectors';

interface OwnProps {
  titleClassName?: string;
  itemsClassName?: string;
  titleRef?: React.RefObject<HTMLDivElement>;
  title: string;
  items: Ingredient[],
  onShowDetails: (item: Ingredient) => void;
}

type Props = OwnProps;

const BurgerIngredientsSection: FunctionComponent<Props> = ({
  title,
  items,
  itemsClassName,
  titleRef,
  onShowDetails
}) => {
  const dispatch = useStoreDispatch();
  const { main, bun } = useConstructorSelector();
  const getCount = useCallback((id: string) => {
    if (bun && bun._id === id) {
      return 2;
    }
    if (main) {
      return main.filter(e => e._id === id).length;
    }
    return 0;
  }, [main, bun]);
  const onIngredientClick = (item: Ingredient) => {
    dispatch(addIngredient(item))
  }
  return (
    <>
      <div ref={ titleRef }>
          <span className="text text_type_main-medium">
            { title }
          </span>
      </div>
      <div className={ classnames('mt-10 pt-4 pl-4', itemsClassName) }>
        {
          items.map(item => {
            return (
              <BurgerIngredient
                key={ item._id }
                item={item}
                onClick={ () => onIngredientClick(item) }
                onImageClick={() => onShowDetails(item)}
                count={ getCount(item._id) }
              />
            )
          })
        }
      </div>
    </>
  );
};

export default BurgerIngredientsSection;
