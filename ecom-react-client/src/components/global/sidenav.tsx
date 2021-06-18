import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/auth-actions';
import { toggleSidebar, toggleSideNav } from '../../redux/layout-actions';
import { useAction, useAppSelector } from '../../redux/redux-hooks';
import { RootState } from '../../redux/store';

interface Props extends RouteComponentProps {
  close: () => void;
}

const Sidenav: FC<Props> = (props: Props) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const logoutAction = useAction(logoutUser);
  const toggleSideNavAction = useAction(toggleSideNav);

  return (
    <Fragment>
      <div className='sidenav'>
        <div className='d-flex justify-content-between'>
          <button className='icon-button-primary' onClick={props.close}>
            <i className='fas fa-arrow-left'></i>
          </button>
          {auth.isAuthenticated ? (
            <h6 className='user-text'>Welcome, {auth.user?.username}</h6>
          ) : (
            <Link
              to='/login?callback=/'
              onClick={toggleSideNavAction}
              className='user-text'
            >
              Login Here
            </Link>
          )}
        </div>
        <div className='sidenav-links'>
          <div className='link'>
            <i className='fas fa-home'></i>
            <Link to='/' onClick={toggleSideNavAction}>
              Home
            </Link>
          </div>
          <div className='link'>
            <i className='fas fa-user-cog'></i>
            <Link to='/account' onClick={toggleSideNavAction}>
              Account
            </Link>
          </div>
          {auth.isAuthenticated && (
            <div className='link'>
              <i
                className='fas fa-sign-out-alt'
                style={{ transform: 'rotate(-180deg)' }}
              ></i>
              <Link
                to='/'
                onClick={(e) => {
                  e.preventDefault();
                  logoutAction();
                  toggleSideNavAction();
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Sidenav);
