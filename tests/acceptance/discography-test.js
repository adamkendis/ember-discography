import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | discography', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.createList('artist', 4, 'withTwoAlbums');
  });

  test('visiting all routes', async function(assert) {

    await visit('/');
    // Index route redirects to /artists in beforeModel hook.
    assert.equal(currentURL(), '/artists');
    assert.dom('nav').exists();
    assert.dom('.artist').exists({ count: 4 });

    // Navigate to /artists via header link
    await click('.nav-artists');
    assert.equal(currentURL(), '/artists');
    assert.dom('.artist').exists({ count: 4 });

    // Navigate to albums
    await click('.nav-albums');
    assert.equal(currentURL(), '/albums');
    assert.dom('.album').exists({ count: 8 });
  });

  test('should delete and edit an artist details', async function(assert) {
    let store = this.owner.lookup('service:store');

    await visit('/artists');
    assert.dom('.artist').exists({ count: 4 });
    
    // Delete first artist
    await click(find('.delete'))
    assert.dom('.artist').exists({ count: 3 });

    // Confirm second artist's name
    let artist = await store.findRecord('artist', 2);
    assert.equal(find('.name').textContent, artist.name);

    // Edit artist name
    await click(find('.edit'));
    fillIn('.new-name', 'New Artist Name');
    await click(find('.save'));
    assert.equal(find('.name').textContent, 'New Artist Name');
    assert.equal(artist.name, 'New Artist Name');

    // Edit artist image url
    await click(find('.edit'));
    let fakeUrl = 'http://fakeimageurl.com';
    fillIn('.image-url', fakeUrl);
    await click(find('.save'));
    assert.dom(find('img')).hasAttribute('src', fakeUrl);
    assert.equal(artist.image, fakeUrl);
  });

  test('should delete and edit an album details', async function(assert) {
    let store = this.owner.lookup('service:store');

    await visit('/albums');
    assert.dom('.album').exists({ count: 8 });

    // Delete first album
    await click(find('.delete'));
    assert.dom('.album').exists({ count: 7 });

    let album = await store.findRecord('album', 2);
    assert.equal(find('.title').textContent, album.title);

    // Edit album title
    await click(find('.edit'));
    fillIn('.new-title', 'New Album Title');
    await click(find('.save'));
    assert.equal(find('.title').textContent, 'New Album Title');
    assert.equal(album.title, 'New Album Title');

    // Edit album release date
    await click(find('.edit'));
    fillIn('.release-date', '1900-01-01');
    await click(find('.save'));
    assert.equal(find('.release-date').textContent, 'Released: 01/01/1900');
    assert.equal(album.releaseDate, '01/01/1900');
  });

  test('should filter artists by name query', async function(assert) {
    let store = this.owner.lookup('service:store');
    await visit('/artists');
    let artist = await store.findRecord('artist', 3);

    // All artists are rendered
    assert.dom('.artist').exists({ count: 4 });

    // Only one artist is rendered after filtering by artist's first name
    await fillIn('.filter-input', artist.name.split(' ')[0]);
    assert.dom('.artist').exists({ count: 1 });
    assert.dom('.artist').includesText(artist.name);

    // All artists render after clearing filter query
    await fillIn('.filter-input', '');
    assert.dom('.artist').exists({ count: 4 });
  });

  test('should filter albums by title query', async function(assert) {
    let store = this.owner.lookup('service:store');
    await visit('/albums');
    let album = await store.findRecord('album', 1);

    // All albums are rendered
    assert.dom('.album').exists({ count: 8 });

    // Only first album is rendered after filter query
    await fillIn('.filter-input', album.title);
    assert.dom('.album').exists({ count: 1 });
    assert.dom('.title').hasText(album.title);

    // All albums are rendered after clearing filter query
    await fillIn('.filter-input', '');
    assert.dom('.album').exists({ count: 8 });
  });

  test('should update artist details after deleting albums', async function(assert) {
    await visit('/artists');
    assert.equal(find('.count').textContent, 'Albums saved: 2');

    await visit('/albums');
    assert.dom('.album').exists({ count: 8 });
    await click(find('.delete'));
    await click(find('.delete'));
    assert.dom('.album').exists({ count: 6 });

    await visit ('/artists');
    assert.equal(find('.count').textContent, 'Albums saved: 0');
  });

  test('should delete albums when artist is deleteed', async function(assert) {
    await visit('/artists');
    assert.dom('.artist').exists({ count: 4 });

    await visit('/albums');
    assert.dom('.album').exists({ count: 8 });

    await visit('/artists');
    await click(find('.delete'));
    assert.dom('.artist').exists({ count: 3 });

    await visit('/albums');
    assert.dom('.album').exists({ count: 6 });
  });

  test('should create new artist, album, song', async function(assert) {
    await visit ('/artists');
    assert.dom('.artist').exists({ count: 4 });

    await visit('/new');
    await fillIn('.select-artist', 'new');
    assert.dom('#new-artist-name').exists()

    fillIn('#new-artist-name', 'John Doe');
    await click('.new-save');

    await fillIn('.select-album', 'new');
    assert.dom('#new-album-title').exists();    

    fillIn('#new-album-title', 'New Album One');
    fillIn('#release-date', '1900-01-01');

    await click('.new-save');

    fillIn('#song-title', 'New Song Title One');
    fillIn('#song-mins', 2);
    fillIn('#song-secs', 35);

    await click('.new-save');

    assert.equal(currentURL(), '/artists');
    assert.dom('.artist').exists({ count: 5 });

    let names = findAll('.name');
    let counts = findAll('.count')
    let newName = names[names.length - 1].textContent;
    let newCount = counts[counts.length - 1].textContent;
    assert.equal(newName, 'John Doe')
    assert.equal(newCount, 'Albums saved: 1');
  });

});
