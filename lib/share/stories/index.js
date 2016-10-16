import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Button from './Button'
import Welcome from './Welcome'
import Header from '../components/header'
import Code from '../components/code'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome
      showApp={linkTo('Button')}
    />
  ))

storiesOf('Button', module)
  .add('with text', () => (
    <Button
      onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button
      onClick={action('clicked')}>
      😀 😎 👍 💯
    </Button>
  ))

storiesOf('Header', module)
  .add('with text', () => (
    <Header
      onClick={action('clicked')}>Hello Code
    </Header>
  ))

storiesOf('Code', module)
  .add('with text', () => (
    <Code
      onClick={action('clicked')}>Hello Code
    </Code>
  ))
