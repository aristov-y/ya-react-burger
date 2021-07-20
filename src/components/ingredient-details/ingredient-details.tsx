import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Ingredient } from '../../utils/ingredients';
import styles from './ingredient-details.module.css';

type Props = {
  items: Ingredient[]
}

function IngredientDetails({ items }: Props) {
  const { params } = useRouteMatch<any>();
  const itemId = params.id;
  const item = useMemo(() => {
    return items.find((val) => val._id === itemId);
  }, [items, itemId]);
  if (!item) {
    return null;
  }
  return (
    <div className={ `${ styles['content'] } text_type_main-default` }>
      <img className={ 'ml-4 mr-4' } alt={ item.name } src={ item.image_large }/>
      <span className={ 'text text_type_main-default mt-4 mb-8' }>{ item.name }</span>
      <div className={ `${ styles['description'] } mb-15 text_color_inactive` }>
        <div className={ `${ styles['description__item'] } mr-5` }>
          <span>Калории, ккал</span>
          <span className="text_type_digits-default">{ item.calories }</span>
        </div>
        <div className={ `${ styles['description__item'] } mr-5` }>
          <span>Белки, г</span>
          <span className="text_type_digits-default">{ item.proteins }</span>
        </div>
        <div className={ `${ styles['description__item'] } mr-5` }>
          <span>Жиры, г</span>
          <span className="text_type_digits-default">{ item.fat }</span>
        </div>
        <div className={ styles['description__item'] }>
          <span>Углеводы, г</span>
          <span className="text_type_digits-default">{ item.carbohydrates }</span>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
