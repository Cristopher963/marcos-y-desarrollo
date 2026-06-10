export default function Importante({ tareas = [] }) {
  const importantes = tareas.filter((tarea) => tarea.prioridad === "ALTA");
  
  //condicional que evalua si hay o no tareas importantes
  return (
    <div>
      <h1>⭐ Importante</h1>
      {importantes.length === 0 ? (
        <p>No hay tareas importantes.</p>
      ) : (
        importantes.map((tarea) => (
          <div key={tarea.idTarea} className="card importante">
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
          </div>
        ))
      )}
    </div>
  );
}