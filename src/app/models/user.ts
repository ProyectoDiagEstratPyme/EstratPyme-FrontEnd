export interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  typeUser?: string | null | undefined | number;
  sizeCompany?: string | undefined | number;
  sector?: string | undefined | number;
  registerDate?: string;
  isBookDonwloaded?: boolean | undefined;
  isTestDone?: boolean;
}
