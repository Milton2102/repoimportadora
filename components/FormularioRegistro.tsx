"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./InicioSesion";
import {
  validarContrasena,
  validarCorreoGeneral,
  validarNombre,
  validarApellido,
} from "../utils/validaciones";

export default function FormularioRegistro() {
  const router = useRouter();
  const { registrarUsuario } = useAuth();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validarNombre(nombre)) {
      setErrorMsg("Ingresa un nombre válido.");
      return;
    }
    if (!validarApellido(apellido)) {
      setErrorMsg("Ingresa un apellido válido.");
      return;
    }
    if (!validarCorreoGeneral(correo)) {
      setErrorMsg("Ingresa un correo electrónico válido.");
      return;
    }
    if (!validarContrasena(contrasena)) {
      setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    const resultado = registrarUsuario({ nombre, apellido, correo, contrasena });

    if (resultado.exito) {
      router.push("/login");
    } else {
      setErrorMsg(resultado.mensaje || "El correo ya se encuentra registrado.");
    }
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="mx-auto"
      style={{ maxWidth: "500px" }}
      noValidate
    >
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="row g-2 mb-3">
        <div className="col-6">
          <label htmlFor="nombre_registro" className="form-label fw-bold small">
            Nombre *
          </label>
          <input
            id="nombre_registro"
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="apellido_registro" className="form-label fw-bold small">
            Apellido *
          </label>
          <input
            id="apellido_registro"
            type="text"
            className="form-control"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="correo_registro" className="form-label fw-bold small">
          Correo *
        </label>
        <input
          id="correo_registro"
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contrasena_registro" className="form-label fw-bold small">
          Contraseña *
        </label>
        <input
          id="contrasena_registro"
          type="password"
          className="form-control"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Entre 4 y 10 caracteres"
        />
        <div className="form-text">Debe tener entre 4 y 10 caracteres.</div>
      </div>

      <button type="submit" className="btn boton w-100 py-2">
        CREAR CUENTA
      </button>
    </form>
  );
}
