import React, {useState, useEffect} from "react";
import axios from "axios";


import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
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

  const setDays = (days) => {
    return setState(prev => {
      return ({ ...prev, days })
    })
  }
  const setAppointments = (appointArr) => setState(prev => Object.assign({},prev, {appointments:[...appointArr]}))
  const setInterviewers = (interviewerArr) => setState(prev => Object.assign({},prev, {interviewers:[...interviewerArr]}))

  const setDay = day => setState(prev => ({...prev, day:day}))
  let dailyAppointments = []
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

  dailyAppointments = getAppointmentsForDay(state, state.day)
  // console.log('daily appoint', dailyAppointments);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    // console.log('schedule interview', appointment.interview)
    // console.log('schedule interview', interview)

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        bookInterview = {bookInterview}
        cancelInterview={cancelInterview}
      />
      )
  })
  console.log('schedule',schedule);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

