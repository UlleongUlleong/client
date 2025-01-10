import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import MakeChat from './pages/CreateRoom';
import Login from './pages/Login';

const Index = () => {
  const routeLists = [
    {
      path: '/',
      element: <></>,
    },
    {
      path: '/reviews',
      element: <></>,
    },
    {
      path: '/rooms',
      element: <MakeChat />,
    },
    {
      path: '/login',
      element: <Login />,
      noNav: true,
    },
  ];

  const router = createBrowserRouter(
    routeLists.map((item) => {
      return {
        ...item,
        element: item.noNav ? (
          item.element
        ) : (
          <NavigationBar>{item.element}</NavigationBar>
        ),
      };
    }),
  );
  return <RouterProvider router={router} />;
};

export default Index;
