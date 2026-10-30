"use client";

import React, { useState } from "react";
import { validarFormularioContacto } from "../utils/validaciones";

const SIN_ERRORES = { nombre: "", correo: "", comentario: "" };

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [errores, setErrores] = useState(SIN_ERRORES);
  const [mensajeExito, setMensajeExito] = useState("");

  const manejarSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setMensajeExito("");

    const resultado = validarFormularioContacto({ nombre, correo, comentario });
    setErrores(resultado.errores);

    if (resultado.valido) {
      setMensajeExito(
        "Consulta enviada correctamente. Te responderemos a la brevedad."
      );
      setNombre("");
      setCorreo("");
      setTelefono("");
      setComentario("");
    }
  };

  return (
    <div className="panel-formulario card shadow-sm border-0 p-4 bg-white">
      <form onSubmit={manejarSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nombre_contacto" className="form-label fw-bold">
            Nombre
          </label>
          <input
            id="nombre_contacto"
            type="text"
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
            maxLength={100}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre completo"
          />
          <p className="error text-danger small mt-1 mb-0">{errores.nombre}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="correo_contacto" className="form-label fw-bold">
            Correo electrónico
          </label>
          <input
            id="correo_contacto"
            type="email"
            className={`form-control ${errores.correo ? "is-invalid" : ""}`}
            maxLength={100}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="usuario@duoc.cl / @profesor.duoc.cl / @gmail.com"
          />
          <p className="error text-danger small mt-1 mb-0">{errores.correo}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="telefono_contacto" className="form-label fw-bold">
            Teléfono{" "}
            <span className="text-muted fw-normal small">(opcional)</span>
          </label>
          <input
            id="telefono_contacto"
            type="tel"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="9 1234 5678"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comentario_contacto" className="form-label fw-bold">
            Comentario
          </label>
          <textarea
            id="comentario_contacto"
            className={`form-control ${errores.comentario ? "is-invalid" : ""}`}
            maxLength={500}
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe tu consulta o solicitud de importación..."
          ></textarea>
          <p className="error text-danger small mt-1 mb-0">
            {errores.comentario}
          </p>
        </div>

        <button className="btn boton px-4 py-2" type="submit">
          Enviar consulta
        </button>

        {mensajeExito && (
          <p className="mensaje-exito alert alert-success mt-3 mb-0" role="alert">
            {mensajeExito}
          </p>
        )}
      </form>
    </div>
  );
}
