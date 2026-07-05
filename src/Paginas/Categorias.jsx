import { useState, useEffect } from "react";

export default function Categorias({ tareas = [], usuarioActual }) {

  const [categorias, setCategorias] = useState([]);
  const [nombreCat, setNombreCat] = useState("");
  const [colorCat, setColorCat] = useState("#2563eb");
  const [showForm, setShowForm] = useState(false);
  const [abiertos, setAbiertos] = useState({});

  useEffect(() => {
    if (!usuarioActual) return;
    fetch(`http://localhost:8080/categorias/usuario/${usuarioActual.idUsuario}`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, [usuarioActual]);

  const crearCategoria = (e) => {
    e.preventDefault();
    if (!usuarioActual) return;

    fetch("http://localhost:8080/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreCat,
        color: colorCat,
        usuario: { idUsuario: usuarioActual.idUsuario }
      })
    })
      .then((res) => res.json())
      .then((nueva) => {
        setCategorias((prev) => [...prev, nueva]);
        setNombreCat("");
        setColorCat("#2563eb");
        setShowForm(false);
      })
      .catch((err) => console.error(err));
  };

  const eliminarCategoria = (id) => {
    fetch(`http://localhost:8080/categorias/${id}`, { method: "DELETE" })
      .then(() => setCategorias((prev) => prev.filter((c) => c.idCategoria !== id)))
      .catch((err) => console.error(err));
  };

  const toggleAbierto = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tareasDeLaCategoria = (idCategoria) => {
    return tareas.filter(
      (t) =>
        t.usuario?.idUsuario === usuarioActual?.idUsuario &&
        t.categorias?.some((c) => c.idCategoria === idCategoria)
    );
  };

  return (
    <div>
      <h1>🗂️ Categorías</h1>

      <button onClick={() => setShowForm(true)} style={{ marginBottom: "20px" }}>
        + Nueva categoría
      </button>

      {!usuarioActual && <p>Inicia sesión para ver tus categorías.</p>}

      {categorias.map((cat) => (
        <div key={cat.idCategoria} className="card" style={{ marginTop: "16px" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            onClick={() => toggleAbierto(cat.idCategoria)}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: cat.color,
                display: "inline-block"
              }}
            />
            <h3 style={{ flex: 1 }}>{cat.nombre}</h3>
            <span>{abiertos[cat.idCategoria] ? "▲" : "▼"}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                eliminarCategoria(cat.idCategoria);
              }}
              style={{ padding: "6px 12px", fontSize: "12px" }}
            >
              Eliminar
            </button>
          </div>

          {abiertos[cat.idCategoria] && (
            <div style={{ marginTop: "12px", paddingLeft: "24px" }}>
              {tareasDeLaCategoria(cat.idCategoria).length === 0 ? (
                <p style={{ color: "#6b7280" }}>No hay tareas en esta categoría.</p>
              ) : (
                tareasDeLaCategoria(cat.idCategoria).map((t) => (
                  <div
                    key={t.idTarea}
                    style={{
                      padding: "8px 12px",
                      marginTop: "8px",
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.04)"
                    }}
                  >
                    <p style={{ fontWeight: "500", color: "#111827" }}>{t.titulo}</p>
                    {t.fechaLimite && (
                      <p style={{ fontSize: "12px", color: "#9333ea" }}>📅 {t.fechaLimite}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}

      {showForm && (
        <div className="modalOverlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Nueva categoría</h2>
            <form onSubmit={crearCategoria}>
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={nombreCat}
                onChange={(e) => setNombreCat(e.target.value)}
                required
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ fontWeight: "500" }}>Color:</label>
                <input
                  type="color"
                  value={colorCat}
                  onChange={(e) => setColorCat(e.target.value)}
                  style={{ width: "50px", height: "40px", padding: "2px", cursor: "pointer" }}
                />
              </div>
              <div className="modalButtons">
                <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}