import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | artist', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders an artist', async function(assert) {
    let serverArtist = this.server.create('artist', 'withTwoAlbums', { name: 'John Doe' });
    let store = this.owner.lookup('service:store');
    let artist = await store.findRecord('artist', serverArtist.id);
    this.set('artist', artist);

    await render(hbs`<Artist @artist={{artist}}/>`);

    assert.dom('img').hasAttribute('src', artist.image);
    assert.dom('.artist-name').includesText('John Doe');
    assert.dom('.albums-count').includesText('Albums saved: 2');
  });

  test('it displays albums on albums-count click', async function(assert) {
    let serverArtist = this.server.create('artist', 'withRandomAlbums');
    let store = this.owner.lookup('service:store');
    let artist = await store.findRecord('artist', serverArtist.id);
    this.set('artist', artist);
    
    await render(hbs`<Artist @artist={{artist}}/>`);
    
    assert.dom('.album').exists({ count: artist.albums.length });
    assert.dom('.albums').hasStyle({ display: 'none' });

    await click('.albums-count');
    assert.dom('.albums').hasStyle({ display: 'block' })
  });
});