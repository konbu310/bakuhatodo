import React from 'react'
import TaskCard from './TaskCard'

const TaskCards = (props) => {
  const tasksDataJSX = props.tasksData.map(data => (
    <TaskCard
      key={data._id}
      title={data.title}
      deadline={data.deadline}
      content={data.content}
      editMode={props.editMode}
      switchMode={props.switchMode}
    />
  ))
  return (
    <React.Fragment>
      {tasksDataJSX}
    </React.Fragment>
  )
}

export default TaskCards
