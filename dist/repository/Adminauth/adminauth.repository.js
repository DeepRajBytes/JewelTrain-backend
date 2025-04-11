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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const AdminCreditional_1 = __importDefault(require("../../Database/Model/Auth/AdminCreditional"));
class AdminauthRepository {
    async signup(requesData) {
        try {
            const email = requesData.email;
            const nonHashPass = requesData.password;
            const mobile = requesData.mobile;
            // Find exisiting Email
            const isAdminEmailPresent = await AdminCreditional_1.default.findOne({
                email: email,
            });
            if (isAdminEmailPresent) {
                return 1;
            }
            // Find exisiting Mobile
            const isAdminMobilePresent = await AdminCreditional_1.default.findOne({
                mobile: mobile,
            });
            if (isAdminMobilePresent) {
                return 2;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(nonHashPass, salt);
            const AdminCred = await AdminCreditional_1.default.create({
                password: hashedPassword,
                email: email,
                mobile: mobile,
            });
            if (AdminCred) {
                return 3;
            }
            return 4;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = AdminauthRepository;
