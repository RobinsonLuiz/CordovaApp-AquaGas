var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
createCalOptions.calendarName = "My Cal Name";
createCalOptions.calendarColor = "#FF0000"; // an optional hex color (with the # char), default is null, so the OS picks a color
window.plugins.calendar.createCalendar(createCalOptions, success, error);

var success = function (message) {
  alert("Success: " + JSON.stringify(message));
};
var error = function (message) {
  alert("Error: " + message);
};
