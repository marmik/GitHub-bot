import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import { randomInt } from 'crypto';

const FILE_PATH = './data.json';

const makeCommit = async n => {
  if (n === 0) {
    await simpleGit().push();
    return;
  }

  // Generate a random date between December 7, 2023, and the current date
  const startDate = moment('2023-12-07', 'YYYY-MM-DD');
  const endDate = moment();
  const randomDate = moment(startDate).add(randomInt(0, endDate.diff(startDate, 'days')), 'days');

  const DATE = randomDate.format('YYYY-MM-DD');

  const data = {
    date: DATE
  };

  console.log(DATE);
  await jsonfile.writeFile(FILE_PATH, data);

  await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });
  await makeCommit(n - 1);
};

makeCommit(1000);
