import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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

export default class NewController extends Controller {
  artistProps = new ArtistProps();
  albumProps = new AlbumProps();
  @tracked currentStep = 'artist';
  @tracked albumSet;

  // @tracked songId;
  // songTitle;
  // songLength;

  @action
  stepFormForward(e) {
    e.preventDefault();
    switch(this.currentStep) {
      case 'artist':
        this.currentStep = 'album';
        break;
      case 'album':
        this.currentStep = 'song';
        break;
    }
  }

  @action
  selectArtist(event) {
    this.artistProps.id = event.target.value;
    this.artistProps.name = undefined;
    this.artistProps.imageUrl = undefined;
    if (this.artistProps.id !== 'new') {
      this.albumSet = this.get('model.artists').findBy('id', this.artistProps.id).get('albums');
    }
  }

  @action
  selectAlbum(event) {
    this.albumProps.id = event.target.value;
    this.albumProps.name = '';
  }

  @action
  selectSong(event) {
    this.songId = event.target.value;
    this.songTitle = '';
  }

  @action
  createAlbum() {

  }

  @action
  createArtist() {

  }

  @action
  createSong() {

  }

}
