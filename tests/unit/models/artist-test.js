import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';

module('Unit | Model | artist', function(hooks) {
  setupTest(hooks);
  
  test('artist should have related album(s)', function(assert) {
    const Artist = this.owner.lookup('service:store').modelFor('artist');
    const relationship = get(Artist, 'relationshipsByName').get('albums');

    assert.equal(relationship.key, 'albums', 'has relationship with artist');
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });

  test('artist should have related song(s)', function(assert) {
    const Artist = this.owner.lookup('service:store').modelFor('artist');
    const relationship = get(Artist, 'relationshipsByName').get('songs');

    assert.equal(relationship.key, 'songs', 'has relationship with artist');
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });
});
