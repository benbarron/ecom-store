import React, { FC, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {}

interface State {
  otp: string;
  error: string | null;
  callback: string | null;
  loading: boolean;
}

const VerifyPage: FC<Props> = (props: Props) => {
  const params = new URLSearchParams(props.location.search);

  const [state, setState] = useState<State>({
    callback: params.get('callback'),
    otp: '',
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
    e.preventDefault();
  };

  return (
    <div className='login-page'>
      <div className='login-form-wrapper'>
        <div className='form-left'>
          <h5 className='form-header'>2-Factor Verification</h5>
          <div className='form-body'>
            <input
              type='password'
              placeholder='Otp Code'
              name='otp'
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

export default withRouter(VerifyPage);
