import React from 'react'
import request from 'superagent'
import TaskCards from './TaskCards'

class BakuhaTodo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasksData: [],
      editMode: false,
      currentTitle: '',
      currentDeadline: '',
      currentContent: ''
    }
  }

  componentWillMount () {
    this.getTasksData()
  }

  getTasksData (e) {
    request
      .get('/api/getTasksData')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({
          tasksData: data.body.logs
        })
      })
  }

  switchMode () {
    if (this.state.editMode) {
      // DB更新処理
      window.alert('DB更新')
    }
    this.setState({ editMode: !this.state.editMode })
  }

  render () {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <TaskCards
          tasksData={this.state.tasksData}
          editMode={this.state.editMode}
          switchMode={() => this.switchMode()}
        />
      </div>
    )
  }
}

export default BakuhaTodo
