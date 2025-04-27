module.exports = {
  jwtSecret: process.env.JWT_SECRET || "rbac_blog_secret_key",
  jwtExpire: process.env.JWT_EXPIRE || "30d",
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
};
