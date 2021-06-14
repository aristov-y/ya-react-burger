import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import styles from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details';
import { useConstructorStateHook } from '../../state/providers/constructor-provider';

interface OwnProps {

}

type Props = OwnProps;

const BurgerConstructor: FunctionComponent<Props> = () => {
  const {
    ingredients: {
      main,
      bun
    },
    removeIngredient,
    clearIngredients
  } = useConstructorStateHook();
  const [orderNum, setOrderNum] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const newTotal = main.reduce(
      (prev, curr) => prev + curr.price, 0);
    if (bun) {
      setPrice(newTotal + 2 * bun.price);
    } else {
      setPrice(newTotal);
    }

  }, [main, bun]);
  const onCloseOrder = () => {
    setShowOrder(false);
    clearIngredients();
  };
  const onOrderClick = () => {
    if (main.length && bun) {
      setShowOrder(true);
    }
  }
  return (
    <div className={ 'mt-25' } style={ { flex: '1', maxWidth: '592px' } }>
      <div style={ { display: 'flex', flexDirection: 'column', gap: '10px' } }>
        { bun && (
          <div className={ styles['burger-constructor-item'] }>
            <ConstructorElement
              type="top" isLocked={ true }
              text={ bun.name + '(верх)' }
              thumbnail={ bun.image }
              price={ bun.price }
            />
          </div>
        ) }
        <div className={ styles['burger-constructor-scroller'] }>
          {
            main.map((e, idx) => {
              return (
                <div
                  className={
                    classnames(
                      styles['burger-constructor-item'],
                      styles['burger-constructor-item__draggable']
                    ) }
                >
                  <DragIcon type={ 'primary' }/>
                  <ConstructorElement
                    key={ `&{e._id}_${ idx }` }
                    text={ e.name }
                    thumbnail={ e.image }
                    price={ e.price }
                    handleClose={ () => removeIngredient(e._id) }
                  />
                </div>
              )
            })
          }
        </div>
        { bun && (
          <div className={ styles['burger-constructor-item'] }>
            <ConstructorElement
              type="bottom"
              isLocked={ true }
              text={ bun.name + '(низ)' }
              thumbnail={ bun.image } price={ bun.price }/>
          </div>
        ) }
      </div>
      <div className={ classnames('mt-10', styles['burger-constructor-checkout']) }>
        <span className="text text_type_digits-medium mr-10">
          { price }
          <CurrencyIcon type={ 'primary' }/>
        </span>
        <Button
          type="primary"
          size="medium"
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
      { showOrder && <OrderDetails onClose={onCloseOrder} orderNum={orderNum} /> }
    </div>
  )
}

export default BurgerConstructor;
