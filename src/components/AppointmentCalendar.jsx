import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, dayjsLocalizer, momentLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
const Evento = ({ event }) => {
  return (
    <div style={{ cursor: 'move' }}>
      {event.title}
    </div>
  );
};
const localizer = dayjsLocalizer(dayjs)

const AppointmentCalendar = (props) => {
  const localizer = momentLocalizer(moment);

  const [eventos, setEventos] = useState([
    {
      title: 'Cita con el doctor',
      start: new Date(2023, 3, 10, 10, 0),
      end: new Date(2023, 3, 10, 11, 0),
    },
    {
      title: 'Cita de seguimiento',
      start: new Date(2023, 3, 12, 14, 0),
      end: new Date(2023, 3, 12, 15, 0),
    }
  ]);
  const handleSelectEvent = (event) => {
    debugger
    //setSelectedHour(event.start.getHours());
  };
  
  const handleEventDrop = ({ event, start, end }) => {
    debugger
    const newEventos = eventos.map((e) => {
      if (e.title === event.title) {
        return {
          ...e,
          start,
          end,
        };
      } else {
        return e;
      }
    });

    setEventos(newEventos);
  };
  return (
    <div>
    <Calendar
      localizer={localizer}
      events={eventos}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectSlot={handleSelectEvent}
      onSelectEvent={handleSelectEvent}
      selectable
      resizable
      onEventDrop={handleEventDrop}
      components={{
        event: Evento,
      }}
    />
  </div>
  )
}

export default AppointmentCalendar;
