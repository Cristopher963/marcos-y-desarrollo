import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calendario() {

    const [fecha, setFecha] = useState(new Date());

    return (
        <div>

            <h1>📅 Calendario</h1>

            <div className="calendarContainer">

                <Calendar
                    onChange={setFecha}
                    value={fecha}
                />

            </div>

        </div>
    );
}