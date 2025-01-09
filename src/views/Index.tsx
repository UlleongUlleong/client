import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChatLists from './pages/ChatLists';
import React from 'react';
const Index = () => {
  const routeLists = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/chatlist',
      element: <ChatLists />,
    },
    {
      path: '/reviews',
      element: <></>,
    },
    {
      path: '*',
      element: <NotFound />,
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
