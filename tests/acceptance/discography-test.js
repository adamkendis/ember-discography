import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | discography', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function(assert) {
    this.server.createList('artist', 4)

    await visit('/');
    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('.index-container').includesText('Recently added songs:');

    await click('.nav-artists');
    assert.equal(currentURL(), '/artists');
    assert.dom('.artist').exists({ count: 4 });

    await click('.nav-albums');
    assert.equal(currentURL(), '/albums');

    await click('.nav-songs');
    assert.equal(currentURL(), '/songs');
  });
});
