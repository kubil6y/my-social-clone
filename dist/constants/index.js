"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = exports.__dev__ = exports.__prod__ = exports.NODE_ENV = void 0;
exports.NODE_ENV = process.env.NODE_ENV;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.__dev__ = process.env.NODE_ENV === 'development';
exports.PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
//# sourceMappingURL=index.js.map