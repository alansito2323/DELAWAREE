export interface UserI{
    uid: string;
    nombre: string;
    correo: string;
    password: string | null;
    perfil: 'visitante' | 'admin'
}