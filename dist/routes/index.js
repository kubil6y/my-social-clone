"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = exports.searchRouter = exports.registerRouter = exports.authRouter = void 0;
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_route_1.router; } });
var register_route_1 = require("./register.route");
Object.defineProperty(exports, "registerRouter", { enumerable: true, get: function () { return register_route_1.router; } });
var search_route_1 = require("./search.route");
Object.defineProperty(exports, "searchRouter", { enumerable: true, get: function () { return search_route_1.router; } });
var post_route_1 = require("./post.route");
Object.defineProperty(exports, "postRouter", { enumerable: true, get: function () { return post_route_1.router; } });
//# sourceMappingURL=index.js.map