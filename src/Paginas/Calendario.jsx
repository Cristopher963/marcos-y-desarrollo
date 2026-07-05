import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calendario({ tareas = [], usuarioActual }) {

    const [fecha, setFecha] = useState(new Date());
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);

    //Convierte a YYYY-MM-DD
    const formatearFecha = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const tareasDelUsuario = usuarioActual
        ? tareas.filter((t) => t.usuario?.idUsuario === usuarioActual.idUsuario)
        : [];

    const contarTareasPorDia = (date) => {
        const fechaStr = formatearFecha(date);
        return tareasDelUsuario.filter((t) => t.fechaLimite === fechaStr).length;
    };

    const tareasDelDiaSeleccionado = diaSeleccionado
        ? tareasDelUsuario.filter((t) => t.fechaLimite === formatearFecha(diaSeleccionado))
        : [];

    const abrirDia = (date) => {
        setDiaSeleccionado(date);
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setDiaSeleccionado(null);
    };

    return (
        <div>
            <h1>📅 Calendario</h1>
            <div className="calendarContainer">
                <Calendar
                    onChange={setFecha}
                    value={fecha}
                    onClickDay={abrirDia}
                    tileContent={({ date, view }) => {
                        if (view !== "month") return null;
                        const cantidad = contarTareasPorDia(date);
                        if (cantidad === 0) return null;
                        return (
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: "4px",
                                    right: "4px",
                                    background: "#9333ea",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "11px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {cantidad}
                            </span>
                        );
                    }}
                />
            </div>
            {showModal && (
                <div className="modalOverlay" onClick={cerrarModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Tareas del {formatearFecha(diaSeleccionado)}</h2>

                        {tareasDelDiaSeleccionado.length === 0 ? (
                            <p>No hay tareas programadas</p>
                        ) : (
                            tareasDelDiaSeleccionado.map((t) => (
                                <p key={t.idTarea}>✅ {t.titulo}</p>
                            ))
                        )}

                        <div className="modalButtons">
                            <button type="button" onClick={cerrarModal}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}