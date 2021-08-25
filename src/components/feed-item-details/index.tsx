import React, { useMemo } from 'react';
import styles from './feed-item-details.module.css';
import FeedItemIngredients from '../feed-item-ingredients';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIngredientsSelector } from '../../services/selectors';

type Props = {
  name: string;
  ingredients: string[];
  createdAt: string;
  status: string;
}

function useIngredientsTotalPrice(ingredients: string[] = []) {
  const mainIngredients = useIngredientsSelector();
  return useMemo(() => {
    const prices = mainIngredients.reduce<Record<string, number>>((previousValue, currentValue) => {
      previousValue[currentValue._id] = currentValue.price;
      return previousValue;
    }, {});
    return ingredients.map(val => prices[val] || 0).reduce((prev, curr) => prev + curr, 0);
  }, [ingredients, mainIngredients]);
}

export default function FeedItemDetails({ name, ingredients, createdAt, status }: Props) {
  const totalPrice = useIngredientsTotalPrice(ingredients);
  const statusText = status === 'done' ? 'Выполнен' : 'В работе';
  const statusClass = 'mb-4 ' + (status === 'done' ? styles.Completed : '')
  return (
    <div className={ `${ styles.FeedItemDetails } text text_type_main-default` }>
      <span className="mb-4 text_type_main-medium">{ name }</span>
      <span className={ statusClass }>{ statusText }</span>
      <div className={ `${ styles.Scroller } mb-4` }>
        <FeedItemIngredients ingredients={ ingredients }/>
      </div>
      <div className={ styles.FeedItemDetailsFooter }>
        <span className="text_color_inactive">{ new Date(createdAt).toLocaleString() }</span>
        <span className="text_type_digits-default">
            { totalPrice }
          <CurrencyIcon type="primary"/>
          </span>
      </div>
    </div>
  )
}
