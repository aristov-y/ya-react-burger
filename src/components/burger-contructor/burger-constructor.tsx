import React, { FunctionComponent, useEffect, useState } from 'react';
import { Ingredient } from '../../utils/ingredients';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useConstructorHooks } from '../../state/providers/constructor-provider';
import styles from './burger-constructor.module.css'

interface OwnProps {
}

type Props = OwnProps;

const BurgerConstructor: FunctionComponent<Props> = () => {
  const { ingredients: items, removeIngredient } = useConstructorHooks().burgerConstructor;
  const [bun, setBun] = useState<Ingredient>();
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setBun(items?.filter(e => e.type === 'bun')[0]);
    setPrice(items!.reduce((prev, curr) => prev + curr.price,0));
  }, [items]);
  return (
    <div className={'mt-25'} style={{ flex: '1', maxWidth: '592px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        { bun && <ConstructorElement
            type='top' isLocked={true}
            text={bun.name + '(верх)'}
            thumbnail={bun.image}
            price={bun.price}
        />}
        <div className={styles['burger-constructor-scroller']}>
          {
            items!.filter(e => e.type !== 'bun').map((e, idx) => {
              return (<ConstructorElement
                key={`&{e._id}_${idx}`}
                text={e.name}
                thumbnail={e.image}
                price={e.price}
                handleClose={() => removeIngredient && removeIngredient(e._id)}
              />)
            })
          }
        </div>
        { bun && <ConstructorElement type='bottom' isLocked={true} text={bun.name + '(низ)'} thumbnail={bun.image} price={bun.price} />}
      </div>
      <div className={'mt-10'}>
        <span className="text text_type_digits-medium mr-10">
          {price}
          <CurrencyIcon type={'primary'} />
        </span>
        <Button
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;
