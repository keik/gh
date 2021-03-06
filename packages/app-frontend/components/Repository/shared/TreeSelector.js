// @flow

import type { BranchObj, TagObj } from '@gitcub/types/nodegit'
import * as React from 'react'
import { css } from 'styled-components'

import Button from '../../common/atoms/Button'
import Dropdown from '../../common/blocks/Dropdown'
import { Tab, TabItems, TabItem, TabPanel } from '../../common/Tab'

const branchesStyle = css`
  background-color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  > li {
    > a {
      display: block;
      padding: 8px 8px 8px 30px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #fff;
        background-color: #4078c0;
      }
    }
  }
`

// eslint-disable-next-line
const TreeSelector = ({
  branches,
  params,
  tags
}: {|
  branches: $ReadOnlyArray<BranchObj>,
  params: {
    owner: string,
    repo: string,
    tree?: string,
    path?: string
  },
  tags: $ReadOnlyArray<TagObj>
|}) => (
  <>
    <Dropdown
      toggler={
        <Button small>
          <i>Branch: </i>
          <span>{params.tree} </span>
          <i className="fa fa-caret-down" />
        </Button>
      }
      width={300}
    >
      <div>
        <div
          css={css`
            padding: 8px 10px;
            line-height: 16px;
            background: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;
            font-size: 12px;
            font-weight: 600;
            color: #333;
          `}
        >
          Switch branches/tags
          <button
            style={{
              float: 'right',
              border: 0,
              background: 'none',
              color: '#ccc',
              cursor: 'pointer'
            }}
          >
            <i className="fa fa-close" />
          </button>
        </div>
        <div style={{ backgroundColor: '#f8f8f8' }}>
          <div style={{ padding: '10px 10px 0' }}>
            <input
              style={{
                width: '100%',
                padding: '6px',
                lineHeight: '20px',
                borderRadius: '3px',
                border: '1px solid #ddd'
              }}
              placeholder="Find a tag..."
            />
          </div>
          <Tab>
            <TabItems>
              <TabItem target="branches" active>
                Branches
              </TabItem>
              <TabItem target="tags">Tags</TabItem>
            </TabItems>
            <TabPanel name="branches">
              <ul css={branchesStyle}>
                {branches.map((branch, i) => (
                  <li key={i}>
                    <a
                      href={`/${params.owner}/${params.repo}/tree/${branch.name}`}
                    >
                      {branch.name}
                    </a>
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel name="tags">
              <ul css={branchesStyle}>
                {tags.map((tag, i) => (
                  <li key={i}>
                    <a href={`/${params.owner}/${params.repo}/tree/${tag.ref}`}>
                      {tag.ref}
                    </a>
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Tab>
        </div>
      </div>
    </Dropdown>
  </>
)

export default TreeSelector
