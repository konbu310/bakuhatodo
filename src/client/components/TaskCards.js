import React from 'react';
import TaskCard from './TaskCard';

const TaskCards = props => {
  const taskDataJSX = props.taskData.map(data => (
    <TaskCard
      key={data._id}
      _id={data._id}
      title={data.title}
      deadline={data.deadline}
      content={data.content}
      width={data.width}
      height={data.height}
      left={data.left}
      top={data.top}
      editMode={props.editMode}
      switchMode={props.switchMode(data)}
      removeData={props.removeData(data._id)}
      detectId={props.detectId(data._id)}
      updatePosition={props.updatePosition}
      updateSize={props.updateSize}
      handleEdit={props.handleEdit}
      focusedId={props.focusedId}
    />
  ));
  return <React.Fragment>{taskDataJSX}</React.Fragment>;
};

export default TaskCards;
