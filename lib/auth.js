const env = require('./env');

const users = {
  [env('ADMIN_USERNAME')]: {
    password: env('ADMIN_PASSWORD'),
  },
};

module.exports = function validate(request, username, password) {
  const user = users[username];
  if (!user) {
    return { isValid: false, credentials: null };
  }

  const isValid = password === user.password;
  const credentials = { username };
  return { isValid, credentials };
};
