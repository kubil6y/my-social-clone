"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
exports.router = express_1.Router();
exports.router.get('/:username', controllers_1.checkUsername);
exports.router.post('/', controllers_1.registerUser);
//# sourceMappingURL=register.route.js.map