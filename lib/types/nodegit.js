// @flow

export type Author = {
  date: string,
  name: string
}

export type Branch = {
  commit: Commit,
  name: string
}

export type Commit = {
  author: Author,
  sha: string,
  message: string
}

export type File = {
  changes: number,
  filename: string,
  patch: string
}

export type Parent = {
  sha: string
}