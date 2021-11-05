import {useState, useEffect} from "react"
import axios from 'axios'

const useApplicationData = function() {
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
  
  const setAppointments = (appointArr) => setState(prev => Object.assign({},prev, {appointments:[...appointArr]}))
  const setInterviewers = (interviewerArr) => setState(prev => Object.assign({},prev, {interviewers:[...interviewerArr]}))
  const setDay = day => setState(prev => ({...prev, day}))
  const setDays = (days) => {
    return setState(prev => {
      return ({ ...prev, days })
    })
  }

  // Get the current day
  const currDay = state.days.filter(elem => elem.name === state.day)

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
            setState(prev => ({...prev,appointments:appointmentsCopy}))
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
      setDays(res[0].data)
      const appointArr = []
      const interviewArr = []
      for (let elem in res[1].data){
        appointArr.push(res[1].data[elem])
      }
      for (let elem in res[2].data){
        interviewArr.push(res[2].data[elem])
      }
      setAppointments(appointArr)
      setInterviewers(interviewArr)
    })
  }, [])
  return {state, setDay, bookInterview, cancelInterview}
}
export default useApplicationData;