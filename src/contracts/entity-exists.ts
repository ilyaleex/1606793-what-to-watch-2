export interface EntityExistsInterface {
  isExists(id: string): Promise<boolean>;
}
