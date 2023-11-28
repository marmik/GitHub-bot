const { Octokit } = require('@octokit/rest');
const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const github = new Octokit({
  // Replace with your GitHub personal access token
  auth: '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'
});

const makeCommit = async n => {
  if (n === 0) {
    await simpleGit().push();
    // Create a pull request
    await github.pulls.create({
      owner: 'marmik',
      repo: 'GitHub-bot',
      head: 'master', // Replace with the actual source branch
      base: 'develop', // Replace with the actual target branch
      title: 'Random commit for GitHub contribution graph',
      body: 'This commit was generated randomly to contribute to the GitHub contribution graph.'
    });
  }

  const x = getRandomInt(0, 54);
  const y = getRandomInt(0, 6);
  const DATE = moment()
    .subtract(1, 'y')
    .add(1, 'd')
    .add(x, 'w')
    .add(y, 'd')
    .format();

  const data = {
    date: DATE
  };

  console.log(DATE);
  await jsonfile.writeFile(FILE_PATH, data);

  await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, n - 1));
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

makeCommit(5);
