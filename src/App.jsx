import { useState, useEffect } from "react";
import Registro from "./Componentes/Registro";
import Footer from "./Componentes/Footer";
import Inicio from "./Paginas/Inicio";
import Importante from "./Paginas/Importante";
import Categorias from "./Paginas/Categorias";
import Calendario from "./Paginas/Calendario";
import "./App.css";

function App() {
  const [section, setSection] = useState("Inicio");
  const [tareas, setTareas] = useState([]);

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    fetch("http://localhost:8080/tareas")
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">

      <div className="sidebar">
        <h2> To Do</h2>

        <Registro usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />

        <p
          className={section === "Inicio" ? "active" : ""}
          onClick={() => setSection("Inicio")}
        >
          🏠 Inicio
        </p>
        <p
          className={section === "Importante" ? "active" : ""}
          onClick={() => setSection("Importante")}
        >
          ⭐ Importante
        </p>
        <p
          className={section === "Categorias" ? "active" : ""}
          onClick={() => setSection("Categorias")}
        >
          🗂️ Categorías
        </p>
        <p
          className={section === "Calendario" ? "active" : ""}
          onClick={() => setSection("Calendario")}
        >
          📅 Calendario
        </p>
      </div>

      <div className="main">

        {section === "Inicio" && (
          <Inicio tareas={tareas} setTareas={setTareas} usuarioActual={usuarioActual} />
        )}
        {section === "Importante" &&
          <Importante tareas={tareas} usuarioActual={usuarioActual} />
        }
        {section === "Categorias" && (
          <Categorias tareas={tareas} usuarioActual={usuarioActual} />
        )}
        {section === "Calendario" &&
          <Calendario tareas={tareas} usuarioActual={usuarioActual} />
        }

      </div>
      <Footer />
    </div>
  );
}

export default App;