
const ensureAuthenticated = (req, res, next) => {
  console.log('user data from auth: ', req.user);
  console.log('🔍 Session:', req.session);
  console.log('🛡️ req.isAuthenticated():', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
      };
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }

  module.exports = {
    ensureAuthenticated
  };
  
  