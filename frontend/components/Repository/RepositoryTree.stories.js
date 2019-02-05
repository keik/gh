// @flow

import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import RepositoryTree, { Breadcrumbs } from './RepositoryTree'

storiesOf('Repository/RepositoryTree', module).add('with default', () => (
  <MemoryRouter>
    <RepositoryTree
      branches={[
        {
          commit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#BRANCH_1'
        },
        {
          commit: {
            author: {
              date: '#DATE_2',
              name: '#NAME_2'
            },
            sha: '#SHA_2',
            message: '#MESSAGE_2'
          },
          name: '#BRANCH_2'
        }
      ]}
      entries={[
        {
          content: '#CONTENT_1',
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#NAME_1',
          path: '#PATH/#PATH_1',
          sha: '#SHA_1',
          size: 10,
          type: 'blob',
          url: '#URL_1'
        },
        {
          content: '#CONTENT_2',
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#NAME_2',
          path: '#PATH_2',
          sha: '#SHA_2',
          size: 10,
          type: 'blob',
          url: '#URL_2'
        }
      ]}
      match={{
        params: {
          owner: '#OWNER',
          repo: '#REPO',
          tree: '#TREE',
          path: '#PATH'
        }
      }}
      tags={[]}
    />
  </MemoryRouter>
))

storiesOf('Repository/RepositoryTree__Breadcrumbs', module)
  .add('with default', () => (
    <MemoryRouter>
      <Breadcrumbs
        match={{
          params: { owner: 'foo', repo: 'bar', tree: 'TREE', path: 'PATH' }
        }}
      />
    </MemoryRouter>
  ))
  .add('with 3rd level path', () => (
    <MemoryRouter>
      <Breadcrumbs
        match={{
          params: { owner: 'foo', repo: 'bar', tree: 'TREE', path: 'a/b/c' }
        }}
      />
    </MemoryRouter>
  ))