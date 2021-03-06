// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storyname } from 'storybook-utils'

import RepositoryIssues from './RepositoryIssues'

storiesOf(storyname(base, filename), module).add('with default', () => (
  <MemoryRouter>
    <RepositoryIssues
      issues={[
        {
          id: 1,
          title: '$TITLE_1',
          createdAt: '$CREATED_AT_1',
          createdBy: '$CREATED_BY_1',
          commentsCount: 1
        },
        {
          id: 2,
          title: '$TITLE_2',
          createdAt: '$CREATED_AT_2',
          createdBy: '$CREATED_BY_2',
          commentsCount: 2
        }
      ]}
      match={{
        params: {
          owner: '$OWNER',
          repo: '$REPO'
        }
      }}
    />
  </MemoryRouter>
))
