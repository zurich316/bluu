export interface Roles { 
    estudiante?: boolean;
    profesor?: boolean;
    admin?: boolean;
 }

export interface UserModel {
    uid: string;
    name:string
    active:boolean
    email: string;
    roles: Roles;
    emailVerified:boolean;
}
