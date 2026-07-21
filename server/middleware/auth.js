const jwt = require("jsonwebtoken");
require('dotenv').config();
const authService = require('../service/auth.service');
const constants = require('../utils/constants');

const BEARER_PREFIX = 'Bearer ';

/**
 * Clients send the token as `x-auth-token: Bearer <jwt>`. A bare token and a
 * standard `authorization` header are accepted too, so an older client that
 * sends the raw value keeps working.
 */
const extractToken = (req) => {
   const header = req.header('x-auth-token') || req.header('authorization');
   if (!header) return null;
   const token = header.startsWith(BEARER_PREFIX) ? header.slice(BEARER_PREFIX.length) : header;
   return token.trim() || null;
}

const resolveUser = async (token) => {
   // verify, not decode: decoding alone accepts any forged payload
   const decoded = jwt.verify(token, process.env.JWT_TOKEN);
   return authService.getUserById({ _id: decoded.sub });
}

const auth = async (req, res, next) => {
   const token = extractToken(req);
   if (!token) return res.status(401).send({ message: constants.TOKEN_MISSING });
   try {
      const user = await resolveUser(token);
      if (!user) return res.status(401).send({ message: constants.INVALID_TOKEN });
      req.user = user;
      next();
   } catch (error) {
      return res.status(401).send({ message: constants.INVALID_TOKEN });
   }
}

const permission = async (req, res, next) => {
   const token = extractToken(req);
   if (!token) return res.status(401).send({ message: constants.TOKEN_MISSING });
   try {
      const user = await resolveUser(token);
      if (!user) return res.status(401).send({ message: constants.INVALID_TOKEN });
      req.user = user;
      if (user.isAdmin !== true) return res.status(403).send({ message: constants.FORBIDDEN });
      next();
   } catch (error) {
      return res.status(401).send({ message: constants.INVALID_TOKEN });
   }
}

module.exports = { auth, permission }
