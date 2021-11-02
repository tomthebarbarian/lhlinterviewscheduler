import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { tSEnumDeclaration } from "@babel/types";


    
let confirmMessage = ''
let confirmOnCancel;
let confirmConfirm;

const Appointment = (props) => {
  let scheduleString
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";


  
  // console.log('props.interview',props.interview)
  let starter = props.interview && 
                // props.interview.interviewer !== undefined &&
                // props.interview.interviewer.length > 0 &&
                (true) ?
                SHOW : EMPTY

  // console.log(`bool result`, props.interview && props.interview.interviewer !== undefined)
  // console.log('props.interview', props.interview)
  // console.log(props.interview.interviewer)
  // console.log(starter)

  const {mode, transition, back} = useVisualMode(starter);

  // console.log(mode)
  if (props.time) {
    scheduleString = `Appointment at ${props.time}`
  } else {
    scheduleString = 'No appointments'
  }

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log('save', interview)
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then((result) => {
        console.log('result of put', result.data)
        setTimeout(() => transition(SHOW),100) 
      })
  };

  const removeAppoint = function() {
    // transition(CONFIRM)
    confirmMessage = 'ARE YOUR SURE YOU WANT TO DELETE?'
    confirmOnCancel = back;
    confirmConfirm = () => {
      transition(SAVING)
      props.cancelInterview(props.id)
      .then((res) => {
        console.log('result of delete', res.data)
        transition(EMPTY)
        })
    };
    transition(CONFIRM)
  }

  const toEdit = () => {
    transition(CREATE)
  }

  return <article 
            className="appointment"
          >
            <Header time={props.time}> {scheduleString}</Header>
            {mode === EMPTY && <Empty onAdd={transition} />}
            {mode === SHOW && props.interview && props.interview.interviewer && (
              <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onDelete={removeAppoint}
                onEdit={toEdit}
              />
            )}
            {mode === CREATE && (
              <Form
                interviewers={props.interviewers}
                // student={props.interview? props.interview.student : ''}
                // interviewer={props.interview? props.interview.interviewer: {}}
                onCancel={back}
                onConfirm={save}
              />
            )}
            {mode === SAVING && (
              <Status
                message='Saving'
              />
            )}            
            {mode === CONFIRM && (
              <Confirm
                message={confirmMessage}
                onCancel={confirmOnCancel}
                onConfirm={confirmConfirm}
              />
            )}
          </article>

};
export default Appointment;