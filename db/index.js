const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL)

const User = _conn.define('user', {
  name: Sequelize.STRING,
  handle: Sequelize.STRING,
  tweet: Sequelize.STRING
});

const sync = ()=> {
  return _conn.sync({ force: true });
};

const seed = ()=> {
  return Promise.all([
    User.create({ name: 'Katy Perry', handle: '@katyperry', tweet: 'I got the eye of the tiger, a fighter, dancing through the fire cause am a champion and youre donna hear me ROAR!!!'}),
    User.create({ name: 'Justin Bieber', handle: '@justinbieber', tweet: 'My momma dont like you and she likes everyone.'}),
    User.create({ name: 'Barack Obama', handle: '@BarackObama', tweet: 'Change will not come if we wait for some other person or some other time.'})
  ])
};


module.exports = {
  sync, 
  seed,
  models: {
    User
  }
}