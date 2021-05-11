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
exports.Follower = exports.IFollower = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var _Follower = /** @class */ (function () {
    function _Follower() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], _Follower.prototype, "user", void 0);
    return _Follower;
}());
var _Following = /** @class */ (function () {
    function _Following() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], _Following.prototype, "user", void 0);
    return _Following;
}());
var IFollower = /** @class */ (function () {
    function IFollower() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], IFollower.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ type: _Follower, _id: false }),
        __metadata("design:type", Array)
    ], IFollower.prototype, "followers", void 0);
    __decorate([
        typegoose_1.prop({ type: _Following, _id: false }),
        __metadata("design:type", Array)
    ], IFollower.prototype, "following", void 0);
    IFollower = __decorate([
        typegoose_1.modelOptions({
            schemaOptions: {
                collection: 'followers',
                timestamps: true,
            },
        })
    ], IFollower);
    return IFollower;
}());
exports.IFollower = IFollower;
exports.Follower = typegoose_1.getModelForClass(IFollower);
//# sourceMappingURL=follower.model.js.map