import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, Fragment, useReducer, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import {
  setSidebar,
  toggleSideNav,
  toggleStoreLocator,
} from '../../redux/layout-actions';
import {
  useAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks';
import { RootState } from '../../redux/store';
import { useFetchCart } from '../../utils/hooks';
import SearchBar from './search-bar';
import SideNav from './sidenav';
import StoreLocator from './store-locator';

interface Props extends RouteComponentProps {}

const Navbar: FC<Props> = (props: Props) => {
  const query = useFetchCart();
  const toggleStoreLocatorAction = useAction(toggleStoreLocator);
  const setSidebarAction = useAction(setSidebar);
  const toggleSideNavAction = useAction(toggleSideNav);
  const layout = useAppSelector((state: RootState) => state.layout);

  return (
    <Fragment>
      <CSSTransition in={layout.showStoreLocator} timeout={150}>
        <StoreLocator toggleStoreLocator={toggleStoreLocatorAction} />
      </CSSTransition>
      <CSSTransition in={layout.showSideNav} timeout={150}>
        <SideNav close={() => toggleSideNavAction(false)} />
      </CSSTransition>
      <nav className='top-nav'>
        <div className='icon-wrapper'>
          <i
            className='fas fa-bars menu-icon'
            onClick={toggleSideNavAction}
          ></i>
        </div>
        <div className='image-wrapper'>
          <img className='brand-image' src='/images/wmt-logo.png' alt='' />
        </div>
        <SearchBar />
        <div
          className='location-icon-wrapper'
          onClick={toggleStoreLocatorAction}
        >
          <i className='fas fa-map-marker-alt'></i>
        </div>
        <div className='liked-items-wrapper'>
          <i
            className='fas fa-heart'
            onClick={(e) => {
              setSidebarAction('likes');
              if (['/account', '/checkout'].includes(props.location.pathname)) {
                props.history.push('/');
              }
            }}
          ></i>
        </div>
        <div
          className='cart-icon-wrapper'
          onClick={(e) => {
            setSidebarAction('cart');
            if (['/account', '/checkout'].includes(props.location.pathname)) {
              props.history.push('/');
            }
          }}
        >
          <i className='fas fa-shopping-bag'>
            <span className='badge rounded-pill badge-notification bg-secondary'>
              {query.isFetched && query.isSuccess
                ? query.data.products.length
                : 0}
            </span>
          </i>
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
