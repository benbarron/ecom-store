import React, { FC, Fragment, useState } from 'react';
import { Route, Switch } from 'react-router';
import CartSidebar from './components/global/cart-sidebar';
import Navbar from './components/global/navbar';
import { CSSTransition } from 'react-transition-group';
import StoreLocator from './components/global/store-locator';
import ItemSidebar from './components/global/item-sidebar';

const App: FC = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [sidebar, setSidebar] = useState<'cart' | 'item'>('cart');

  const toggleStoreLocator = () => {
    setShowLocationModal(!showLocationModal);
  };

  return (
    <Fragment>
      <Navbar toggleStoreLocator={toggleStoreLocator} setSidebar={setSidebar} />
      <CSSTransition in={showLocationModal} timeout={150}>
        <StoreLocator toggleStoreLocator={toggleStoreLocator} />
      </CSSTransition>
      <div className='main-wrapper'>
        <div className={`main-page-content`}>
          <Switch>
            <Route
              exact
              path={'/'}
              component={React.lazy(() => import('./components/home'))}
            />
            <Route
              exact
              path={'/product/:id'}
              component={React.lazy(() => import('./components/product'))}
            />
            <Route
              exact
              path={'/search'}
              component={React.lazy(() => import('./components/search'))}
            />
          </Switch>
        </div>
        <div className='sidebar-content'>
          {sidebar === 'cart' && <CartSidebar setSidebar={setSidebar} />}
          {sidebar === 'item' && <ItemSidebar setSidebar={setSidebar} />}
        </div>
      </div>
    </Fragment>
  );
};

export default App;
