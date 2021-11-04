import React from "react";
import 'components/InterviewerListItem.scss'
import classNames from "classnames";

const InterviewerListItem = (props) => {
  let id = props.id
  let name = props.name
  let avatar = props.avatar
  let selected = props.selected
  let setInterviewer = props.setInterviewer
  let classes = classNames(
    'interviewers__item',
    {'interviewers__item--selected':selected}
  );
  return (
    <li 
      key={id} 
      className={classes} 
      onClick={setInterviewer}
    >
      <img
        className='interviewers__item-image'
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}
export default InterviewerListItem;