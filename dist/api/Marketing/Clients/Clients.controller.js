"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const config_json_1 = require("../../../config/common/config.json");
const client_marketing_repository_1 = __importDefault(require("../../../repository/Marketing/Client/client.marketing.repository"));
class ClientController {
    async storeClient(req, res) {
        try {
            console.log("2");
            const clientRepositary = new client_marketing_repository_1.default;
            const requestData = req.body;
            console.log("");
            const storedClient = await clientRepositary.storeClient(requestData);
            if (storedClient) {
                res.status(config_json_1.config.statusCode.internalServer).json({ message: "CLIENT_ADDED" });
            }
            else {
                res.status(config_json_1.config.statusCode.internalServer).json({ error: "FAILED_TO_CREATE" });
            }
        }
        catch (error) {
            res.status(config_json_1.config.statusCode.internalServer).json({ error: error.message });
        }
    }
}
exports.ClientController = ClientController;
