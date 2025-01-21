import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

export const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 16px;

    .Toastify__toast-body {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .Toastify__toast-icon {
      font-size: 1.2rem;
      font-weight: bold;
      vertical-align: middle;
    }

    .Toastify__close-button {
      color: #333;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
