import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import MakeChat from './pages/CreateRoom';

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
  ];

  const router = createBrowserRouter(
    routeLists.map((item) => {
      return {
        ...item,
        element: <NavigationBar>{item.element}</NavigationBar>,
      };
    }),
  );
  return <RouterProvider router={router} />;
};

export default Index;
