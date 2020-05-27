const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/action')

async function run() {
  try {
    const octokit = new Octokit()
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
    const pull_number = github.context.payload.pull_request.number

    const filesResponse = await octokit.request(
      'GET /repos/:owner/:repo/pulls/:pull_number/files',
      {
        owner,
        repo,
        pull_number,
      }
    )

    const possiblePostFiles = filesResponse.data.filter(
      (file) =>
        file.filename.contains('content/posts/') &&
        file.filename.endsWith('index.md')
    )

    if (possiblePostFiles.length === 0) {
      console.info('No posts found. Skipping')
      return
    }

    if (possiblePostFiles.length > 1) {
      core.setFailed("You're supposed to send only 1 post per pull request.")
      return
    }

    const fileResponse = await octokit.request(possiblePostFiles[0].raw_url)
    const content = fileResponse.data
    const metadata = {
      title: '',
      author: '',
      date: '',
    }

    const body = content

    console.info('Blog post found:', body)

    core.setOutput('title', metadata.title)
    core.setOutput('author', metadata.author)
    core.setOutput('date', metadata.date)
    core.setOutput('body', content)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
