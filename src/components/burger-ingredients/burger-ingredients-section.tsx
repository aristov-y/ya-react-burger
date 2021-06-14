import React, { FunctionComponent, useCallback } from 'react';
import classnames from 'classnames';
import { Ingredient } from '../../utils/ingredients';
import BurgerIngredient from '../burger-ingredient';
import { useConstructorStateHook } from '../../state/providers/constructor-provider';

interface OwnProps {
  titleClassName?: string;
  itemsClassName?: string;
  titleRef?: any;
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
  const { ingredients: { main, bun }, addIngredient } = useConstructorStateHook();
  const getCount = useCallback((id: string) => {
    if (bun && bun._id === id) {
      return 1;
    }
    if (main) {
      return main.filter(e => e._id === id).length;
    }
    return 0;
  }, [main, bun]);
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
                onClick={ () => addIngredient(item) }
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
