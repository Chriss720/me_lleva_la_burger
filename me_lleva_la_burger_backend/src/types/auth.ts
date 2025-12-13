/* eslint-disable prettier/prettier */
export interface JwtPayload {
    sub: number;
    email: string;
    tipo: 'customer' | 'employee';
}

export interface AuthUser {
    id: number;
    email: string;
    tipo: 'customer' | 'employee';
}

export interface LoginResponse {
    access_token: string;
    user: {
        id: number;
        nombre: string;
        apellido: string;
        email: string;
        tipo: 'customer' | 'employee';
        cargo?: string;
    };
}
