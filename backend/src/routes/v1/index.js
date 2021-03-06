const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const answerRoute = require('./answer.route');
const adminRoute = require('./admin.route');
const config = require('../../config/config');
const questionRoute = require ('./question.route');
const votingRoute = require ('./voting.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/answer',
    route: answerRoute,
  },
  {
    path: '/question',
    route: questionRoute,
  },
  {
    path: '/voting',
    route: votingRoute,
  },
  { path: '/admin', route: adminRoute },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
