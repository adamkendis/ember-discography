import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | time string', function(hooks) {
  setupTest(hooks);

  test('it deserializes valid length in seconds', function(assert) {
    let transform = this.owner.lookup('transform:time-string');
    let result = transform.deserialize(125);
    assert.equal(result, '2:05');
  });

  test('it serializes valid timestring', function(assert) {
    let transform = this.owner.lookup('transform:time-string');
    let result = transform.serialize('4:15');
    assert.equal(result, 255);
  })
});
