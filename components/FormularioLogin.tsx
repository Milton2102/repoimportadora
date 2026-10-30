"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./InicioSesion";
import { validarContrasena, validarCorreoGeneral } from "../utils/validaciones";

export default function FormularioLogin() {
  const router = useRouter();
  const { iniciarSesion } = useAuth();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validarCorreoGeneral(correo)) {
      setErrorMsg("Ingresa un correo electrónico válido.");
      return;
    }

    if (!validarContrasena(contrasena)) {
      setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    if (iniciarSesion(correo, contrasena)) {
      router.push("/");
    } else {
      setErrorMsg("Correo o contraseña incorrectos.");
    }
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="mx-auto"
      style={{ maxWidth: "400px" }}
      noValidate
    >
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="correo_login" className="form-label fw-bold small">
          Correo electrónico
        </label>
        <input
          id="correo_login"
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="tu@correo.com"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contrasena_login" className="form-label fw-bold small">
          Contraseña
        </label>
        <input
          id="contrasena_login"
          type="password"
          className="form-control"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Entre 4 y 10 caracteres"
        />
        <div className="form-text">Debe tener entre 4 y 10 caracteres.</div>
      </div>

      <button type="submit" className="btn boton w-100 py-2">
        INICIAR SESIÓN
      </button>
    </form>
  );
}
