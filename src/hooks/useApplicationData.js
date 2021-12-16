import { useEffect, useReducer} from "react"
import axios from 'axios'

const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"
const reducer = (state, action) => {
  switch (action.type) {
  case SET_DAY:
    return {
      ...state,
      day: action.day,
    }
  case SET_INTERVIEW:
    return {
      ...state,
      id: action.id,
      interview: action.interview,
    }
  case SET_APPLICATION_DATA:
    return {    
      ...state,
      interviewers: action.interviewers,
      days: action.days,
      appointments: action.appointments,
  
    }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    )
  }
};

const initState = {
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
}

const useApplicationData = function() {

  const [state, dispatch] = useReducer(reducer,initState)
   

  const setAppointments = (appointArr) => dispatch(
    {
      type: SET_APPLICATION_DATA, 
      days: state.days,
      appointments:appointArr,
      interviewers: state.interviewers 
    }
  )
  const setInterviewers = (interviewerArr) => dispatch(
    {
    type: SET_APPLICATION_DATA, 
    days: state.days,
    appointments:state.appointments,
    interviewers: interviewerArr 
  })

  // const setInterviewers = (interviewerArr) => setState(prev => Object.assign({},prev, {interviewers:[...interviewerArr]}))
  const setDay = day => dispatch({type:SET_DAY, day:day})
  
  // const setDays = (days) => {
  //   dispatch({})
  // }
  const setDays = (days) => dispatch(
    {
    type: SET_APPLICATION_DATA, 
    days: days,
    appointments: state.appointments,
    interviewers: state.interviewers 
  })
  
  // Get the current day
  let currDay = state.day
  if (state.days && state.days.length > 0) {
    currDay = state.days.filter(elem => elem.name === state.day)
  } 
  let currId
  if (currDay.length>0) {
    currId = currDay[0].id
  }

  // Update free spots
  const updateSpots = (id, increment) => {
    const copyDays = [...state.days];
    if (increment) {
      copyDays[id-1].spots += 1
    } else {
      copyDays[id-1].spots -= 1
    }
     setDays(copyDays)
  }

  const bookInterview = (id, interview) =>{
    const appointment = {
      ...state.appointments[id-1],
      interview: { ...interview }
      
    };
    const appointmentsCopy = [...state.appointments];
    
    // Check if update or create
    let createNewAppointment = false;
    if (appointmentsCopy[id-1].interview === null) {
      createNewAppointment = true;
    }
    appointmentsCopy[id-1] = appointment
    return (
      axios.put(`/api/appointments/${id}`,{interview})
        .then(() => {
          if (createNewAppointment){
            setAppointments(appointmentsCopy)
            updateSpots(currId, false)
          }
        })
    )         
  }

  const cancelInterview = (id) => {
    const appointCopy = [...state.appointments]
    appointCopy[id-1].interview = null
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setAppointments(appointCopy)
        updateSpots(currId, true)
      }
      )
  }
  // Api calls to get data from server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(res => {
      const appointArr = []
      const interviewArr = []
      for (let elem in res[1].data){
        appointArr.push(res[1].data[elem])
      }
      for (let elem in res[2].data){
        interviewArr.push(res[2].data[elem])
      }
      dispatch({
        type: SET_APPLICATION_DATA,
        days:res[0].data,
        appointments:appointArr,
        interviewers:interviewArr,
       });

    })
  }, [])
  return {state, setDay, bookInterview, cancelInterview}
}
export default useApplicationData;