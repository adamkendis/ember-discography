import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NewController extends Controller {
  @tracked currentStep = 'artist';
  @tracked albumSet;
  @tracked songTitle;
  @tracked songLength;

  @action
  stepForm(e) {
    e.preventDefault();
    switch(this.currentStep) {
      case 'artist':
        if (this.artistProps.id === 'new') {
          let newArtist = this.store.createRecord('artist', { 
            name: this.artistProps.name,
            image: this.artistProps.imageUrl,
          });
          newArtist
            .save()
            .then(artist => {
            this.artist = artist })
            .catch(err => {
              alert(err.message);
            });
        } else {
          this.artist = this.store.peekRecord('artist', this.artistProps.id);
        }
        this.currentStep = 'album';
        break;
      case 'album':
        if (this.albumProps.id ==='new') {
          let newAlbum = this.store.createRecord('album', {
            artist: this.artist,
            title: this.albumProps.title,
            releaseDate: this.albumProps.releaseDate,
          });
          newAlbum
            .save()
            .then(album => {
              this.album = album})
            .catch(err => {
              alert(err.message);
            });
        } else {
          this.album = this.store.peekRecord('album', this.albumProps.id);
        }
        this.currentStep = 'song';
        break;
      case 'song': {
        let newSong = this.store.createRecord('song', {
          artist: this.artist, 
          album: this.album,
          title: this.songProps.title,
          length: parseInt(this.songProps.minutes * 60) + parseInt(this.songProps.seconds),
        })
        newSong
          .save()
          .catch(err => {
            alert(err.message)
          });
      }
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
    this.albumProps.title = undefined;
    this.albumProps.releaseDate = undefined;
  }
}
