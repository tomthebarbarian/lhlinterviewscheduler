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
  const setDays = (days) => {
    return setState(prev => {
      return ({ ...prev, days })
    })
  }

  // Get the current day
  const currDay = state.days.filter(elem => elem.name === state.day)
  // console.log('currday',currDay)
  
  let currId
  if (currDay.length>0) {
    currId = currDay[0].id
  }

  const updateSpot = (id, increment) => {
    const copyDays = state.days;
    if (increment) {
      copyDays[id-1].spots += 1
    } else {
      copyDays[id-1].spots -= 1
    }
    // console.log('copy days', copyDays)
    setDays(copyDays)
  }

  const setDay = day => setState(prev => ({...prev, day}))

  const bookInterview = (id, interview) =>{
    // console.log('start of book interview', id, interview);
    const appointment = {
      ...state.appointments[id-1],
      interview: { ...interview }
      
    };
    const appointmentsCopy = state.appointments;
    
    // Check if update or create
    let createNewAppointment = false;
    if (appointmentsCopy[id-1].interview === null) {
      createNewAppointment = true;
    }
    
    appointmentsCopy[id-1] = appointment

    setState(prev => ({...prev,appointments:appointmentsCopy}))
    // console.log('url', `http://localhost:8001/api/appointments/${id}`)
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
        .then(() => {
          if (createNewAppointment){
            updateSpot(currId, false)
          }
        })
    )
            
  }


  const cancelInterview = (id) => {
    const appointCopy = state.appointments
    appointCopy[id-1].interview = null
    setAppointments(appointCopy);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(updateSpot(currId, true))
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
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
      // console.log('interviewers Arr',interviewArr )
      setAppointments(appointArr)
      // console.log('is this anything 2',state.interviewers)
      setInterviewers(interviewArr)
      // console.log('is this anything',state.interviewers)
    })
  }, [])

  return {state, setDay, bookInterview, cancelInterview}
}
export default useApplicationData;