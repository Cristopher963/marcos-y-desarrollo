import { useState } from "react";

export default function Inicio() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>🏠 Inicio</h1>

      <button onClick={() => setShowModal(true)}>
        ➕ Nueva tarea
      </button>

      <div className="card">Tarea 1</div>
      <div className="card">Tarea 2</div>

      {/* MODAL */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modal">

            <h2>Crear tarea</h2>

            <form>
              <input type="text" placeholder="Título" />
              <input type="text" placeholder="Descripción" />

              <div className="modalButtons">
                <button type="button" onClick={() => setShowModal(false)}>
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