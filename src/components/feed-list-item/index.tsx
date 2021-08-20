import React, { useMemo } from 'react';
import { FeedItem } from '../../utils/orders';
import styles from './feed-list-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import FeedListIngredients from '../feed-list-ingredients';


type Props = {
  number: number;
  name: string;
  ingredients: string[];
  createdAt: string;
  onClick: () => void;
}

export default function FeedListItem({ number, name, ingredients, createdAt, onClick }: Props) {
  const { ingredients: ingredientInfos } = useSelector<StoreType, StoreType['ingredients']>(
    store => store.ingredients
  );
  const idText = `${number}`.padStart(6, '0');
  const date = useMemo(() => {
    if (createdAt) {
      return new Date(createdAt).toLocaleString();
    }
  }, [createdAt]);
  const price = useMemo(() => {
    if (ingredients) {
      return ingredientInfos
        .filter(val => ingredients.includes(val._id))
        .reduce<number>((previousValue, currentValue) => previousValue + currentValue.price, 0);
    }
    return 0;
  }, [ingredientInfos, ingredients])
  return (
    <div className={styles.FeedListItem} onClick={onClick}>
      <div className={styles.FeedListItemId}>
        <span>#{idText}</span>
        <span className={"text_color_inactive"}>{date}</span>
      </div>
      <div className={"text_type_main-medium"}>
        {name}
      </div>
      <div className={styles.FeedListItemIngredients}>
        <FeedListIngredients ingredients={ingredients} />
        <div className={styles.FeedListItemPrice}>
          {price}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
