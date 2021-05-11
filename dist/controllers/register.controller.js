"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.checkUsername = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var utils_1 = require("../utils");
var models_1 = require("../models");
var constants_1 = require("../constants");
var checkUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, errors, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                errors = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (username.length < 2) {
                    errors.username = 'Username must contain at least 2 characters';
                }
                if (!utils_1.regexUserName.test(username)) {
                    errors.username = 'Username is invalid';
                }
                return [4 /*yield*/, models_1.User.findOne({ username: username.toString() })];
            case 2:
                user = _a.sent();
                if (user)
                    errors.username = 'Username is already taken';
                if (Object.values(errors).length > 0) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                return [2 /*return*/, res.send('Available')];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_1, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkUsername = checkUsername;
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, username, bio, facebook, youtube, twitter, instagram, profilePicUrl, errors, emailExists, usernameExists, user, social, follower, profile, payload, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body.user, name = _a.name, email = _a.email, password = _a.password, username = _a.username, bio = _a.bio, facebook = _a.facebook, youtube = _a.youtube, twitter = _a.twitter, instagram = _a.instagram;
                profilePicUrl = req.body.profilePicUrl;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                errors = {};
                // VALIDATION
                if (username.length < 2) {
                    errors.username = 'Username must contain at least 2 characters.';
                }
                if (!utils_1.regexUserName.test(username)) {
                    errors.username = 'Username is invalid.';
                }
                if (!isEmail_1.default(email))
                    errors.email = 'Email is not valid.';
                if (password.length < 6)
                    errors.password = 'Password must be at least 6 characters.';
                return [4 /*yield*/, models_1.User.findOne({ email: email.toLowerCase() })];
            case 2:
                emailExists = _b.sent();
                if (emailExists)
                    errors.email = 'Email is already taken.';
                return [4 /*yield*/, models_1.User.findOne({
                        username: username.toLowerCase(),
                    })];
            case 3:
                usernameExists = _b.sent();
                if (usernameExists)
                    errors.username = 'Username is already taken.';
                if (Object.values(errors).length > 0) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                user = new models_1.User({
                    name: name,
                    email: email.toLowerCase(),
                    username: username.toLowerCase(),
                    password: password,
                    profilePicUrl: profilePicUrl || utils_1.userPng,
                });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                social = {};
                if (facebook)
                    social.facebook = facebook;
                if (twitter)
                    social.twitter = twitter;
                if (instagram)
                    social.instagram = instagram;
                if (youtube)
                    social.youtube = youtube;
                follower = new models_1.Follower({
                    user: user._id,
                    follower: [],
                    following: [],
                });
                profile = new models_1.Profile({
                    user: user._id,
                    bio: bio,
                    social: social,
                });
                return [4 /*yield*/, follower.save()];
            case 5:
                _b.sent();
                return [4 /*yield*/, profile.save()];
            case 6:
                _b.sent();
                payload = { userId: user._id };
                token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET);
                return [2 /*return*/, res.json(token)];
            case 7:
                error_2 = _b.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
//# sourceMappingURL=register.controller.js.map