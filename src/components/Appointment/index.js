import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


    
let confirmMessage = ''
// let confirmOnCancel;
let confirmConfirm;

let studentName;
let chosenInstruct;

const Appointment = (props) => {
  let scheduleString
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";



  console.log('props.interview',props.interview)
  let starter = props.interview ? SHOW : EMPTY
  
  studentName = props.interview ? props.interview.student : ''
  
  chosenInstruct = props.interview? props.interview.interviewer: null;

  const {mode, transition, back} = useVisualMode(starter);
  // if(props.interview) {
  //   starter = SHOW;
  // }
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
    // console.log('save', interview)
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then((result) => {
        // console.log('result of put', result.data)
        transition(SHOW, true)
      })
      .catch(err => {
        console.log(err)
        transition(ERROR_SAVE, true)
      })
  };

  const removeAppoint = function() {
    // transition(CONFIRM)
    confirmMessage = 'ARE YOUR SURE YOU WANT TO DELETE?'
    // confirmOnCancel = back;
    confirmConfirm = () => {
      transition(SAVING)
      props.cancelInterview(props.id)
      .then((res) => {
        console.log('result of delete', res.data)
        transition(EMPTY, true)
      })
      .catch(err => {
        console.log(err)
        transition(ERROR_DELETE, true)
      })
    };
    transition(CONFIRM)
  }

  const toEdit = (name, instruct) => {
    studentName = name
    chosenInstruct = instruct
    transition(CREATE)
  }

  return <article 
            className="appointment"
          >
            <Header time={props.time}> {scheduleString}</Header>
            {mode === EMPTY && !props.interview && <Empty onAdd={transition} />}
            {mode === EMPTY && props.interview && props.interview.interviewer && (
              <Show
                student={studentName}
                interviewer={chosenInstruct}
                onDelete={removeAppoint}
                onEdit={toEdit}
              />
            )}
            {mode === SHOW && props.interview && props.interview.interviewer && (
              <Show
                student={studentName}
                interviewer={chosenInstruct}
                onDelete={removeAppoint}
                onEdit={toEdit}
              />
            )}
            {mode === CREATE && (
              <Form
                interviewers={props.interviewers}
                student={studentName}
                interviewer={chosenInstruct}
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
                onCancel={back}
                onConfirm={confirmConfirm}
              />
            )}
            {mode === ERROR_DELETE && (
              <Error
                message={'THERE WAS A DELETE ERROR'}
                onClose={back}
              />
            )}
            {mode === ERROR_SAVE && (
              <Error
                message={'THERE WAS A SAVE ERROR'}
                onClose={back}
              />
            )}
          </article>

};
export default Appointment;