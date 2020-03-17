import { formatDateYearFirst } from 'ember-discography/helpers/format-date-year-first';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | format-date-year-first', function(hooks) {
  setupTest(hooks);

  test('it formats date string to adhere to html date input requirement', function(assert) {
    let result = formatDateYearFirst('01/01/1900');
    assert.equal(result, '1900-01-01');
  });
});
