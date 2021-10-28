import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {
  let scheduleString
  if (props.time) {
    scheduleString = `Appointment at ${props.time}`
  } else {
    scheduleString = 'No appointments'
  }
  return <article 
            className="appointment"
          >
            <Header time={props.time}> {scheduleString}</Header>
            {props.interview ? 
              <Show student={props.interview.student}
              interviewer={props.interview.interviewer}></Show>
              :
              <Empty></Empty>
            }
          </article>
};
export default Appointment;