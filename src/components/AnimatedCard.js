import React from 'react'
import { Button, Card, Transition } from 'semantic-ui-react'
import Rnd from 'react-rnd'

class TaskCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  toggleVisibility () {
    this.setState({visible: !this.state.visible})
  }

  render () {
    return (
      <div>
        <Button content={this.state.visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} />
        <Transition visible={this.state.visible} animation='scale' duration={500}>
          <Rnd
          >
            <Card style={{ height: '100%', width: '100%' }}>
              <Card.Content>
                <Card.Header>
                  Reactの勉強
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
        </Transition>
      </div>
    )
  }
}

export default TaskCard
