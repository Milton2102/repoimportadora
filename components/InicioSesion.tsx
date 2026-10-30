"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Usuario {
  nombre: string;
  apellido?: string;
  correo: string;
  contrasena: string;
}

interface AuthContextType {
  usuarioActual: Usuario | null;
  cargando: boolean;
  registrarUsuario: (u: Usuario) => { exito: boolean; mensaje?: string };
  iniciarSesion: (correo: string, contrasena: string) => boolean;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem("usuarios_db");
    const sesionActiva = localStorage.getItem("sesion_usuario");

    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    }
    if (sesionActiva) {
      setUsuarioActual(JSON.parse(sesionActiva));
    }
    setCargando(false);
  }, []);

  const registrarUsuario = (nuevo: Usuario) => {
    const existe = usuarios.some(
      (u) => u.correo.toLowerCase() === nuevo.correo.toLowerCase()
    );
    if (existe) {
      return { exito: false, mensaje: "El correo ya está registrado." };
    }

    const nuevosUsuarios = [...usuarios, nuevo];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios_db", JSON.stringify(nuevosUsuarios));
    return { exito: true };
  };

  const iniciarSesion = (correo: string, contrasena: string) => {
    const encontrado = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === correo.toLowerCase() &&
        u.contrasena === contrasena
    );

    if (encontrado) {
      setUsuarioActual(encontrado);
      localStorage.setItem("sesion_usuario", JSON.stringify(encontrado));
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    localStorage.removeItem("sesion_usuario");
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        cargando,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
