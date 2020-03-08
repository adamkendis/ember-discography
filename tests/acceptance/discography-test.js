import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | discography', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('.index-container').hasText('Recently added songs:');

    await click('.nav-artists');
    assert.equal(currentURL(), '/artists');

    await click('.nav-albums');
    assert.equal(currentURL(), '/albums');

    await click('.nav-songs');
    assert.equal(currentURL(), '/songs');
  });
});
