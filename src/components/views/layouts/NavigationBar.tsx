import React from 'react';
import styled from 'styled-components';
import { BiHomeAlt } from 'react-icons/bi';
import { FaRegThumbsUp, FaRegUser } from 'react-icons/fa';

interface NavButtonProps {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavigationBarProps {
  children: React.ReactNode;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  return (
    <NavigationBarStyle>
      <div className="navbar">
        <div>
          <NavButton label="Home" Icon={BiHomeAlt} />
          <NavButton label="Reviews" Icon={FaRegThumbsUp} />
        </div>
        <div className="user-btn">
          <button>
            <FaRegUser />
          </button>
        </div>
      </div>
      {children}
    </NavigationBarStyle>
  );
};

const NavButton = ({ label, Icon }: NavButtonProps) => (
  <div className="btn">
    <button>
      <div>{label}</div>
      <Icon />
    </button>
  </div>
);

const NavigationBarStyle = styled.div`
  height: 100%;
  display: flex;

  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 6%;
    min-width: 80px;
    height: 100%;
    background: black;
    padding: 30px 0;
  }

  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    button {
      color: white;
      background: none;
      border: none;
      cursor: pointer;

      div {
        font-size: 0.8rem;
      }

      svg {
        font-size: 2.2rem;
      }

      &:hover {
        color: gray;
      }
    }
  }

  .user-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      color: white;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        font-size: 2.2rem;
      }

      &:hover {
        color: gray;
      }
    }
  }
`;

export default NavigationBar;
