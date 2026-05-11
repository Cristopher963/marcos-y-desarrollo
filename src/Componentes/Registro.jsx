import { createPortal } from "react-dom";
import "./Registro.css";
import { useState } from "react";

export default function Registro() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login");

  return (
    <>
      {/* BOTÓN */}
      <button className="btn-registro" onClick={() => setOpen(true)}>
        Iniciar sesión
      </button>

      {/* MODAL */}
      {open &&
        createPortal(
          <div
          className="modalOverlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

              {/* LOGIN */}
              {view === "login" && (
                <>
                  <h2>Iniciar sesión</h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      setOpen(false);
                      setLoginSuccess(true);

                      setTimeout(() => {
                        setLoginSuccess(false);
                      }, 2000);
                    }}
                  >

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

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRegisterSuccess(true);

                      setTimeout(() => {
                        setRegisterSuccess(false);
                        setView("login");
                      }, 2000);
                    }}
                  >

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

                    {registerSuccess && (
                      <p className="success-message">
                        Te registraste correctamente.
                      </p>
                    )}

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
          </div>,
          document.body
        )}
      {loginSuccess && (
        <div className="welcomeOverlay">
          <div className="welcomeModal">
            Bienvenido
          </div>
        </div>
      )}
    </>
  );
}