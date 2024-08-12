export interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    typeUser?: string | null | undefined |number;
    id?: string | null | undefined;
    sizeCompany?: string | undefined|number;
    sector?: string | undefined|number;
    registerDate?:string| undefined;
    isBookDonwloaded?:boolean;
}
