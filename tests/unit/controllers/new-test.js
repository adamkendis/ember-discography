import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Controller | new', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it steps to album form with artist selected', function(assert) {
    assert.expect(2);
    let controller = this.owner.lookup('controller:new');
    controller.set('artistProps', { id: 1 });
    assert.equal(controller.currentStep, 'artist');
    controller.send('stepForm');
    assert.equal(controller.currentStep, 'album');
  });

  test('it fails to step forward if no artist is selected', function(assert) {
    let controller = this.owner.lookup('controller:new');
    controller.set('artistProps', { id: undefined });
    assert.equal(controller.currentStep, 'artist');
    controller.send('stepForm');
    assert.equal(controller.currentStep, 'artist');
  });
});
