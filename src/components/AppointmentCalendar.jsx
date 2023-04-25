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
import { getAppointmentById } from "../hooks/getAppointmentById";
import { useSubmitForm } from "../hooks/useSubmitForm";
import toast from "react-hot-toast";

const AppointmentCalendar = ({ onData, doctor_id, enabled }) => {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([]);
  const [myEvent, setEvent] = useState(null);
  const [id, setID] = useState(null);
  const [appid, setAppId] = useState(null);
  const [start, setStart] = useState(false);
  const [startApp, setStartApp] = useState(false);
  const { data, error, loaded } = useCallApi({
    endpoint: doctor_id
      ? `appointments/getbydoctor/${doctor_id}`
      : "appointments",
  });

  const { appResp, apperrorData, apoploadedData } = getAppointmentById({
    endpoint:`appointments/${appid}`,
    action: "GET",
    start: startApp
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
    (event, app) => {
      const confirm = window.confirm(`Informacion de la Cita:\n\nMedico: ${app.doctorname}\nEspecialidad: ${app.specialitie}\nEstado: ${app.status}\nConsultorio: ${app.consulting_room}\nDetalle: ${app.description}\nFecha: ${app.init_datetime}${enabled?'\n\n\nSi Confirma la ventada Eliminara la cita.':''}`);
      if (enabled) {
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
    if (appResp != null) {
      setAppId(null);
      setStartApp(false);
      handleSelectEvent(myEvent, appResp[0])
    }
  }, [data, error, responseData, appResp]);

  return (
    <Fragment>
      <div>
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={(event) => {
            if (event && event.id) {
              setAppId(event.id);
              setStartApp(true);
            }
            setEvent(event)
          }}
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
