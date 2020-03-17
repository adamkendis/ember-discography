import { formatDateYearLast } from 'ember-discography/helpers/format-date-year-last';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | format-date-year-last', function(hooks) {
  setupTest(hooks);

  test('it formats html date input into MM/DD/YYYY', function(assert) {
    let result = formatDateYearLast('2020-12-10');
    assert.equal(result, '12/10/2020');
  });
});
