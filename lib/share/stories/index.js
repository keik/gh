import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Button from './Button'
import Welcome from './Welcome'
import Code from '../components/code'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))

storiesOf('Code', module)
  .add('with text', () => (
    <Code onClick={action('clicked')}>Hello Code</Code>
  ))
