import { useState } from "react";
import Inicio from "./Paginas/Inicio";
import Importante from "./Paginas/Importante";
import Planes from "./Paginas/Planes";
import "./App.css";

function App() {
  const [section, setSection] = useState("Inicio");

  return (
    <div className="app">

      <div className="sidebar">
        <h2> To Do</h2>

        <p onClick={() => setSection("Inicio")}>🏠 Inicio</p>
        <p onClick={() => setSection("Importante")}>⭐ Importante</p>
        <p onClick={() => setSection("Planes")}>📅 Planes</p>
      </div>

      <div className="main">

        {section === "Inicio" && <Inicio />}
        {section === "Importante" && <Importante />}
        {section === "Planes" && <Planes />}

      </div>

    </div>
  );
}

export default App;