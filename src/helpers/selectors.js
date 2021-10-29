export const getAppointmentsForDay = (state, checkDay) => {
  const filteredAppoint = state.days.filter(day => day.name === checkDay);
  let appointArray = [];
  if (filteredAppoint.length > 0) {
    appointArray = filteredAppoint[0].appointments.map(appointmentId => state.appointments[appointmentId])
  }
  return appointArray;
};
