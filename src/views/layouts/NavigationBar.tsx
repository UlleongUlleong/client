import React from 'react';
import styled from 'styled-components';
import { BiHomeAlt } from 'react-icons/bi';
import { FaRegThumbsUp, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
}

interface NavigationBarProps {
  children: React.ReactNode;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  return (
    <NavigationBarStyle>
      <div className="navbar">
        <div>
          <NavButton label="Home" Icon={BiHomeAlt} path="/" />
          <NavButton label="Reviews" Icon={FaRegThumbsUp} path="/reviews" />
        </div>
        <div className="user-btn">
          <Link to="/profile">
            <FaRegUser />
          </Link>
        </div>
      </div>
      {children}
    </NavigationBarStyle>
  );
};

const NavButton = ({ label, Icon, path }: NavButtonProps) => (
  <div className="btn">
    <Link to={path}>
      <div>{label}</div>
      <Icon />
    </Link>
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
    @media (max-width: 432px) {
      min-width: 70px;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    a {
      color: white;
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

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

    a {
      color: white;
      text-decoration: none;
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
