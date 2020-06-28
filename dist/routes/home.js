"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var router = _express["default"].Router();

_dotenv["default"].config();

var authenticateToken = function authenticateToken(req, res, next) {
  var token = req.cookies['awtToken'];

  if (!token) {
    return res.redirect('/users/loginPage');
  }

  _jsonwebtoken["default"].verify(token, process.env.jwt_key, function (err, data) {
    if (err) return res.status(403).send({
      msg: 'Unauthorized Forbidden'
    });
    req.user = data;
    next();
  });
};
/* GET home page. */


router.get('/', authenticateToken, function (req, res, next) {
  res.render('home', req.user);
});
module.exports = router;
//# sourceMappingURL=home.js.map