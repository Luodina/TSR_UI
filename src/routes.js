import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const RequestList = Loadable({
  loader: () => import('./views/ReqList/RequestList'),
  loading: Loading,
});

const RequestPackage = Loadable({
  loader: () => import('./views/ReqPack/ReqPack'),
  loading: Loading,
});

const Request = Loadable({
  loader: () => import('./views/Request/Request'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  // { path: '/reqlist', exact: true, name: 'My Request List', component: RequestList },
  { path: '/reqlist/:type', exact: true, name: 'Bundles List', component: RequestList },
  { path: '/reqlist/:type/:id', exact: true, name: 'Request Bundle Details', component: Request },
  { path: '/request', exact: true, name: 'Request', component: RequestPackage },
  { path: '/request/new', exact: true, name: 'New Request', component: Request },
];

export default routes;
