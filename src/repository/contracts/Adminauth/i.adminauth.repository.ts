export interface IAdminauthRepository {
  signup(requesData: any): Promise<number>;
  signin(requesData: any): Promise<any>;
}