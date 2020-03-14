import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | form/artist-fields', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    this.server.createList('artist', 5);
    const dummyEventHandler = () => {};
    let store = this.owner.lookup('service:store');
    let artists = await store.findAll('artist');
    this.set('artists', artists);
    this.set('handleChange', dummyEventHandler)

    await render(hbs`<Form::ArtistFields @artists={{artists}} @handleChange={{handleChange}}/>`);

    // Includes two static options: "Select artist", "New Artist"
    assert.dom('option').exists({ count: 7 });

  });
});
