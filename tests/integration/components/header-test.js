import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders five links', async function(assert) {
    assert.expect(1);
    await render(hbs`<Header />`);

    assert.dom('a').exists({ count: 4 });
  });
});
