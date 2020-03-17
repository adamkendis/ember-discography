import { helper } from '@ember/component/helper';

export function formatDateYearLast(date) {
  let dateArr = date.split('-');
  dateArr.push(dateArr.shift());
  return dateArr.join('/');
}

export default helper(formatDateYearLast);
