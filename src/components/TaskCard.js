import React from 'react';
import Rnd from 'react-rnd';
import { Card, Button, Form } from 'semantic-ui-react';

const TaskCard = props => (
  <Rnd
    bounds=".area"
    style={{
      display: 'inline-block',
      position: 'fixed'
    }}
    default={{
      x: Number(props.left),
      y: Number(props.top),
      width: Number(props.width),
      height: Number(props.height)
    }}
    disableDragging={props.editMode}
    onDragStart={props.detectId}
    onDragStop={(e, d) => {
      // let left = convertToVW(d.x);
      // let top = convertToVH(d.y);
      // props.updatePosition(left, top);
      props.updatePosition(d.x, d.y);
    }}
    onResizeStart={props.detectId}
    onResizeStop={(e, direction, ref, delta, position) => {
      // let width = convertToVW(ref.offsetWidth);
      // let height = convertToVH(ref.offsetHeight);
      // props.updateSize(width, height);
      props.updateSize(ref.offsetWidth, ref.offsetHeight);
    }}
  >
    <Card
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Card.Content>
        {props.editMode && props.focusedId === props._id ? (
          <EditModeContent
            title={props.title}
            deadline={props.deadline}
            content={props.content}
            titleChange={props.titleChange}
            deadlineChange={props.deadlineChange}
            contentChange={props.contentChange}
          />
        ) : (
          <ViewModeContent
            title={props.title}
            deadline={props.deadline}
            content={props.content}
          />
        )}
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" toggle onClick={props.switchMode}>
            {props.editMode && props.focusedId === props._id ? '保存' : '編集'}
          </Button>
          <Button basic color="red" onClick={props.removeData}>
            爆破
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Rnd>
);

const ViewModeContent = props => (
  <React.Fragment>
    <Card.Header>{props.title}</Card.Header>
    <Card.Meta>{props.deadline}</Card.Meta>
    <Card.Description>{props.content}</Card.Description>
  </React.Fragment>
);

const EditModeContent = props => (
  <Form>
    <Form.Input defaultValue={props.title} onChange={props.titleChange} />
    <Form.Input
      type="date"
      defaultValue={props.deadline}
      onChange={props.deadlineChange}
    />
    <Form.TextArea
      defaultValue={props.content}
      onChange={props.contentChange}
    />
  </Form>
);

const convertToVW = objW => {
  let ww = window.innerWidth;
  let px = objW * (100 / ww);
  return String(px) + 'vw';
};

const convertToVH = objH => {
  let wh = window.innerHeight;
  let px = objH * (100 / wh);
  return String(px) + 'vh';
};

export default TaskCard;
