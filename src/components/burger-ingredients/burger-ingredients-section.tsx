import React, { FunctionComponent } from 'react';
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

const BurgerIngredientsSection: FunctionComponent<Props> = ({ title, items, itemsClassName, titleRef }) => {
  const { addIngredient } = useConstructorHooks().burgerConstructor;
  return (
    <>
      <div ref={titleRef}>
          <span className="text text_type_main-medium">
            { title }
          </span>
      </div>
      <div className={classnames('mt-10 pt-4 pl-4', itemsClassName)}>
        {
          items.map(e => {
            return (
              <BurgerIngredient
                key={e._id}
                name={e.name}
                img={e.image_large}
                price={e.price}
                onClick={() => addIngredient && addIngredient(e)}
              />
            )
          })
        }
      </div>
    </>
  );
};

export default BurgerIngredientsSection;
