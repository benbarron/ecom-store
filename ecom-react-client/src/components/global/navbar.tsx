import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useFetchCart } from '../../utils/hooks';
import SearchBar from './search-bar';

interface Props extends RouteComponentProps {
  setSidebar: (v: 'item' | 'cart') => void;
  toggleStoreLocator: () => void;
}

const Navbar: FC<Props> = (props: Props) => {
  const query = useFetchCart();

  return (
    <Fragment>
      <nav className='top-nav'>
        <div className='icon-wrapper'>
          <i className='fas fa-bars menu-icon'></i>
        </div>
        <div className='image-wrapper'>
          <img className='brand-image' src='/images/wmt-logo.png' alt='' />
        </div>
        <SearchBar />
        <div
          className='location-icon-wrapper'
          onClick={props.toggleStoreLocator}
        >
          <i className='fas fa-map-marker-alt'></i>
        </div>
        <div className='liked-items-wrapper'>
          <i
            className='fas fa-heart'
            onClick={(e) => props.setSidebar('item')}
          ></i>
        </div>
        <div
          className='cart-icon-wrapper'
          onClick={(e) => props.setSidebar('cart')}
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
