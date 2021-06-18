import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/auth-actions';
import { useAction } from '../../redux/redux-hooks';

interface Props extends RouteComponentProps {}

interface State {
  username: string;
  email: string;
  password: string;
  error: string | null;
  callback: string | null;
}

const RegisterPage: FC<Props> = (props: Props) => {
  const params = new URLSearchParams(props.location.search);
  const registerAction = useAction(registerUser);

  const [state, setState] = useState<State>({
    callback: params.get('callback') || '/',
    username: '',
    email: '',
    password: '',
    error: null,
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e: any) => {
    try {
      await registerAction(state.username, state.email, state.password);
      props.history.push(state.callback || '/');
    } catch (err) {
      setState({ ...state, error: err.message });
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form-wrapper'>
        <div className='form-left'>
          <h5 className='form-header'>Sign Up</h5>
          <div className='form-body'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            {state.error && (
              <span style={{ color: '#aa0000' }}>{state.error}</span>
            )}
            <button className='wmt-btn-primary' onClick={register}>
              Sign Up
            </button>
            <p>
              Already have an account?
              <br />
              <Link to={'/login'}>Sign In Here!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegisterPage);
