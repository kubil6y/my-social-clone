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
exports.Profile = exports.IProfile = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var ISocial = /** @class */ (function () {
    function ISocial() {
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], ISocial.prototype, "twitter", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], ISocial.prototype, "facebook", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], ISocial.prototype, "instagram", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], ISocial.prototype, "youtube", void 0);
    return ISocial;
}());
var IProfile = /** @class */ (function () {
    function IProfile() {
    }
    __decorate([
        typegoose_1.prop({ ref: 'IUser' }),
        __metadata("design:type", Object)
    ], IProfile.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], IProfile.prototype, "bio", void 0);
    __decorate([
        typegoose_1.prop({ default: {} }),
        __metadata("design:type", ISocial)
    ], IProfile.prototype, "social", void 0);
    IProfile = __decorate([
        typegoose_1.modelOptions({
            schemaOptions: {
                collection: 'profiles',
                timestamps: true,
            },
        })
    ], IProfile);
    return IProfile;
}());
exports.IProfile = IProfile;
exports.Profile = typegoose_1.getModelForClass(IProfile);
//# sourceMappingURL=profile.model.js.map