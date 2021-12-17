export const getAppointmentsForDay = (state, checkDay) => {
  // console.log(state)
  const filteredAppoint = state.days.filter(day => day.name === checkDay);
  const dayObj = filteredAppoint[0];
  let appointArray = [];

  if(dayObj && dayObj.appointments.length > 0) {
    appointArray = state.appointments.filter(
      appointment => dayObj.appointments.includes(appointment.id)
    )
  }
  return appointArray;
};

export const getInterview = (state, interview) => {
  if (interview) {
  const interviewerId = interview.interviewer;
  return {
    student:interview.student,
    interviewer:state.interviewers[interviewerId-1]
    }
  } 
  return null;
};
