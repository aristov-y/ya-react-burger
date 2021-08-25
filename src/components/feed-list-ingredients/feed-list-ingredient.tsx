import React from 'react';
import { Ingredient } from '../../utils/ingredients';
import styles from './feed-list-ingredient.module.css'
import { useStoreSelector } from '../../services/selectors';

type Props = {
  id: string;
  overLength?: number;
  zIndex?: number;
}

function FeedListIngredient({ id, overLength = 0, zIndex = 0 }: Props) {
  const ingredient = useStoreSelector<Ingredient | undefined>((store) => {
    return store.ingredients.ingredients.find((val) => val._id === id)
  });
  if (ingredient) {
    return (
      <div className={styles.Ingredient}>
        <div className={styles.IngredientImage} style={{ zIndex }}>
          <img src={ingredient.image} alt={ingredient.name} />
          {
            overLength > 0 && (
              <span className={`text_type_digits-default ${styles.OverLength}`}>+{overLength}</span>
            )
          }
        </div>
      </div>
    )
  }
  return null;
}

export default React.memo(FeedListIngredient);
