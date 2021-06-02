import React, { FunctionComponent, useCallback } from 'react';
import classnames from 'classnames';
import { Ingredient } from '../../utils/ingredients';
import BurgerIngredient from '../burger-ingredient';
import { useConstructorHooks } from '../../state/providers/constructor-provider';

interface OwnProps {
  titleClassName?: string;
  itemsClassName?: string;
  titleRef?: any;
  title: string;
  items: Ingredient[]
}

type Props = OwnProps;

const BurgerIngredientsSection: FunctionComponent<Props> = ({
  title,
  items,
  itemsClassName,
  titleRef
}) => {
  const { ingredients, addIngredient } = useConstructorHooks().burgerConstructor;
  const getCount = useCallback((id: string) => {
    if (ingredients) {
      return ingredients.filter(e => e._id === id).length;
    }
    return 0;
  }, [ingredients]);
  return (
    <>
      <div ref={ titleRef }>
          <span className="text text_type_main-medium">
            { title }
          </span>
      </div>
      <div className={ classnames('mt-10 pt-4 pl-4', itemsClassName) }>
        {
          items.map(e => {
            return (
              <BurgerIngredient
                key={ e._id }
                item={e}
                onClick={ () => addIngredient && addIngredient(e) }
                count={ getCount(e._id) }
              />
            )
          })
        }
      </div>
    </>
  );
};

export default BurgerIngredientsSection;
