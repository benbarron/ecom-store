import React, { FC, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAction } from '../../redux/redux-hooks';
import { loginUser } from '../../redux/auth-actions';

interface Props extends RouteComponentProps {}

interface State {
  username: string;
  password: string;
  error: string | null;
  callback: string | null;
  loading: boolean;
}

const LoginPage: FC<Props> = (props: Props) => {
  const params = new URLSearchParams(props.location.search);
  const loginAction = useAction(loginUser);

  const [state, setState] = useState<State>({
    callback: params.get('callback'),
    username: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e: any) => {
    try {
      setState({ ...state, loading: true });
      await loginAction(state.username, state.password);
      props.history.push(state.callback || '/');
    } catch (err) {
      setState({ ...state, error: err.message, loading: false });
      setTimeout(() => setState({ ...state, error: null }), 5000);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form-wrapper'>
        <div className='form-left'>
          <h5 className='form-header'>Sign In</h5>
          <div className='form-body'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            <div className='error'>
              <p>{state.error ? state.error : ' '}</p>
            </div>
            <button
              className='wmt-btn-primary'
              onClick={login}
              disabled={state.loading}
            >
              Login
            </button>
            <p>
              Don't have an account?
              <br />
              <Link to={`/register?callback=${params.get('callback')}`}>
                Register Here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
