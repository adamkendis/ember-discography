import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ArtistsRoute extends Route {
  @service store;

  async model() {
    return RSVP.hash({
      artists: this.store.findAll('artist'),
      albums: this.store.findAll('album'),
      songs: this.store.findAll('song'),
    });
  }

  // setupController(controller, model) {
  //   super.setupController(controller, model);
  //   controller.set('artists', model.artists);
  //   controller.set('songs')


  // }
}