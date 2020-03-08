import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';

module('Unit | Model | album', function(hooks) {
  setupTest(hooks);

  test('it has relationship with artist', function(assert) {
    const Album = this.owner.lookup('service:store').modelFor('album');
    const relationship = get(Album, 'relationshipsByName').get('artist');

    assert.equal(relationship.key, 'artist');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'relationship is belongsTo'
    );
  });

  test('it has relationship with songs', function(assert) {
    const Album = this.owner.lookup('service:store').modelFor('album');
    const relationship = get(Album, 'relationshipsByName').get('songs');

    assert.equal(relationship.key, 'songs');
    assert.equal(
      relationship.kind,
      'hasMany',
      'relationship is hasMany'
    );
  });
});
