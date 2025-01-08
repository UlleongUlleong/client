import React from 'react';
import styled from 'styled-components';
import RegisterBox from '../../register/RegisterBox';

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
  height: 100%;
  .container {
    width: 40%;
    min-width: 500px;
  }
`;

export default Register;
