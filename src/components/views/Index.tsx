import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import Mypage from '../../pages/Mypage';
import ProfileLike from '../../pages/ProfileLike';
import ProfileReview from '../../pages/ProfileReview';

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
      path: '/profile',
      element: <Mypage />
    },
    {
      path: '/profile/like',
      element: <ProfileLike />
    },
    {
      path: '/profile/review',
      element: <ProfileReview />
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
