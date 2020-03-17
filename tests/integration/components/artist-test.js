import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | artist', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders an artist', async function(assert) {
    assert.expect(3);
    let serverArtist = this.server.create('artist', 'withTwoAlbums', { name: 'John Doe' });
    let dummyFunc = () => null;
    let store = this.owner.lookup('service:store');
    let artist = await store.findRecord('artist', serverArtist.id);
    this.set('artist', artist);
    this.set('dummyFunc', dummyFunc)

    await render(hbs`
      <Artist 
        @artist={{artist}}
        @update={{dummyFunc}}
        @delete={{dummyFunc}}
      />`);

    assert.dom('img').hasAttribute('src', artist.image);
    assert.dom('.artist-name').includesText('John Doe');
    assert.dom('.albums-count').includesText('Albums saved: 2');
  });

  test('it displays albums on albums-count click', async function(assert) {
    assert.expect(3)
    let serverArtist = this.server.create('artist', 'withRandomAlbums');
    let dummyFunc = () => null;
    let store = this.owner.lookup('service:store');
    let artist = await store.findRecord('artist', serverArtist.id);
    this.set('artist', artist);
    this.set('dummyFunc', dummyFunc)
    
    await render(hbs`
      <Artist 
        @artist={{artist}}
        @update={{dummyFunc}}
        @delete={{dummyFunc}}
      />`);
    
    assert.dom('.album').exists({ count: artist.albums.length });
    assert.dom('.albums').hasStyle({ display: 'none' });

    await click('.albums-count');
    assert.dom('.albums').hasStyle({ display: 'block' })
  });
});
