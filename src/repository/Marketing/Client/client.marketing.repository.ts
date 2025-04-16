import { IClientRepository } from "../../contracts/Marketing/Client/i.client.marketing.repository";
import ClientRequestModel from "../../../Database/Model/Marketing/ClientRequest";
import CommonService from "../../Common/common";

class ClientRepository implements IClientRepository {
  async storeClient(req: any): Promise<any> {
    try {
      console.log("req", req);
      const commonSerice = new CommonService
      const { name, lastname, brandName, email, number, message } = req;
      const ClientCard = await ClientRequestModel.create({
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
          name: ClientCard.name + '  ' +ClientCard.lastname,
          brandName: ClientCard.brandName,
          number: ClientCard.number,
          message: ClientCard.message,
        };
        commonSerice.sentMail(userInfo);
        commonSerice.sentAdminMail(userInfo);
      }
      return ClientCard;
    } catch (error) {
    }
  }

  async getClients(): Promise<any> {}

  async EditClients(req: any): Promise<any> {}
}

export default ClientRepository;
