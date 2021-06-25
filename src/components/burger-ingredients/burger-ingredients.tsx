import classnames from 'classnames';
import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerIngredientsSection from './burger-ingredients-section';
import { Ingredient } from '../../utils/ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

import useEventListener from '../../hooks/use-event-listener';

interface OwnProps {
  className?: string,
  ingredients: Ingredient[]
}

type Props = OwnProps;

const BurgerIngredients: FunctionComponent<Props> = ({
  className,
  ingredients
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Ingredient | undefined>(undefined);
  const [tabValue, setTabValue] = useState<string>('Булки');
  const onScroll = useCallback(() => {
    if (scrollerRef.current && bunRef.current && sauceRef.current && mainRef.current) {
      const bunTop = bunRef.current.offsetTop;
      const mainTop = mainRef.current.offsetTop;
      const sauceTop = sauceRef.current.offsetTop;
      const scroll = scrollerRef.current.scrollTop + 0.5 * scrollerRef.current.clientHeight;
      if (Math.abs(bunTop - scroll) < Math.abs(sauceTop - scroll)) {
        setTabValue('Булки');
      } else if (Math.abs(sauceTop - scroll) < Math.abs(mainTop - scroll)) {
        setTabValue('Соусы')
      } else {
        setTabValue('Начинки')
      }
    }
  }, []);
  useEventListener('scroll', onScroll, scrollerRef);
  const onTabClick = (id: string) => {
    if (id === 'Булки') {
      bunRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (id === 'Начинки') {
      mainRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (id === 'Соусы') {
      sauceRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setTabValue(id);
  }
  const onModalClose = () => {
    setSelected(undefined);
  }
  return (
    <div className={classnames(className, styles['burger-ingredients'], 'mt-10')}>
      <span className='text text_type_main-medium'>Соберите бургер</span>
      <div style={{ display: 'flex' }} className="mt-5">
        <Tab
          active={tabValue === 'Булки'}
          value={'Булки'}
          onClick={onTabClick}
          children={"Булки"} />
        <Tab
          active={tabValue === 'Соусы'}
          value={'Соусы'}
          onClick={onTabClick}
          children={"Соусы"} />
        <Tab
          active={tabValue === 'Начинки'}
          value={'Начинки'}
          onClick={onTabClick}
          children={"Начинки"} />
      </div>
      <div className={classnames('mt-10', styles['burger-ingredients-scroller'])} ref={scrollerRef}>
        <BurgerIngredientsSection
          titleRef={bunRef}
          title="Булки"
          items={ingredients.filter(e=> e.type === 'bun')}
          itemsClassName={styles['burger-ingredients-container']}
          onShowDetails={setSelected}
        />
        <BurgerIngredientsSection
          titleRef={sauceRef}
          title="Соусы"
          items={ingredients.filter(e=> e.type === 'sauce')}
          itemsClassName={styles['burger-ingredients-container']}
          onShowDetails={setSelected}
        />
        <BurgerIngredientsSection
          titleRef={mainRef}
          title="Начинки"
          items={ingredients.filter(e=> e.type === 'main')}
          itemsClassName={styles['burger-ingredients-container']}
          onShowDetails={setSelected}
        />
      </div>
      { selected && <IngredientDetails onClose={onModalClose} item={selected}/> }
    </div>);
};

export default BurgerIngredients;
