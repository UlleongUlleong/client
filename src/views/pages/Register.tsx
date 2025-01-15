import React from 'react';
import styled from 'styled-components';
import RegisterBox from '../../components/register/RegisterBox';

const Register = () => {
  return (
    <RegisterStyle>
      <div className="container">
        <RegisterBox />
      </div>
    </RegisterStyle>
  );
};

const RegisterStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  .container {
    width: 40%;
    min-width: 500px;
  }
`;

export default Register;
