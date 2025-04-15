import { config } from "../../../config/common/config.json";
import ClientRepository from "../../../repository/Marketing/Client/client.marketing.repository";

export class ClientController {
    public async storeClient(req: any, res: any): Promise<any> {
        try {
            console.log("2");
            const clientRepositary = new ClientRepository
            const requestData = req.body;
            console.log("");
            
            const storedClient = await clientRepositary.storeClient(requestData);
            
            if(storedClient) {
                res.status(config.statusCode.successful).json({message: "CLIENT_ADDED", success: 1})
            } else {
                res.status(config.statusCode.internalServer).json({ error: "FAILED_TO_CREATE", success: 0});
            }
        } catch (error: any) {
            res.status(config.statusCode.internalServer).json({ error: error.message });
        }

    }
}