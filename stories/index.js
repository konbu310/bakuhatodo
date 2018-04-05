import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import * as Cards from './Cards'
import { Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

storiesOf('Card', module)
  .add('シンプル', () => (
    <Cards.NormalCard />
  ))
  .add('切り替えスイッチ', () => (
    <Cards.ToggleCard />
  ))

storiesOf('Form', module)
  .add('いろんなフォーム', () => (
    <Form>
      <Form.Input defaultValue='React' />
      <Form.Input />
      <Form.TextArea placeholder='・爆破Todo完成させる' />
    </Form>
  ))
