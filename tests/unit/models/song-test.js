import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object'

module('Unit | Model | song', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('song should have relationship with artist', function(assert) {
    const Song = this.owner.lookup('service:store').modelFor('song');
    const relationship = get(Song, 'relationshipsByName').get('artist');

    assert.equal(relationship.key, 'artist');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('song should have relationship with album', function(assert) {
    const Song = this.owner.lookup('service:store').modelFor('song');
    const relationship = get(Song, 'relationshipsByName').get('album');

    assert.equal(relationship.key, 'album');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });
});
