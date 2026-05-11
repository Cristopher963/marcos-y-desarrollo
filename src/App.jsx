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

        {section === "Inicio" && <Inicio />}
        {section === "Importante" && <Importante />}
        {section === "Planes" && <Planes />}
        {section === "Calendario" && <Calendario />}

      </div>
      <Footer />
    </div>
  );
}

export default App;