const config = require("../config/config");

// Role authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.userRole} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Admin only middleware - convenience method
exports.adminOnly = (req, res, next) => {
  if (req.userRole !== config.roles.ADMIN) {
    return res.status(403).json({
      success: false,
      message: "Only admins can access this route",
    });
  }
  next();
};
