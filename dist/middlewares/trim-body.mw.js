"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimBody = void 0;
var exceptionFields = ['password'];
// recursive trim body function with exception fields
function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object')
        return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] =
            !exceptionFields.includes(key) && typeof obj[key] == 'string'
                ? obj[key].trim()
                : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}
var trimBody = function (req, _, next) {
    if (req.body) {
        req.body = trimObj(req.body);
    }
    return next();
};
exports.trimBody = trimBody;
//# sourceMappingURL=trim-body.mw.js.map