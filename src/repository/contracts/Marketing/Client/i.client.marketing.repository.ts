export interface IClientRepository {
  storeClient(req: any): Promise<number>;
  getClients(): Promise<any>;
  EditClients(req:any): Promise<any>;
}