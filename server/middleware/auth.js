const { verify } = require("jsonwebtoken");
require('dotenv').config();

function auth(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).send("ACCESS DENIED: Authorization token is undefined");
   try {
      const decode = verify(token, process.env.JWT_TOKEN);
      req.user = decode;
      next();
   } catch (error) {
      res.status(400).send("Invalid token");
   }
}

function permission(req, res, next) {
   const token = req.header('x-auth-token');
   if (token) {
      const decode = verify(token, process.env.JWT_TOKEN);
      req.user = decode;
      console.log(decode,"decode")
      if(decode.user.isAdmin === true) {
         next();
      }else{
         res.status(403).send("Forbidden");
      }
   }  
}

module.exports = {auth,permission}
