import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the ErrorMessages component', async function(assert) {
    assert.expect(1);
    await render(hbs`<Form />`);
    assert.dom('.form-errors').exists();
  });
});
