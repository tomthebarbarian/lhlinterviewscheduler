import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');
  
  const reset = () => {
    setStudent('')
    setInterviewer('')
  }
  
  const cancel = () =>{
    reset()
    props.onCancel()
  }

  const validate = function () {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else  {
      props.onConfirm(student, interviewer.id);
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setError('')
              setStudent(event.target.value)
            }}
            data-testid='student-name-input'
            />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
};
export default Form;
