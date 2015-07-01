var config = {}

config.tumblr = {};
config.env = {};
config.db = {};
config.db.session = {};

config.tumblr.token = process.env.TUMBLR_TOKEN || 'FAKE_TOKEN';
config.tumblr.tokenSecret = process.env.TUMBLR_TOKEN_SECRET || 'FAKE_SECRET_TOKEN';

config.env.port = process.env.PORT || 3000;
config.env.emptyLog = process.env.EMPTY_LOG || true;
config.env.baseUrl = process.env.BASE_URL || 'http://wvvw.me';

config.db.uri = process.env.DB_URI || 'mongodb://localhost:27017/xtend';
config.db.session.secret = process.env.DB_SESSON.SECRET || 'keyboard cat';
config.db.defaultPlanId = process.env.DB_DEFAULT_PLAN_ID || 'FAKE_PLAN_ID';

module.exports = config;