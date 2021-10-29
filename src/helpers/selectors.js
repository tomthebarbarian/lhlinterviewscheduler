export const getAppointmentsForDay = (state, checkDay) => {
  const filteredAppoint = state.days.filter(day => day.name === checkDay);
  let appointArray = [];
  // console.log('This is filtered appoint',filteredAppoint)
  if(filteredAppoint[0] && filteredAppoint[0].appointments.length > 0) {
    appointArray = state.appointments.filter(appointment => filteredAppoint[0].appointments.includes(appointment.id))
  }
  return appointArray;
};
