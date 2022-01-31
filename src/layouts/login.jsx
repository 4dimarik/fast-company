import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );

  useEffect(() => {
    setFormType(type ? 'register' : 'login');
  }, [type]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">
            {formType === 'login' ? (
              'Login'
            ) : (
              <Link className="text-primary" to="/login">
                Login
              </Link>
            )}
            {'  /  '}
            {formType === 'register' ? (
              'Register'
            ) : (
              <Link className="text-primary" to="/login/register">
                Register
              </Link>
            )}
          </h3>
          {formType === 'register' ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Login;
