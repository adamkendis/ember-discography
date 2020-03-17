import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  templateName = 'artists';

  async model() {
    return this.store.findAll('artist', { include: 'albums' });
  }
}
