import test from 'ava'
import axios from 'axios'
import Express from 'express'
import promiseFinally from 'promise.prototype.finally'

import { API_GIT_TAGS } from '../../../../../share/constants/api'
import tagsRouter from './tags'

promiseFinally.shim()
process.chdir('../../../../../../')

let app
let PORT
test.before('setup', () => {
  app = new Express()
    .use(tagsRouter)
    .listen(0)
  PORT = app.address().port
})

test.cb(`GET ${API_GIT_TAGS} with SHA should return a specified commit`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/tags/aaaaa`)
    .then((res) => {
      t.fail(res)
    })
    .catch((err) => {
      // TODO
      t.is(err.response.data, 'Not Implemented')
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_TAGS} from no exists repo should return 404`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/tags/aaaaa`)
    .then((res) => {
      t.fail(res)
    })
    .catch((err) => {
      // TODO
      t.is(err.response.data, 'Not Implemented')
    }).finally(t.end)
})

test.after('teardown', () => {
  app.close()
})