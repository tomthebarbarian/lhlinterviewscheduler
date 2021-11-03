import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  let interviewers = props.interviewers
  
  let onChange = props.onChange
  let value = props.value

  let allInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={value && interviewer.id === value.id}
            setInterviewer={() => onChange(interviewer)}
          />
  })
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {allInterviewers}
  </ul>
</section>
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList