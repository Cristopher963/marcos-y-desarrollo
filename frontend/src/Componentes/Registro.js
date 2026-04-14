import "./Registro.css";
import { useState } from "react";

export default function Registro() {

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login"); // login | register

  return (
    <>
      {/* BOTÓN */}
      <button className="btn-registro" onClick={() => setOpen(true)}>
        Iniciar sesión
      </button>

      {/* MODAL */}
      {open && (
        <div className="modalOverlay">
          <div className="modal">

            {/* LOGIN */}
            {view === "login" && (
              <>
                <h2>Iniciar sesión</h2>

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="input-group">
                    <label>Correo</label>
                    <input type="email" required />
                  </div>

                  <div className="input-group">
                    <label>Contraseña</label>
                    <input type="password" required />
                  </div>

                  <div className="modalButtons">
                    <button type="button" onClick={() => setOpen(false)}>
                      Cancelar
                    </button>

                    <button type="submit">
                      Entrar
                    </button>
                  </div>
                </form>

                <p className="switch-text">
                  Si no tienes una cuenta,{" "}
                  <span onClick={() => setView("register")}>
                    Regístrate
                  </span>
                </p>
              </>
            )}

            {/* REGISTER */}
            {view === "register" && (
              <>
                <h2>Crear Cuenta</h2>

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="input-group">
                    <label>Nombre de usuario</label>
                    <input type="text" required />
                  </div>

                  <div className="input-group">
                    <label>Correo electrónico</label>
                    <input type="email" required />
                  </div>

                  <div className="input-group">
                    <label>Contraseña</label>
                    <input type="password" required />
                  </div>

                  <div className="input-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" required />
                  </div>

                  <div className="modalButtons">
                    <button type="button" onClick={() => setView("login")}>
                      Volver
                    </button>

                    <button type="submit">
                      Registrarse
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}