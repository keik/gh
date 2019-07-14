// @flow

module.exports = {
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
  setupFilesAfterEnv: ['./jest.setTimeout.js'],
  testEnvironment: 'node'
}
