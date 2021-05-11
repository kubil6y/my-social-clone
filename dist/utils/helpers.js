"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg401 = exports.msg500 = void 0;
// MESSAGES
var msg500 = function (error, res) {
    console.log(error);
    return res.status(500).send('Something went wrong');
};
exports.msg500 = msg500;
var msg401 = function (res) {
    return res.status(401).send('Unauthorized');
};
exports.msg401 = msg401;
//# sourceMappingURL=helpers.js.map