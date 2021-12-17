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
    // console.log(action.appointments)
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

  // const setInterviewers = (interviewerArr) => setState(prev => Object.assign({},prev, {interviewers:[...interviewerArr]}))
  const setDay = day => dispatch({type:SET_DAY, day:day})
  
  // const setDays = (days) => {
  //   console.log('in set days')
  //   dispatch(
  //   {
  //   type: SET_APPLICATION_DATA, 
  //   days: days,
  //   appointments: state.appointments,
  //   interviewers: state.interviewers 
  // })}
  
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
  // const updateSpots = (id, increment) => {
  //   const copyDays = [...state.days];
  //   if (increment) {
  //     copyDays[id-1].spots += 1
  //   } else {
  //     copyDays[id-1].spots -= 1
  //   }
  //    setDays(copyDays)
  // }

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
            // console.log('old appoint', state.appointments)
            // console.log('new appoint?', appointmentsCopy)
            const copyDays = [...state.days];
            // console.log(copyDays)
            copyDays[currId-1].spots -= 1
            dispatch(
              {
                type: SET_APPLICATION_DATA, 
                days: copyDays,
                appointments: appointmentsCopy,
                interviewers: state.interviewers 
              })
            // updateSpots(currId, false)
          } else {
            dispatch(
              {
                type: SET_APPLICATION_DATA, 
                days: state.days,
                appointments: appointmentsCopy,
                interviewers: state.interviewers 
              })
          }
        })
    )         
  }

  const cancelInterview = (id) => {
    const appointCopy = [...state.appointments]
    appointCopy[id-1].interview = null
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const copyDays = [...state.days];
        copyDays[currId-1].spots += 1
        dispatch(
          {
            type: SET_APPLICATION_DATA, 
            days: copyDays,
            appointments:appointCopy,
            interviewers: state.interviewers 
          })
      })
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