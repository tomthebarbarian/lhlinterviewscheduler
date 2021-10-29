import React, {useState, useEffect} from "react";
import axios from "axios";


import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:[{}],
    interviwers:[],
  })
  const setDays = (days) => {
    return setState(prev => {
      return ({ ...prev, days })
    })
  }
  const setAppointments = (appointArr) => setState(prev => Object.assign({},prev, {appointments:[...appointArr]}))
  const setInterviwers = (interviwerArr) => setState(prev => Object.assign({},prev, {interviwers:[...interviwerArr]}))

  const setDay = day => setState(prev => ({...prev, day:day}))
  let dailyAppointments = []
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then(res => {
      const tempstate = state;
      setDays(res[0].data)
      const appointArr = []
      const interviewArr = []
      // console.log(res.data)
      for (let elem in res[1].data){
        // console.log(res.data[elem])
        appointArr.push(res[1].data[elem])
      }
      for (let elem in res[2].data){
        // console.log(res.data[elem])
        interviewArr.push(res[2].data[elem])
      }
      // console.log('before',state)
      // console.log('dis appoint arr', appointArr)
      setAppointments(appointArr)
      setInterviwers(interviewArr)
      // console.log(state.appointments)
    })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day)
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
  
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
      )
  })

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

