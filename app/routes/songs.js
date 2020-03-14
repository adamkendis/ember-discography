import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SongsRoute extends Route {
  @service store;

  async model() {
    return this.get('store').findAll('song');
  }
}
