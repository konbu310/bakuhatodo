import React from 'react'
import { Card, Checkbox, Button, Form } from 'semantic-ui-react'
import Rnd from 'react-rnd'

export class ToggleCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  handleClick () {
    this.setState({ editMode: !this.state.editMode })
  }

  render () {
    // const styles = {
    //   edit: {
    //     display: this.state.editMode ? '' : 'none'
    //   },
    //   view: {
    //     display: this.state.editMode ? 'none' : ''
    //   },
    //   toggleSwitch: {
    //     float: 'right'
    //   }
    // }

    // const toggleSwitch = (
    //   <Checkbox slider style={styles.toggleSwitch}
    //     onChange={(e, d) => this.setState({ editMode: d.checked })} />
    // )

    return (
      <Rnd
        disableDragging={this.state.editMode}
      >
        <Card style={{ height: '100%', width: '100%' }}>
          <Card.Content>
            {this.state.editMode ? <EditModeCard /> : <ViewModeCard />}
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' toggle active={this.state.editMode} onClick={this.handleClick}>{this.state.editMode ? '保存' : '編集'}</Button>
              <Button basic color='red'>爆破</Button>
            </div>
          </Card.Content>
        </Card>
      </Rnd>
    )
  }
}

export class NormalCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  changeMode (isChecked) {
    this.setState({editMode: isChecked})
  }

  render () {
    return (
      <Rnd
      >
        <Card style={{ height: '100%', width: '100%' }}>
          <Card.Content>
            <Card.Header>
              Reactの勉強
              <Checkbox slider onChange={(e, d) => this.changeMode(d.checked)} style={{ float: 'right' }} />
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                2018/3/31
              </span>
            </Card.Meta>
            <Card.Description>
              ・爆破Todoを完成させる<br />
              ・いろいろな案を形にする<br />
              ・がんばる<br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button fluid basic color='red'>爆破</Button>
          </Card.Content>
        </Card>
      </Rnd>
    )
  }
}

const ViewModeCard = () => (
  <React.Fragment>
    <Card.Header>
      Reactの勉強
    </Card.Header>
    <Card.Meta>
      2018/3/31
    </Card.Meta>
    <Card.Description>
      ・爆破Todoを完成させる<br />
      ・いろいろな案を形にする<br />
      ・がんばる<br />
    </Card.Description>
  </React.Fragment>
)

const EditModeCard = () => (
  <Form>
    <Form.Input placeholder='Reactの勉強' />
    <Form.Input placeholder='2018/3/31' />
    <Form.TextArea placeholder='・爆破Todo完成させる' />
  </Form>
)
