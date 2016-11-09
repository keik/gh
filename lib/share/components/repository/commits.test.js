import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoCommits from './commits'

test('<RepoCommits /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoCommits />)
  })
})