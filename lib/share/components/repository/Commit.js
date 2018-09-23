// @flow

import debug from 'debug'
import { highlight } from 'highlight.js'
import React from 'react'
import { Link } from 'react-router'

import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import Button from '../common/atoms/Button'
import panelStyles from '../../styles/panel.css'
import styles from './Commit.css'

import type { CommitObj, FileObj, ParentObj } from '../../../types/nodegit'

const d = debug('keik:gh:components:repository:commit')

export default class RepoCommit extends React.Component<{
  commit: CommitObj,
  files: Array<FileObj>,
  params: {
    owner: string,
    repo: string,
    sha: string
  },
  parents: Array<ParentObj>
}> {
  render() {
    d('render')
    const {
      commit: {
        author: { date, name },
        message
      },
      params: { owner, repo, sha },
      files,
      parents
    } = this.props
    return (
      <div className={styles.container}>
        <div className={panelStyles.panel}>
          <div className={panelStyles.infoPanelHeader}>
            <Button
              as="a"
              small
              transparent
              style={{ float: 'right' }}
              href={`/${owner}/${repo}/tree/${sha}`}
            >
              Browse files
            </Button>
            <div className={styles.commitTitle}>{message}</div>
            <div className={styles.commitBranches}>
              <i className="fa fa-code-fork" /> master
            </div>
          </div>
          <div className={panelStyles.panelBody}>
            <div className={styles.author}>
              <img
                alt={name}
                style={{
                  verticalAlign: 'middle',
                  width: 20,
                  height: 20,
                  background: '#ccc'
                }}
              />{' '}
              {name} commited on <time-ago datetime={date} />
            </div>
            <div className={styles.sha}>
              <span>
                {parents.length} parent
                {parents.map(p => (
                  <Link key={p.sha} to={`/${owner}/${repo}/commit/${p.sha}`}>
                    {p.sha.substr(0, 7)}
                  </Link>
                ))}
              </span>
              <span>commit {sha}</span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <i className="fa fa-file-text-o" /> Showing N changed file with N
            addition and N deletion.
          </div>
          <div>
            <SegmentedButtonsContainer>
              <Button small>Unified</Button>
              <Button small>Split</Button>
            </SegmentedButtonsContainer>
          </div>
        </div>

        <div id="patches">
          {files.map((file, i) => (
            <div className={panelStyles.panel} key={i}>
              <div className={panelStyles.defaultPanelHeader}>
                {file.filename}
              </div>
              <pre>
                <ul className={styles.lines}>
                  {(() => {
                    const e = [<li key={'padding'}>...</li>]
                    for (let i = 0; i < file.changes; i++) {
                      e.push(<li key={i + 1}>{i + 1}</li>)
                    }
                    return e
                  })()}
                </ul>
                <code
                  className="hljs"
                  dangerouslySetInnerHTML={{
                    __html: highlight('diff', file.patch).value
                  }}
                />
              </pre>
            </div>
          ))}
        </div>
      </div>
    )
  }
}