import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import styles from './feed-item-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  ingredients: string[]
}

interface IngredientInfo {
  name: string;
  image: string;
  count: number;
  id: string;
  price: number;
}

function FeedItemIngredients({ ingredients }: Props) {
  const {
    ingredients: mainIngredients
  } = useSelector<StoreType, StoreType['ingredients']>(state => state.ingredients)
  const filteredIngredients = useMemo(() => {
    return ingredients.reduce<Record<string, number>>((previousValue, currentValue) => {
      if (previousValue[currentValue]) {
        previousValue[currentValue] = previousValue[currentValue] + 1;
      } else {
        previousValue[currentValue] = 1;
      }
      return previousValue;
    }, {})
  }, [ingredients]);
  const items = useMemo(() => {
    const keys = Object.keys(filteredIngredients);
    const result: IngredientInfo[] = [];
    keys.forEach((key) => {
      const ingredient = mainIngredients.find(val => val._id === key);
      if (ingredient) {
        result.push({
          id: ingredient._id,
          count: filteredIngredients[key],
          image: ingredient.image,
          name: ingredient.name,
          price: ingredient.price
        })
      }
    });
    return result;
  }, [mainIngredients, filteredIngredients])
  return (<div className={styles.Ingredients}>
    {
      items.map((item) => (
        <div className={styles.Ingredient}>
          <div className={styles.IngredientImage}>
            <img src={item.image} alt={item.name} />
          </div>
          <div className="text_type_main-default">{item.name}</div>
          <div className={ `text text_type_digits-default ${styles.IngredientPrice}` }>
            {item.count} x {item.price}
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      ))
    }
  </div>)
}

export default FeedItemIngredients;
