import PropTypes from 'prop-types';

import React, {

  useState
} from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import {
  FormContainer
} from 'app/elements/form/formContainer';

import {
  PopupContainer
} from 'app/elements/popup/popupContainer';

import {
  handleKeyDown
} from 'app/utils';

import {
  Loader
} from '../loader/loader';

import {
  useInput
} from './useInput';

export const LoginForm = ({
  show,
  closeButtonText,
  onCloseButton,
  onOkButton,
  isLoading,
}) => {

  const [okButtonText, setOkButtonText] = useState('Login');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [email, EmailInput, resetValue] = useInput({
    value: '',
    id: 'email',
    placeholder: 'Email',
  });
  const [password, PasswordInput, resetPassValue] = useInput({
    value: '',
    id: 'password',
    placeholder: 'Password',
    type: 'password',
  });
  const [name, NameInput, resetNameValue] = useInput({
    value: '',
    id: 'name',
    placeholder: 'Name',
  });

  const login = () => {

    if (!email || !password) {

      setIsInputEmpty(true);

      return;

    }

    if (okButtonText !== 'Login' && !name) {

      setIsInputEmpty(true);

      return;

    }

    onOkButton(
      {
        email,
        password,
        name: okButtonText !== 'Login' ? name : undefined,
      },
      okButtonText
    );

    resetValue('');
    resetNameValue('');
    resetPassValue('');
    setIsInputEmpty(false);

  };

  const closeForm = () => {

    resetValue('');
    resetNameValue('');
    resetPassValue('');
    onCloseButton({
      login: false,
      type: 'login',
    });
    setIsInputEmpty(false);

  };

  return (
    <React.Fragment>
      {show ? (
        <PopupContainer>
          <FormContainer
            inputEmpty={isInputEmpty}
            isSubmitting={isLoading}
          >
            <div className='container form'>
              {isLoading ? (
                <Loader size='5x' />
              ) : (
                <React.Fragment>
                  <div className='input-container'>
                    {okButtonText === 'Signup' && (
                      <React.Fragment>
                        <label htmlFor='name'>Name</label>
                        {NameInput}
                      </React.Fragment>
                    )}
                    <label htmlFor='email'>Email</label>
                    {EmailInput}
                    <label htmlFor='password'>Password</label>
                    {PasswordInput}

                    {okButtonText === 'Login' ? (
                      <p>
                        Don&#39;t have an account?{' '}
                        <a
                          onClick={() => setOkButtonText('Signup')}
                          href='#signup'
                        >
                          Sign up
                        </a>
                      </p>
                    ) : (
                      <p>
                        Already have an account?{' '}
                        <a
                          onClick={() => setOkButtonText('Login')}
                          href='#login'
                        >
                          Log In
                        </a>
                      </p>
                    )}
                  </div>

                  <div className='button'>
                    <div
                      data-testid='close-button'
                      onClick={closeForm}
                      role='button'
                      tabIndex='0'
                      onKeyDown={e => handleKeyDown(e, closeForm)}
                    >
                      <p>{closeButtonText}</p>
                    </div>
                    <div
                      data-testid='add-button'
                      role='button'
                      tabIndex='0'
                      onKeyDown={e => handleKeyDown(e, login)}
                      onClick={login}
                    >
                      <p>{okButtonText}</p>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </FormContainer>
        </PopupContainer>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );

};

LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  onCloseButton: PropTypes.func,
  isLoading: PropTypes.bool,
  onOkButton: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Login',
  onCloseButton: () => {},
  show: false,
  isLoading: false,
  requestStatus: '',
  message: '',
  onOkButton: () => {},
};
