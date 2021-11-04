import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  let days = props.days;
  let setDay = props.onChange;
  let allDays = days.map((day) => {
    return (
    <DayListItem 
      key ={day.id}
      name = {day.name}
      spots = {day.spots} 
      selected = {props.value === day.name}
      setDay = {setDay}
    />
    )
  }) 

  return (
  <ul>
    {allDays}
  </ul>
  )
} 