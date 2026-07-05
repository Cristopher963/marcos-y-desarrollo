import { useState, useEffect } from "react";

export default function Inicio({ tareas = [], setTareas, usuarioActual }) {

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  //Funciones para guardar tareas
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("MEDIA");
  const [fechaLimite, setFechaLimite] = useState("");

  //Abrir tarea
  const abrirModal = (tarea) => {
    setSelectedTask(tarea);
    setTitulo(tarea?.titulo || "");
    setDescripcion(tarea?.descripcion || "");
    setTipo(tarea?.prioridad || "MEDIA");
    setFechaLimite(tarea?.fechaLimite || "");
    setCategoriasSeleccionadas(tarea?.categorias?.map((c) => c.idCategoria) || []);
    setShowModal(true);
  };

  //Cerrar tarea
  const cerrarModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setTitulo("");
    setDescripcion("");
    setTipo("MEDIA");
    setFechaLimite("");
    setCategoriasSeleccionadas([]);
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    fetch(`http://localhost:8080/tareas/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setTareas((prev) => prev.filter((t) => t.idTarea !== id));
    })
    .catch((err) => console.error(err));
  };

  // Guardar tarea (crear o editar)
  const guardarTarea = (e) => {
    e.preventDefault();

    if (selectedTask) {
      // Editar tarea
      fetch(`http://localhost:8080/tareas/${selectedTask.idTarea}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          prioridad: tipo,
          fechaLimite,
          usuario: usuarioActual ? { idUsuario: usuarioActual.idUsuario } : null,
          categorias: categoriasSeleccionadas.map((id) => ({ idCategoria: id }))
        })
      })
      .then((res) => res.json())
      .then((tareaActualizada) => {
        setTareas((prev) =>
          prev.map((t) =>
            t.idTarea === tareaActualizada.idTarea ? tareaActualizada : t));
        cerrarModal();
      })
      .catch((err) => console.error(err));
    } else {
      // Crear tarea
      fetch("http://localhost:8080/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          prioridad: tipo,
          fechaLimite,
          usuario: usuarioActual ? { idUsuario: usuarioActual.idUsuario } : null,
          categorias: categoriasSeleccionadas.map((id) => ({ idCategoria: id }))
        })
      })
      .then((res) => res.json())
      .then((tareaNueva) => {
        setTareas((prev) => [...prev, tareaNueva]);
        cerrarModal();
      })
      .catch((err) => {
        console.error(err);
        cerrarModal();
      });
    }
  };

  const tareasFiltradas = usuarioActual ? tareas.filter((tarea) => tarea.usuario?.idUsuario === usuarioActual.idUsuario):[];

  const toggleCategoria = (id) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!usuarioActual) return;
    fetch(`http://localhost:8080/categorias/usuario/${usuarioActual.idUsuario}`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, [usuarioActual]);

  return (
    <div>
      <h1>🏠 Inicio</h1>

      <button onClick={() => {
        setSelectedTask(null);
        setTitulo("");
        setDescripcion("");
        setTipo("MEDIA");
        setShowModal(true);
      }}>
        + Nueva tarea
      </button>

      {tareasFiltradas.map((tarea) => (
        <div key={tarea.idTarea} className="card" style={{ cursor: "pointer" }}>
          <div onClick={() => abrirModal(tarea)}>
            <h3 style={{color: "black"}}>
              {tarea.titulo}
            </h3>
            <p style={{ marginTop: "6px", color: "#6b7280" }}>
              {tarea.descripcion}
            </p>
            <h3 style={{ marginTop: "6px"}}>{tarea.fechaLimite}</h3>
          </div>
          <button onClick={() => eliminarTarea(tarea.idTarea)} style={{ marginTop: "8px" }}>
            Eliminar
          </button>
        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div
          className="modalOverlay"
          onClick={cerrarModal}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {selectedTask ? "Editar tarea" : "Crear tarea"}
            </h2>

            <form onSubmit={guardarTarea}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <input
                type="date"
                placeholder="Fecha Limite"
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
              />

              {/* Tipo de tarea */}
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="MEDIA">Normal</option>
                <option value="ALTA">Importante</option>
                <option value="BAJA">Baja</option>
              </select>

              {categorias.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "500" }}>Categorías:</label>
                  {categorias.map((cat) => (
                    <label key={cat.idCategoria} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input type="checkbox"
                        checked={categoriasSeleccionadas.includes(cat.idCategoria)}
                        onChange={() => toggleCategoria(cat.idCategoria)}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                      <span style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: cat.color,
                        display: "inline-block"
                      }}/>
                      {cat.nombre}
                    </label>
                  ))}
                </div>
              )}

              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <div className="modalButtons">
                <button
                  type="button"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button type="submit">
                  Guardar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}