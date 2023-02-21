$(document).ready(function () {});
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: { center: "dayGridMonth,timeGridWeek,listWeek" },
    views: {
      dayGrid: {
        // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
      },
      timeGrid: {
        // options apply to timeGridWeek and timeGridDay views
      },
      week: {
        // options apply to dayGridWeek and timeGridWeek views
      },
      day: {
        // options apply to dayGridDay and timeGridDay views
      },
      dayGridMonth: {
        // name of view
        titleFormat: { year: 'numeric', month: 'long' }  ,
        // other view-specific options here
      },
    },
  });
  calendar.render();
});
