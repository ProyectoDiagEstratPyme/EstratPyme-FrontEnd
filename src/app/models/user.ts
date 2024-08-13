export interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  typeUser?: string | null | undefined;
  sizeCompany?: string | undefined;
  sector?: string | undefined;
  registerDate: string;
  isBookDonwloaded?: boolean | undefined;
  isTestDone?: boolean;
}
