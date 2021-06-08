import React from 'react';
import Modal from '../modal/modal';
import { Ingredient } from '../../utils/ingredients';
import styles from './ingredient-details.module.css';

type Props = {
  onClose: () => void;
  item: Ingredient
}

function IngredientDetails({ onClose, item }: Props) {
  return (
    <Modal onClose={ onClose } title="Детали ингредиента">
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
    </Modal>
  )
}

export default IngredientDetails;
