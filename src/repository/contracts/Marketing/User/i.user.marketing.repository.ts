export interface IUserRepository {
  SaveUser(req: any): Promise<any>;
  GetInfoForUser(req:any): Promise<any>;
}
