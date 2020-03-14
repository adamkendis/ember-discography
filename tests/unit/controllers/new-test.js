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
    assert.expect(2)
    let controller = this.owner.lookup('controller:new');
    controller.set('artistProps', { id: undefined });
    assert.equal(controller.currentStep, 'artist');
    controller.send('stepForm');
    assert.equal(controller.currentStep, 'artist');
  });

  test('it displays an error if form field is incomplete', function(assert) {
    assert.expect(3);
    let controller = this.owner.lookup('controller:new');
    controller.set('artistProps', { id: undefined });
    assert.equal(controller.errors, undefined);
    controller.send('stepForm');
    assert.equal(controller.errors.length, 1);
    assert.equal(controller.errors[0], 'Please make a selection');
  });

  test('formatDateString helper properly reformats date string', function(assert) {
    assert.expect(1);
    let controller = this.owner.lookup('controller:new');
    let releaseDate = '1999-12-22'
    let formattedDate = controller.formatDateString(releaseDate);
    assert.equal(formattedDate, '12/22/1999')
  })
});
