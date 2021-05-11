"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
exports.router = express_1.Router();
// TODO returns too much information
exports.router.get('/:username', controllers_1.getUser);
exports.router.post('/', controllers_1.login);
exports.router.get('/', middlewares_1.auth, controllers_1.getUserDetails);
//# sourceMappingURL=auth.route.js.map