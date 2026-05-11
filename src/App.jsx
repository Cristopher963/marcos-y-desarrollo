import { useState } from "react";
import Registro from "./Componentes/Registro";
import Footer from "./Componentes/Footer";
import Inicio from "./Paginas/Inicio";
import Importante from "./Paginas/Importante";
import Planes from "./Paginas/Planes";
import Calendario from "./Paginas/Calendario";
import "./App.css";

function App() {
  const [section, setSection] = useState("Inicio");

  //Arreglo para guardar tareas
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Tarea 1", descripcion: "Descripción 1", tipo: "normal" },
    { id: 2, titulo: "Tarea 2", descripcion: "Descripción 2", tipo: "importante" }
  ]);

  return (
    <div className="app">

      <div className="sidebar">
        <h2> To Do</h2>

        <Registro />

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
          className={section === "Planes" ? "active" : ""}
          onClick={() => setSection("Planes")}
        >
          📫 Planes
        </p>
        <p
          className={section === "Calendario" ? "active" : ""}
          onClick={() => setSection("Calendario")}
        >
          📅 Calendario
        </p>
      </div>

      <div className="main">

        {section === "Inicio" && <Inicio tareas={tareas} setTareas={setTareas}/>}
        {section === "Importante" && <Importante tareas={tareas}/>}
        {section === "Planes" && <Planes tareas={tareas}/>}
        {section === "Calendario" && <Calendario tareas={tareas}/>}

      </div>
      <Footer />
    </div>
  );
}

export default App;