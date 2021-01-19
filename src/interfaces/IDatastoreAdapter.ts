interface IDatastoreAdapter {
  identifier: string;
  init(): void;
  save(): void;
}

export default IDatastoreAdapter