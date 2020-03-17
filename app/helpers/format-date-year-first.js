import { helper } from '@ember/component/helper';

export function formatDateYearFirst(date) {
  let dateArr = date.split('/');
  dateArr.unshift(dateArr.pop());
  for (let i = 1; i < dateArr.length; i++) {
    if (dateArr[i].length === 1) {
      dateArr[i] = `0${dateArr[i]}`;
    }
  }
  return dateArr.join('-');
}

export default helper(formatDateYearFirst);
