export interface IUserRepository {
  SaveUser(req: any): Promise<any>;
}
