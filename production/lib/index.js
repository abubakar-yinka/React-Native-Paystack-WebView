"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackProps = exports.usePaystack = exports.PaystackContext = exports.PaystackProvider = void 0;
const PaystackProvider_1 = require("./PaystackProvider");
Object.defineProperty(exports, "PaystackContext", { enumerable: true, get: function () { return PaystackProvider_1.PaystackContext; } });
Object.defineProperty(exports, "PaystackProvider", { enumerable: true, get: function () { return PaystackProvider_1.PaystackProvider; } });
const usePaystack_1 = require("./usePaystack");
Object.defineProperty(exports, "usePaystack", { enumerable: true, get: function () { return usePaystack_1.usePaystack; } });
const PaystackProps = __importStar(require("./types"));
exports.PaystackProps = PaystackProps;
//# sourceMappingURL=index.js.map