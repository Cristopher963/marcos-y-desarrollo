import { createPortal } from "react-dom";
import "./Registro.css";
import { useState } from "react";

export default function Registro({ usuarioActual, setUsuarioActual }) {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login");

  // Estados login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // Estados registro
  const [nombre, setNombre] = useState("");
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then((usuarios) => {
        const usuario = usuarios.find(
          (u) => u.email === emailLogin && u.password === passwordLogin
        );
        if (usuario) {
          setUsuarioActual(usuario);
          localStorage.setItem("usuario", JSON.stringify(usuario));
          setOpen(false);
          setLoginSuccess(true);
          setTimeout(() => setLoginSuccess(false), 2000);
        } else {
          setError("Correo o contraseña incorrectos.");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    setError("");

    if (passwordRegistro !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email: emailRegistro, password: passwordRegistro })
    })
      .then((res) => res.json())
      .then(() => {
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          setView("login");
        }, 2000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button
        className="btn-registro"
        onClick={() => !usuarioActual && setOpen(true)}
      >
        {usuarioActual ? usuarioActual.nombre : "Iniciar sesión"}
      </button>

      {usuarioActual && (
        <button
          onClick={() => {
            localStorage.removeItem("usuario");
            setUsuarioActual(null);
          }}
        >
          Cerrar sesión
        </button>
      )}

      {open &&
        createPortal(
          <div className="modalOverlay" onClick={() => setOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

              {/* LOGIN */}
              {view === "login" && (
                <>
                  <h2>Iniciar sesión</h2>
                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <label>Correo</label>
                      <input
                        type="email"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="modalButtons">
                      <button type="button" onClick={() => setOpen(false)}>Cancelar</button>
                      <button type="submit">Entrar</button>
                    </div>
                  </form>
                  <p className="switch-text">
                    Si no tienes una cuenta,{" "}
                    <span onClick={() => setView("register")}>Regístrate</span>
                  </p>
                </>
              )}

              {/* REGISTRO */}
              {view === "register" && (
                <>
                  <h2>Crear Cuenta</h2>
                  <form onSubmit={handleRegistro}>
                    <div className="input-group">
                      <label>Nombre de usuario</label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Correo electrónico</label>
                      <input
                        type="email"
                        value={emailRegistro}
                        onChange={(e) => setEmailRegistro(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        value={passwordRegistro}
                        onChange={(e) => setPasswordRegistro(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Confirmar Contraseña</label>
                      <input
                        type="password"
                        value={confirmarPassword}
                        onChange={(e) => setConfirmarPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {registerSuccess && (
                      <p className="success-message">Te registraste correctamente.</p>
                    )}
                    <div className="modalButtons">
                      <button type="button" onClick={() => setView("login")}>Volver</button>
                      <button type="submit">Registrarse</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}

      {loginSuccess && createPortal(
        <div className="welcomeOverlay">
          <div className="welcomeModal">Bienvenido</div>
        </div>,
        document.body
      )}
    </>
  );
}