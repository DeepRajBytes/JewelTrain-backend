export interface IAdminrouterepository {
  Userlist(req: any): Promise<any>;
  updateUser(req: any): Promise<any>;
  deleteUser(req: any): Promise<any>;
}