import React from 'react';
import Rnd from 'react-rnd';
import bakuhaMp3 from '../assets/bakuha.mp3';
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
      props.updatePosition(d.x, d.y);
    }}
    onResizeStart={props.detectId}
    onResizeStop={(e, direction, ref, delta, position) => {
      props.updateSize(ref.offsetWidth, ref.offsetHeight);
    }}
  >
    <Card
      className={'card' + String(props._id)}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Card.Content className={'card' + String(props._id)}>
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
      <Card.Content extra className={'card' + String(props._id)}>
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
    <audio id={'bakuhaMp3' + String(props._id)} src={bakuhaMp3} />
    <img
      id={'bakuhaGif' + String(props._id)}
      src=""
      alt="爆破"
      width="300%"
      height="300%"
      style={{
        display: 'none',
        pointerEvents: 'none'
      }}
    />
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

export default TaskCard;
