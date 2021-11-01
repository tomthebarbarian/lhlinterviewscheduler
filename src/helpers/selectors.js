export const getAppointmentsForDay = (state, checkDay) => {
  const filteredAppoint = state.days.filter(day => day.name === checkDay);
  const dayObj = filteredAppoint[0];
  let appointArray = [];
  // console.log('This is filtered appoint',filteredAppoint)
  
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
  // console.log(state)
  // console.log("avail interviewers", state)
  // console.log('interviewer',state.interviewers[`${interviewerId}`])
  // console.log('getting interviewer', state)
  return {
    student:interview.student,
    interviewer:state.interviewers[interviewerId-1]
  }
  } return null;
};
