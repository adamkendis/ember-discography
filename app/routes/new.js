import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

class ArtistProps {
  @tracked id;
  @tracked name;
  @tracked imageUrl;
}

class AlbumProps {
  @tracked id;
  @tracked title;
  @tracked releaseDate;
}

class SongProps {
  @tracked title;
  @tracked minutes;
  @tracked seconds;
}

export default class ArtistsRoute extends Route {
  @service store;

  async model() {
    return RSVP.hash({
      artists: this.store.findAll('artist'),
      albums: this.store.findAll('album'),
      songs: this.store.findAll('song'),
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('artistProps', new ArtistProps());
    controller.set('albumProps', new AlbumProps());
    controller.set('songProps', new SongProps());
    controller.set('currentStep', 'artist');
  }
}