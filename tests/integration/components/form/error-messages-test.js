import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/error-messages', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders all passed errors', async function(assert) {
    const errorMessages = ['Please make a selection', 'Please complete all required fields'];
    this.set('errors', errorMessages);
    await render(hbs`<Form::ErrorMessages />`);
    assert.dom('.error').doesNotExist();

    await render(hbs`<Form::ErrorMessages @errors={{errors}} />`)
    assert.dom('.error').exists({ count: 2 });

    let errors = findAll('.error');
    assert.ok(errors.any(el => el.textContent.includes(errorMessages[0])));
    assert.ok(errors.any(el => el.textContent.includes(errorMessages[1])));
  });
});
