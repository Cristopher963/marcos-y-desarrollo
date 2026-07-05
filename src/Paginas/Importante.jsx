export default function Importante({ tareas = [], usuarioActual }) {
  const importantes = usuarioActual
    ? tareas.filter(
        (tarea) =>
          tarea.prioridad === "ALTA" &&
          tarea.usuario?.idUsuario === usuarioActual.idUsuario
      )
    : [];
  //condicional que evalua si hay o no tareas importantes
  return (
    <div>
      <h1>⭐ Importante</h1>
      {importantes.length === 0 ? (
        <p>No hay tareas importantes.</p>
      ) : (
        importantes.map((tarea) => (
          <div key={tarea.idTarea} className="card importante">
            <h3 style={{color: "black"}}>
              {tarea.titulo}
            </h3>
            <p style={{ marginTop: "6px", color: "#6b7280" }}>
              {tarea.descripcion}
            </p>
            <h3 style={{ marginTop: "6px"}}>
              {tarea.fechaLimite}
            </h3>
          </div>
        ))
      )}
    </div>
  );
}