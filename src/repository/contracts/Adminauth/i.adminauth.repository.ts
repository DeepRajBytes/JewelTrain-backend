export interface IAdminauthRepository {
  signup(requesData: any): Promise<number>;
}