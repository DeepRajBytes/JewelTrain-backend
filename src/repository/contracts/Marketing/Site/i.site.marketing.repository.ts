export interface ISiteRepository {
  GetSitedata(): Promise<any>;
  EditSitedata(req: any): Promise<any>;
}
