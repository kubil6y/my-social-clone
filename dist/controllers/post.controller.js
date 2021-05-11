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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.editCommentOnPost = exports.deleteCommentOnPost = exports.getCommentsOfAPost = exports.getCommentOfAPost = exports.commentOnAPost = exports.getLikesOfAPost = exports.dislikeAPost = exports.likeAPost = exports.deletePostById = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
var uuid_1 = require("uuid");
var utils_1 = require("../utils");
var models_1 = require("../models");
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, text, location, picUrl, user, errors, newPost, post, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, text = _a.text, location = _a.location, picUrl = _a.picUrl;
                user = req.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                errors = {};
                if (text.length < 1)
                    errors.text = 'Text must be at least one character.';
                if (Object.values(errors).length > 0) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                newPost = {
                    user: user,
                    text: text,
                };
                if (location)
                    newPost.location = location;
                if (picUrl)
                    newPost.picUrl = picUrl;
                post = new models_1.Post(newPost);
                return [4 /*yield*/, post.save()];
            case 2:
                _b.sent();
                // TODO we will only send the _id of this post at the end.
                return [2 /*return*/, res.json(post)];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, utils_1.msg500(error_1, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, size, posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageNumber = req.query.pageNumber;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                size = 6;
                posts = void 0;
                if (!(+pageNumber === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.Post.find()
                        .sort({ createdAt: 'desc' })
                        .limit(size)
                        .populate('user')];
            case 2:
                // first posts come from getServerSideProps,
                // getServerSideProps has pageNumber as 1
                posts = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, models_1.Post.find()
                    .sort({ createdAt: 'desc' })
                    .skip(size * (+pageNumber - 1))
                    .limit(size)
                    .populate('user')];
            case 4:
                posts = _a.sent();
                _a.label = 5;
            case 5: 
            // with twitter layout i only need, comment and like counts.
            //.populate('comments.user');
            return [2 /*return*/, res.json(posts)];
            case 6:
                error_2 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_2, res)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Post.findById(postId)
                        .populate('user')
                        .populate('comments.user')];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                return [2 /*return*/, res.json(post)];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_3, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPostById = getPostById;
var deletePostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, user, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, models_1.Post.findById(postId)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                if (!(user.role === 'root' || post.user.toString() === user._id.toString())) return [3 /*break*/, 4];
                return [4 /*yield*/, post.remove()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, utils_1.msg401(res)];
            case 5: return [2 /*return*/, res.send('Deleted Successfully')];
            case 6:
                error_4 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_4, res)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deletePostById = deletePostById;
var likeAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, user, post, hasLiked, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Post.findById(postId)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                hasLiked = post.likes.find(function (like) { return like.user.toString() === user._id.toString(); });
                if (hasLiked) {
                    return [2 /*return*/, res.status(400).send('You have already liked the post.')];
                }
                // so it shows as the most recent (eventhough unshift is less optimal than push!)
                post.likes.unshift({ user: user._id });
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send('Liked Successfully')];
            case 4:
                error_5 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_5, res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.likeAPost = likeAPost;
var dislikeAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, user, post, hasLiked, newLikes, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, models_1.Post.findById(postId)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                hasLiked = post.likes.find(function (like) { return like.user.toString() === user._id.toString(); });
                if (!hasLiked) return [3 /*break*/, 4];
                newLikes = post.likes.filter(function (like) { return like.user.toString() !== user._id.toString(); });
                post.likes = newLikes;
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send('Disliked Successfully')];
            case 4: return [2 /*return*/, res.status(400).send('You have not liked the post before.')];
            case 5:
                error_6 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_6, res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.dislikeAPost = dislikeAPost;
var getLikesOfAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Post.findById(postId).populate('likes.user')];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                return [2 /*return*/, res.json(post.likes)];
            case 3:
                error_7 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_7, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLikesOfAPost = getLikesOfAPost;
var commentOnAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, user, text, errors, post, newComment, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                user = req.user;
                text = req.body.text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                errors = {};
                if (text.length < 1) {
                    errors.text = 'Comment should be at least one character';
                }
                return [4 /*yield*/, models_1.Post.findById(postId).populate('likes.user')];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                if (Object.keys(errors).length > 0) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                newComment = {
                    uuid: uuid_1.v4(),
                    user: user,
                    text: text,
                    date: new Date(),
                };
                post.comments.unshift(newComment);
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json(newComment)];
            case 4:
                error_8 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_8, res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.commentOnAPost = commentOnAPost;
var getCommentOfAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, commentId, postId, post, comment, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, commentId = _a.commentId, postId = _a.postId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Post.findById(postId).populate('comments.user')];
            case 2:
                post = _b.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                comment = post.comments.find(function (comment) { return comment.uuid === commentId; });
                if (!comment)
                    return [2 /*return*/, res.status(404).send('Comment not found.')];
                return [2 /*return*/, res.json(comment)];
            case 3:
                error_9 = _b.sent();
                return [2 /*return*/, utils_1.msg500(error_9, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCommentOfAPost = getCommentOfAPost;
var getCommentsOfAPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Post.findById(postId).populate('comments.user')];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                return [2 /*return*/, res.json(post.comments)];
            case 3:
                error_10 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_10, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCommentsOfAPost = getCommentsOfAPost;
var deleteCommentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, commentId, postId, user, post, comment, isOwner, hasAccess, newComments, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, commentId = _a.commentId, postId = _a.postId;
                user = req.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Post.findById(postId).populate('comments.user')];
            case 2:
                post = _b.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                comment = post.comments.find(function (comment) { return comment.uuid === commentId; });
                if (!comment)
                    return [2 /*return*/, res.status(404).send('Comment not found.')];
                isOwner = comment.user._id.toString() === user._id.toString();
                hasAccess = isOwner || models_1.UserRole.root === user.role;
                if (!hasAccess)
                    return [2 /*return*/, utils_1.msg401(res)];
                newComments = post.comments.filter(function (comment) { return comment.uuid !== commentId; });
                post.comments = newComments;
                return [4 /*yield*/, post.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.send('Comment Deleted')];
            case 4:
                error_11 = _b.sent();
                return [2 /*return*/, utils_1.msg500(error_11, res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteCommentOnPost = deleteCommentOnPost;
var editCommentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, commentId, postId, user, text, post, comment, isOwner, hasAccess, newComments, error_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, commentId = _a.commentId, postId = _a.postId;
                user = req.user;
                text = req.body.text;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Post.findById(postId)];
            case 2:
                post = _b.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send('Post not found.')];
                comment = post.comments.find(function (comment) { return comment.uuid === commentId; });
                if (!comment)
                    return [2 /*return*/, res.status(404).send('Comment not found.')];
                isOwner = comment.user.toString() === user._id.toString();
                hasAccess = isOwner || models_1.UserRole.root === user.role;
                if (!hasAccess)
                    return [2 /*return*/, utils_1.msg401(res)];
                newComments = post.comments.map(function (comment) {
                    return comment.uuid === commentId
                        ? {
                            uuid: comment.uuid,
                            user: comment.user,
                            createdAt: comment.createdAt,
                            updatedAt: new Date(),
                            text: text,
                        }
                        : comment;
                });
                post.comments = newComments;
                return [4 /*yield*/, post.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.send('Post Comment Edited')];
            case 4:
                error_12 = _b.sent();
                return [2 /*return*/, utils_1.msg500(error_12, res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editCommentOnPost = editCommentOnPost;
var getUserPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, profile, posts, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, models_1.User.findOne({ username: username })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).send('User does not exists')];
                return [4 /*yield*/, models_1.Profile.findOne({ user: user })];
            case 3:
                profile = _a.sent();
                return [4 /*yield*/, models_1.Post.find({ user: user._id }).populate('user')];
            case 4:
                posts = _a.sent();
                return [2 /*return*/, res.json({ posts: posts, profile: profile, userData: user })];
            case 5:
                error_13 = _a.sent();
                return [2 /*return*/, utils_1.msg500(error_13, res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getUserPosts = getUserPosts;
//# sourceMappingURL=post.controller.js.map