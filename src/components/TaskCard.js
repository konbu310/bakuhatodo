import React from 'react'
import Rnd from 'react-rnd'
import { Card, Button, Form } from 'semantic-ui-react'

const TaskCard = (props) => (
  <Rnd
    bounds='parent'
    disableDragging={props.editMode}
  >
    <Card style={{ height: '100%', width: '100%' }}>
      <Card.Content>
        {props.editMode
          ? <EditModeContent
            title={props.title}
            deadline={props.deadline}
            content={props.content}
          />
          : <ViewModeContent
            title={props.title}
            deadline={props.deadline}
            content={props.content}
          />
        }
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' toggle active={props.editMode} onClick={props.switchMode}>{props.editMode ? '保存' : '編集'}</Button>
          <Button basic color='red' onClick={() => window.alert('爆破するぜ')}>爆破</Button>
        </div>
      </Card.Content>
    </Card>
  </Rnd>
)

const ViewModeContent = (props) => (
  <React.Fragment>
    <Card.Header>
      {props.title}
    </Card.Header>
    <Card.Meta>
      {props.deadline}
    </Card.Meta>
    <Card.Description>
      {props.content}
    </Card.Description>
  </React.Fragment>
)

const EditModeContent = (props) => (
  <Form>
    <Form.Input defaultValue={props.title} />
    <Form.Input type='date' defaultValue={props.deadline} />
    <Form.TextArea defaultValue={props.content} />
  </Form>
)

export default TaskCard
