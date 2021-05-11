"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
exports.router = express_1.Router();
exports.router.get('/:searchText', middlewares_1.auth, controllers_1.searchUser);
//# sourceMappingURL=search.route.js.map