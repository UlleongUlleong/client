import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChatLists from './pages/ChatLists';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerificationTab from '../components/register/email-verify/EmailVerification';
import Mypage from './pages/Mypage';
import ProfileLike from './pages/ProfileLike';
import ProfileReview from './pages/ProfileReview';
import AlcoholDetail from './pages/AlcoholDetail';
import Reviews from './pages/Reviews';
import ReviewLists from './pages/ReviewLists';
import SearchAlcohol from './pages/SearchAlcohol';
import ChatSearchList from './pages/ChatSearchList';
import FindPassword from '../components/login/FindPassword';
import EmailDuplicateTest from '../components/register/email-verify/EmailDuplicateTest';
import ChatRoom from './pages/ChatRoom';
import CreateRoom from './pages/CreateRoom';
import Test from '../components/chat-room/Test';
import LoadingScreen from '../components/chat-room/LoadingScreen';

const Index = () => {
  const routeLists = [
    { path: '/test', element: <Test />, noNav: true },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/chat-lists',
      element: <ChatLists />,
    },
    {
      path: '/chat-lists/results',
      element: <ChatSearchList />,
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
      path: '/alcohol-lists/results',
      element: <SearchAlcohol />,
    },
    {
      path: '/create-room',
      element: <CreateRoom />,
    },
    {
      path: '/chat/:roomId',
      element: <ChatRoom />,
      noNav: true,
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
      path: '/email-duplication',
      element: <EmailDuplicateTest />,
      noNav: true,
    },
    {
      path: '/email-verification',
      element: <EmailVerificationTab />,
      noNav: true,
    },
    {
      path: '/find-password',
      element: <FindPassword />,
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
