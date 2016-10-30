import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import styles from './home.css'
import btnStyles from '../../styles/btn.css'
import Entries from './_partial/entries'
import NumbersSummary from './_partial/numbers-summary'
import TreeSelector from './_partial/tree-selector'

const d = debug('keik:gh:components:repository:home')

export default class RepoHome extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
    commits: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      message:  PropTypes.string.isRequired,
    })).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      lastCommit: PropTypes.shape({
        author: PropTypes.shape({
          date: PropTypes.string.isRequired,
        }).isRequired,
        message: PropTypes.string.isRequired,
        sha: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render = () => {
    d(`render`)
    const { params: { owner, repo, tree='master' } } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.metaContent}>
          <span>No description or website provided.</span>
          <span>- <button>Edit</button></span>
        </div>
        <nav>
          <NumbersSummary {...this.props} />
        </nav>
        <div className={styles.fileNavigation}>
          <div className={styles.treeSelector}>
            <TreeSelector {...this.props} />
          </div>
          <a
            className={btnStyles.defaultSmBtn}
            href={`${owner}/${repo}/pull/new/${tree}`}>
            New pull request
          </a>
          <div
            className={styles.floatRight}
            style={{marginRight: 0}}
          >
            <button className={btnStyles.primarySmBtn}>Clone or download</button>
          </div>
          <div className={styles.floatRight}>
            <div className={btnStyles.group}>
              <form className={styles.inline}>
                <input
                  className={btnStyles.defaultSmBtn}
                  type="submit"
                  value="Create new file"
                />
              </form>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${owner}/${repo}/upload/${tree}`}>
                Upload files
              </a>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${owner}/${repo}/find/${tree}`}>
                Find file
              </a>
            </div>
          </div>
        </div>
        <Entries {...this.props} />
      </div>
    )
  }
}