const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments:[
    {
    id: 1,
    time: "12pm",
    interview: null,
    }
  ],
  interviewers:[],
})
const setDay = day => setState(prev => ({...prev, day:day}))
const bookInterview = (id, interview) =>{
  // console.log('start of book interview', id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
    
  };
  const appointmentsCopy = [
    ...state.appointments
  ];

  appointmentsCopy[id-1] = appointment
  
  setState(prev => ({...prev,appointmentsCopy}))
  // console.log('url', `http://localhost:8001/api/appointments/${id}`)
  return (
    axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
  )
          
}

const cancelInterview = (id) => {
  const appointCopy = state.appointments
  appointCopy[id-1].interview = null
  setAppointments(appointCopy);
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
}