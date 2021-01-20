interface IDatastoreAdapter {
  identifier: string;
  init?(): Promise<void>;
  save(key: string, data: any): Promise<void>;
  fetch(key: string): Promise<any>;
}

export default IDatastoreAdapter