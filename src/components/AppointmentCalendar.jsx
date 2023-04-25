import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Fragment,
} from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallApi } from "../hooks/useCallApi";
import { useSubmitForm } from "../hooks/useSubmitForm";
import toast from "react-hot-toast";

const AppointmentCalendar = ({ onData, doctor_id, enabled }) => {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([]);
  const [id, setID] = useState(null);
  const [start, setStart] = useState(false);
  const { data, error, loaded } = useCallApi({
    endpoint: doctor_id
      ? `appointments/getbydoctor/${doctor_id}`
      : "appointments",
  });
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: `appointments`,
    action: "DELETE",
    formData: { id: Number(id) },
    start,
  });

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (enabled) {
        const title = window.prompt("Descripción");
        if (title) {
          setEvents((prev) => [...prev, { start, end, title }]);
          onData({
            start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
            end: moment(end).format("YYYY-MM-DD HH:mm:ss"),
            title: title,
          });
        }
      }
    },
    [setEvents, onData, enabled]
  );

  const handleSelectEvent = useCallback(
    (event) => {
      if (enabled) {
        const confirm = window.confirm("Eliminar cita: " + event.title);
        if (confirm) {
          if (event && event.id) {
            setID(event.id);
            setStart(true);
          }
          let i = myEvents.findIndex(
            (objeto) =>
              objeto.title === event.title &&
              objeto.start === event.start &&
              objeto.end === event.end
          );
          myEvents.splice(i, 1);
        }
      }
    },
    [myEvents, enabled]
  );

  const { defaultDate, scrollToTime, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
      views: {
        week: true,
        day: true,
      },
    }),
    []
  );
  5;
  useEffect(() => {
    if (data != null) {
      var newData = [];
      if (data.length) {
        data.map((dt) =>
          newData.push({
            id: Number(dt.id),
            start: new Date(dt.init_datetime),
            end: new Date(dt.end_datetime),
            title: `${dt.description}, ${dt.consulting_room}`,
          })
        );
      }
      setEvents(newData);
    }
    if (responseData != null && loadedData) {
      setID(null);
      setStart(false);
    }
  }, [data, error, responseData]);

  return (
    <Fragment>
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
          views={views}
        />
      </div>
    </Fragment>
  );
};

export default AppointmentCalendar;
