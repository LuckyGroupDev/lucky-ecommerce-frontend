// src/app/shared/models/user.interface.ts

export interface User {
  userId: number;              // Usamos camelCase para las propiedades
  firstName: string | null;     // Primero en minúsculas y luego PascalCase para las propiedades compuestas
  lastName: string | null;      // Lo mismo con el apellido
  userName: string;             // Nombre de usuario en camelCase
  password: string | null;      // Contraseña en camelCase
  token: string;                // Token en minúsculas (aunque generalmente 'Token' puede ser válido en el contexto)
}
