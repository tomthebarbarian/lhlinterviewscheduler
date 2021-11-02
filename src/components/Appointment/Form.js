import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent('')
    setInterviewer('')
  }
  
  const cancel = () =>{
    // console.log('in cancel')
    reset()
    props.onCancel()
  }

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name='name'
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => {
            setStudent(event.target.value)
          }}
          />
      </form>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer.id}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick={() => props.onConfirm(student, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
};

export default Form;
