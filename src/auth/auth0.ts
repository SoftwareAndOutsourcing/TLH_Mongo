module.exports = {
  config: (app) => {
    const { auth } = require('express-openid-connect');

    const config = {
      authRequired: false,
      auth0Logout: true,
      secret: process.env.AUTH0_SECRET,
      baseURL: process.env.AUTH0_BASEURL,
      clientID: process.env.AUTH0_CLIENTID,
      issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
    };

    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(config));

    // req.isAuthenticated is provided from the auth router
    // app.get('/', (req, res) => {
    //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // });

    // If you want the user info, add the middleware like below.
    // e.g.app.get('', requiresAuth(), (req, res) => { //req.oidc.user });
  },
}
