import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


const Appointment = (props) => {
  let scheduleString
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // console.log(props.interview)
  let starter = props.interview && props.interview.interviewer !== undefined && props.interview.interviewer.length > 0? SHOW : EMPTY
  // console.log(`bool result`, props.interview && props.interview.interviewer !== undefined)
  // console.log('props.interview', props.interview)
  // console.log(props.interview.interviewer)
  // console.log(starter)

  const {mode, transition, back} = useVisualMode(starter);
  console.log(mode)
  if (props.time) {
    scheduleString = `Appointment at ${props.time}`
  } else {
    scheduleString = 'No appointments'
  }

  return <article 
            className="appointment"
          >
            <Header time={props.time}> {scheduleString}</Header>
            {mode === EMPTY && <Empty onAdd={transition} />}
            {mode === SHOW && (
              <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
              />
            )}
            {mode === CREATE && (
              <Form
                interviewers={[]}
                onCancel={back}
              />
            )}
          </article>
};
export default Appointment;