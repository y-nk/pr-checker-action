const core = require('@actions/core')
const github = require('@actions/github')

const title =
  github.context.payload &&
  github.context.payload.pull_request &&
  github.context.payload.pull_request.title

const labels =
  github.context.payload &&
  github.context.payload.pull_request &&
  github.context.payload.pull_request.labels &&
  github.context.payload.pull_request.labels.map(({ name }) => name)

const regexp =
  core.getInput('regexp') ||
  '^(milestone|break|feat|fix|hotfix|chore|misc|ci|docs|revert)(\\(\\w+\\))?!?:\\s([A-Z]{1,5}-[0-9]{1,}\\s).+'

const message =
  core.getInput('message') || 'PR title does not follow team guidelines.'

const skip_on = core.getInput('skip_on')

if (skip_on && labels.indexOf(skip_on) !== -1) return

if (!new RegExp(regexp, 'i').test(title)) {
  core.setFailed(message)
}
