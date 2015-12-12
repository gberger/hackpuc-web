
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/hackpuc-test',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  }
};
