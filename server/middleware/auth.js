const { verify } = require("jsonwebtoken");
require('dotenv').config();
const authService = require('../service/auth.service');
const { required } = require("joi");
const { jwtDecode } = require("jwt-decode");

const auth = async (req, res, next) => {
   const accessToken = req.header('x-auth-token');
   const token = accessToken?.slice(7)
   console.log(token, ":token")
   if (!token) return res.status(401).send("ACCESS DENIED: Authorization token is undefined");
   try {
      const decode = jwtDecode(token);
      const user = await authService.getUserById({ _id: decode.sub })
      req.user = user;
      next();
   } catch (error) {
      console.log(error,"error")
      res.status(400).send("Invalid token");
   }
}

const permission = async (req, res, next) => {
   const accessToken = req.header('x-auth-token');
   const token = accessToken.slice(7)
   if (token) {
      const decode = verify(token, process.env.JWT_TOKEN);
      const user = await authService.getUserById({ _id: decode.sub })
      req.user = user;
      if (decode.user.isAdmin === true) {
         next();
      } else {
         res.status(403).send("Forbidden");
      }
   }
}

module.exports = { auth, permission }
