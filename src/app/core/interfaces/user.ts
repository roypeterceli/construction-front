export interface User {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;  
  realm_access: Rol;
  nEstado: Estado;
}

export interface Rol {
  realm_access: {
    roles: string[];
  };
}

export interface Estado {
  nIdEstado: number;
  sEstado: string;
}
