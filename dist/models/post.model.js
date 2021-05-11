"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.IPost = void 0;
var uuid_1 = require("uuid");
var typegoose_1 = require("@typegoose/typegoose");
var ILike = /** @class */ (function () {
    function ILike() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], ILike.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ default: function () { return new Date(); } }),
        __metadata("design:type", Date)
    ], ILike.prototype, "createdAt", void 0);
    return ILike;
}());
var IComment = /** @class */ (function () {
    function IComment() {
    }
    __decorate([
        typegoose_1.prop({ default: function () { return uuid_1.v4(); } }),
        __metadata("design:type", String)
    ], IComment.prototype, "uuid", void 0);
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], IComment.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], IComment.prototype, "text", void 0);
    __decorate([
        typegoose_1.prop({ default: function () { return new Date(); } }),
        __metadata("design:type", Date)
    ], IComment.prototype, "createdAt", void 0);
    __decorate([
        typegoose_1.prop({ default: function () { return new Date(); } }),
        __metadata("design:type", Date)
    ], IComment.prototype, "updatedAt", void 0);
    return IComment;
}());
var IPost = /** @class */ (function () {
    function IPost() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], IPost.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], IPost.prototype, "text", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], IPost.prototype, "location", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], IPost.prototype, "picUrl", void 0);
    __decorate([
        typegoose_1.prop({ type: ILike, _id: false }),
        __metadata("design:type", Array)
    ], IPost.prototype, "likes", void 0);
    __decorate([
        typegoose_1.prop({ type: IComment, _id: false }),
        __metadata("design:type", Array)
    ], IPost.prototype, "comments", void 0);
    IPost = __decorate([
        typegoose_1.modelOptions({
            schemaOptions: {
                collection: 'posts',
                timestamps: true,
            },
        })
    ], IPost);
    return IPost;
}());
exports.IPost = IPost;
exports.Post = typegoose_1.getModelForClass(IPost);
//# sourceMappingURL=post.model.js.map