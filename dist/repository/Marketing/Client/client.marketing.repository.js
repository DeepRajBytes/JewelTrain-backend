"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRequest_1 = __importDefault(require("../../../Database/Model/Marketing/ClientRequest"));
const common_1 = __importDefault(require("../../Common/common"));
class ClientRepository {
    async storeClient(req) {
        try {
            console.log("req", req);
            const commonSerice = new common_1.default;
            const { name, lastname, brandName, email, number, message } = req;
            const ClientCard = await ClientRequest_1.default.create({
                name,
                lastname,
                brandName,
                email,
                number,
                message,
            });
            if (ClientCard) {
                let userInfo = {
                    email: ClientCard.email,
                    name: ClientCard.name + '  ' + ClientCard.lastname,
                    brandName: ClientCard.brandName,
                    number: ClientCard.number,
                    message: ClientCard.message,
                };
                commonSerice.sentMail(userInfo);
                commonSerice.sentAdminMail(userInfo);
            }
            return ClientCard;
        }
        catch (error) { }
    }
    async getClients() { }
    async EditClients(req) { }
}
exports.default = ClientRepository;
