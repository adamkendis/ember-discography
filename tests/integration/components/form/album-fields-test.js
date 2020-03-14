import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | form/album-fields', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders all passed albums as options', async function(assert) {
    this.server.createList('album', 7);
    const dummyEventHandler = () => {};
    let store = this.owner.lookup('service:store');
    let albums = await store.findAll('album');
    this.set('albums', albums);
    this.set('handleChange', dummyEventHandler)

    await render(hbs`<Form::AlbumFields @albums={{albums}} @handleChange={{handleChange}}/>`);

    // Includes two always-present options: "Select artist", "New Artist"
    assert.dom('option').exists({ count: 9 });
  });
});
