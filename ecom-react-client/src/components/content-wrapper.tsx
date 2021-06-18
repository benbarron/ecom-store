import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useAction, useAppSelector } from '../redux/redux-hooks';
import { RootState } from '../redux/store';
import Navbar from './global/navbar';
import CartSidebar from './global/cart-sidebar';
import ItemSidebar from './global/item-sidebar';
import { setSidebar } from '../redux/layout-actions';

interface Props extends RouteComponentProps {
  children: JSX.Element;
  showSidebar: boolean;
}

const ContentWrapper: FC<Props> = (props: Props) => {
  const layout = useAppSelector((state: RootState) => state.layout);
  const setSidebarAction = useAction(setSidebar);

  return (
    <Fragment>
      <Navbar />
      <div className='main-wrapper'>
        <div className={`main-page-content ${!props.showSidebar && 'full'}`}>
          {props.children}
        </div>
        {props.showSidebar && (
          <div className='sidebar-content'>
            {layout.sidebar === 'cart' && (
              <CartSidebar setSidebar={setSidebarAction} />
            )}
            {layout.sidebar === 'likes' && (
              <ItemSidebar setSidebar={setSidebarAction} />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(ContentWrapper);
