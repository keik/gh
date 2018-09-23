// @flow

import axios from 'axios'
import debug from 'debug'
import React from 'react'

import Button from './common/atoms/Button'
import styles from './new.css'
import formStyles from '../styles/form.css'
import { API_REPOS } from '../../share/constants/api'

const d = debug('keik:gh:components:new')

export default class New extends React.Component<{}> {
  onSubmit = (e: any) => {
    e.preventDefault()
    const names = Array.from(
      new Set(
        Array.prototype.map
          .call(e.target.elements, el => el.name)
          .filter(Boolean)
      )
    )
    const data = names.reduce((acc, name) => {
      acc[name] = e.target[name].value
      return acc
    }, {})

    let axiosMethod = null
    switch (e.target.method) {
      case 'get':
        axiosMethod = axios.get
        break
      case 'post':
        axiosMethod = axios.post
        break
      case 'put':
        axiosMethod = axios.put
        break
      case 'delete':
        axiosMethod = axios.delete
        break
      default:
        throw new Error('method not found')
    }

    axiosMethod(e.target.action, data)
      .then(() => {
        global.location.href = `/${data.owner}/${data.name}`
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    d('render')
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Create a new repository</h2>
          <p className={styles.subDesc}>
            A repository contains all the files for your project, including the
            revision history.
          </p>
        </div>
        <form
          action={`${API_REPOS.LOGIN_USERS}`}
          method="post"
          onSubmit={this.onSubmit}
        >
          <input type="hidden" name="authenticity_token" value="TRUE" />

          <div className={styles.repoNamesControl}>
            <div className={formStyles.formGroup}>
              <label htmlFor="owner">Owner</label>
              <input
                className={formStyles.formControl}
                id="owner"
                name="owner"
                type="text"
              />
            </div>
            <span> / </span>
            <div className={formStyles.formGroup}>
              <label htmlFor="name">Repository name</label>
              <input
                className={formStyles.formControl}
                id="name"
                name="name"
                type="text"
              />
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="description">Description (optional)</label>
            <input
              className={`${formStyles.formControl} ${formStyles.full}`}
              id="description"
              name="description"
              type="text"
            />
          </div>

          <hr className={styles.divider} />

          <div className={formStyles.inlineFormGroup}>
            <input id="public-true" name="public" type="radio" value="true" />
            <label className={styles.radioLabel} htmlFor="public-true">
              Public
              <p className={styles.subDesc}>
                Anyone can see this repository. You choose who can commit.
              </p>
            </label>
          </div>
          <div className={formStyles.inlineFormGroup}>
            <input id="public-false" name="public" type="radio" value="false" />
            <label className={styles.radioLabel} htmlFor="public-false">
              Private
              <p className={styles.subDesc}>
                You choose who can see and commit to this repository.
              </p>
            </label>
          </div>

          <hr className={styles.divider} />

          <Button primary>Create repository</Button>
        </form>
      </div>
    )
  }
}