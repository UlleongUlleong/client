import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChatLists from './pages/ChatLists';
import MakeChat from './pages/CreateRoom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerificationTab from '../components/register/email-verify/EmailVerificationTab';
import Mypage from './pages/Mypage';
import ProfileLike from './pages/ProfileLike';
import ProfileReview from './pages/ProfileReview';
import AlcoholDetail from './pages/AlcoholDetail';
import Reviews from './pages/Reviews';
import ReviewLists from './pages/ReviewLists';

const Index = () => {
  const routeLists = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/chat-lists',
      element: <ChatLists />,
    },
    {
      path: '/reviews',
      element: <Reviews />,
    },
    {
      path: '/alcohol-lists/:id',
      element: <ReviewLists />,
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
    {
      path: '/register',
      element: <Register />,
      noNav: true,
    },
    {
      path: '/email-verification',
      element: <EmailVerificationTab />,
      noNav: true,
    },
    {
      path: '/profile',
      element: <Mypage />,
    },
    {
      path: '/profile/like',
      element: <ProfileLike />,
    },
    {
      path: '/profile/review',
      element: <ProfileReview />,
    },
    {
      path: '/alcohol/:id',
      element: <AlcoholDetail />,
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
