import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | album', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders an album', async function(assert) {
    assert.expect(3);
    let artist = this.server.create('artist');
    let dummyFunc = () => null;
    let serverAlbum = this.server.create('album', 'withTenSongs');
    serverAlbum.artist = artist;
    let store = this.owner.lookup('service:store');
    let album = await store.findRecord('album', serverAlbum.id);
    this.set('album', album);
    this.set('dummyFunc', dummyFunc)

    await render(hbs`
      <Album 
        @update={{dummyFunc}} 
        @delete={{dummyFunc}} 
        @album={{album}}
      />`);

    assert.dom('.title').includesText(album.title);
    assert.dom('.release-date').includesText(album.releaseDate);
    assert.dom('.song-count').includesText('10 songs')
  });
});
