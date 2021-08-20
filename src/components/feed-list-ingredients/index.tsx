import React from 'react';
import FeedListIngredient from './feed-list-ingredient';
import styles from './feed-list-ingredients.module.css';

type Props = {
  ingredients: string[]
};

export default function FeedListIngredients({ ingredients }: Props) {
  const unique = new Set<string>();
  ingredients.forEach((val) => unique.add(val));
  const uniqueIngredients = Array.from(unique);
  const length = uniqueIngredients.length;
  const overLength = length - 5;
  return (
    <div className={styles.Ingredients}>
      {
        uniqueIngredients.map((val, idx) => {
          if (idx === 5) {
            return (
              <FeedListIngredient
                key={val}
                id={val}
                overLength={overLength}
                zIndex={length - idx}
              />
            )
          }
          if (idx > 5) {
            return null;
          }
          return (
            <FeedListIngredient key={val} id={val} zIndex={length - idx} />
          )
        })
      }
    </div>
  )
}
