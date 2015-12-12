
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/hackpuc-production',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    secret: process.env.TWILIO_SECRET
  }
};
