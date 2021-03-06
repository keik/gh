// @flow

import { API_REPOS_COMMITS } from '@gitcub/constants/api'
import type { CommitT, CommitWithDetailsT } from '@gitcub/types/gh'
import axios from 'axios'

// TODO: bad dependencies
import { genAPIStr } from '../../../app-server/shared/utils'

export const FETCH: 'COMMITS/FETCH' = 'COMMITS/FETCH'
export const FETCH_ONE_WITH_DETAILS: 'COMMITS/FETCH_ONE_WITH_DETAILS' =
  'COMMITS/FETCH_ONE_WITH_DETAILS'

export async function fetch({
  owner,
  repo,
  tree = ''
}: {
  owner: string,
  repo: string,
  tree?: string
}): Promise<
  StandardActionT<typeof FETCH, {| commits: $ReadOnlyArray<CommitT> |}>
> {
  const { data } = await axios.get(
    `/api/v1/repos/${owner}/${repo}/commits?sha=${tree}`
  )
  return {
    type: FETCH,
    payload: { commits: data }
  }
}

export async function fetchOneWithDetails({
  owner,
  repo,
  sha
}: {
  owner: string,
  repo: string,
  sha: string
}): Promise<
  StandardActionT<
    typeof FETCH_ONE_WITH_DETAILS,
    {| commit: CommitWithDetailsT |}
  >
> {
  const { data } = await axios.get(
    genAPIStr(API_REPOS_COMMITS, { owner, repo, sha })
  )
  return {
    type: FETCH_ONE_WITH_DETAILS,
    payload: { commit: data }
  }
}

type State = $ReadOnlyArray<CommitT | CommitWithDetailsT>

export default function commits(
  state: State = [],
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      return action.payload.commits
    }
    case FETCH_ONE_WITH_DETAILS: {
      const { commit } = action.payload
      return state.some(c => (c.sha = commit.sha))
        ? state.map(c => (c.sha === commit.sha ? commit : c))
        : [...state, commit]
    }
    default:
      return state
  }
}
