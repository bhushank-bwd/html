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
        titleFormat: { year: "numeric", month: "long" },
        // other view-specific options here
      },
    },
    events: [
      {
        // this object will be "parsed" into an Event Object
        title: "First Event", // a property!
        start: "2023-02-21T12:30:00", // a property!
        end: "2023-02-21T14:30:00", // a property! ** see important note below about 'end' **
        id: "5",
        color:'red',
        dataTitle:"lorem"
        
      },
    ],
    editable:true,
    eventDrop: function(info){
      var today=moment().format("YYYY-MM-DD");
      var start = info.event._instance.range.start;
      console.log(start);
      if (Date.parse(start) < Date.parse(today)){
        console.log("old date");
        info.revert();
        return false;
      }
    },
    eventClick: function(info) {
        console.log(info);
        console.log('Event: ' + info.event.extendedProps.dataTitle);
        console.log('Event: ' + info.event.id);
    }
  });
  calendar.render();
});
