import React, { useState, useCallback, useMemo, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallApi } from '../hooks/useCallApi';

const AppointmentCalendar = ({onData}) => {
  const localizer = momentLocalizer(moment);
  const { data, error, loaded } = useCallApi({ endpoint: '/appointments' });

  const [myEvents, setEvents] = useState([]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("Descripción");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
        onData({ start: moment(start).format("YYYY-MM-DD HH:mm:ss"), end: moment(end).format("YYYY-MM-DD HH:mm:ss"), title: title });
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) =>  window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  useEffect(() => {
    if (data != null) {
        data.map(dt=> {
          
          var datas = { start: new Date(dt.init_datetime), end: new Date(dt.end_datetime), title:`${dt.description}, ${dt.consulting_room}` };
          setEvents((prev) => [...prev, { start: new Date(dt.init_datetime), end: new Date(dt.end_datetime), title:`${dt.description}, ${dt.consulting_room}` }]);
        })
    }
  }, [data])

  return (
    <div>
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
    </div>
  );
};

export default AppointmentCalendar;
