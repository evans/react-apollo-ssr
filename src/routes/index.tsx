// ./routes/index.js
import React from 'react';

// import MainPage from './MainPage';
// import AnotherPage from './AnotherPage';

const MainPage = () => <div> main </div>;
const AnotherPage = () => <div> another </div>;

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: MainPage,
  },
  {
    path: '/another',
    name: 'another',
    component: AnotherPage,
  },
];

export default routes;
