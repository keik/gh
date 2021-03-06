// @flow

import type { TreeT } from '@gitcub/types/gh'
import axios from 'axios'

export const FETCH: 'TREES/FETCH' = 'TREES/FETCH'

export async function fetch({
  owner,
  repo,
  tree = ''
}: {
  owner: string,
  repo: string,
  tree?: string
}): Promise<StandardActionT<typeof FETCH, {| tree: TreeT |}>> {
  const { data } = await axios.get(
    `/api/v1/repos/${owner}/${repo}/git/trees/${tree}?last_commit=1`
  )
  return {
    type: FETCH,
    payload: { tree: data.tree }
  }
}

type State = TreeT

export default function trees(
  state: State = [],
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      const { tree } = action.payload
      return tree
    }
    default:
      return state
  }
}
