import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';

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
