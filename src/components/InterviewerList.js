import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  let interviewers = props.interviewers
  let onChange = props.onChange
  let value = props.value

  let allInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === value}
            setInterviewer={() => onChange(interviewer.id)}
          />
  })
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {allInterviewers}
  </ul>
</section>
}

export default InterviewerList