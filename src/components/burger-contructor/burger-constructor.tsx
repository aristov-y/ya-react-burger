import React, { FunctionComponent, useEffect, useState } from 'react';
import { Ingredient } from '../../utils/ingredients';
import {
  Button,
  ConstructorElement,
  CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import styles from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details';

interface OwnProps {
  items: Ingredient[],
  removeItem: (id: string) => void;
  clearItems: () => void;
}

type Props = OwnProps;

const BurgerConstructor: FunctionComponent<Props> = ({
  items,
  removeItem,
  clearItems
}) => {
  const [showOrder, setShowOrder] = useState(false);
  const [bun, setBun] = useState<Ingredient>();
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setBun(items?.filter(e => e.type === 'bun')[0]);
    setPrice(items!.reduce(
      (prev, curr) => prev + (curr.type === 'bun' ? 2 * curr.price : curr.price), 0)
    );
  }, [items]);
  const onCloseOrder = () => {
    setShowOrder(false);
    // Временно скрыто
    // clearItems();
  };
  const onOrderClick = () => {
    // временно показ модалки вне условий
    // if (items && items.length > 0) {
      setShowOrder(true);
    // }
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
            items!.filter(e => e.type !== 'bun').map((e, idx) => {
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
                    handleClose={ () => removeItem(e._id) }
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
      { showOrder && <OrderDetails onClose={onCloseOrder} /> }
    </div>
  )
}

export default BurgerConstructor;
