import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class NewController extends Controller {
  // currentStep controls the current page of the form
  @tracked currentStep = 'artist';
  // Albums only relating to selected artist
  @tracked albumSet;
  @tracked errors;

  errorStates = {
    // Triggered if user steps form without selecting artist or album.
    noneSelected: false,
    // Triggered if user steps form without completing artist name,
    // album title, album release date, song title, song mins/secs
    incomplete: false,
  };

  errorMessages = {
    noneSelected: 'Please make a selection',
    incomplete: 'Please complete all required fields',
  };

  validateFields() {
    this.clearErrors();
    let errors = this.errorStates;
    switch(this.currentStep) {
      case 'artist': {
        let { id, name } = this.artistProps;
        // No artist is selected.
        if (!id) {
          errors.noneSelected = true;
        }
        // New Artist is selected but no name or empty string provided.
        if (id === 'new' && (!name || !name.trim())) {
          errors.incomplete = true;
        }
        break;
      }
      case 'album': {
        let { id, title, releaseDate } = this.albumProps;
        // No album is selected.
        if (!id) {
          errors.noneSelected = true;
        }
        // New Album is selected but no title, empty title string,
        // or incomplete release date provided.
        if (id === 'new' && ((!title || !title.trim()) || !releaseDate)) {
          errors.incomplete = true;
        }
        break;
      }
      case 'song': {
        let { title, minutes, seconds } = this.songProps;
        // No song title, minutes, or seconds provided.
        if ((!title || !title.trim()) || (!minutes || !seconds)) {
          errors.incomplete = true;
        }
        break;
      }
      default:
        break;
    }

    const validationErrors = Object.keys(this.errorMessages).reduce((errors, key) => {
      if (this.errorStates[key]) {
        errors.push(this.errorMessages[key])
      }
      return errors;
    }, [])
    this.errors = validationErrors;
  }

  clearErrors() {
    Object.keys(this.errorStates).forEach(key => {
      this.errorStates[key] = false;
    });
  }

  formatDateString(dateString) {
    // Html input type=date returns the date as "YYYY-MM-DD"
    // This function reformats the date string into "MM/DD/YYYY"
    let dateArr = dateString.split('-');
    dateArr.push(dateArr.shift());
    return dateArr.join('/');
  }

  @action
  cancel() {
    this.transitionToRoute('artists');
  }

  @action
  stepForm() {
    this.validateFields();

    if (!this.errors.length) {
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
            let formattedDateString = this.formatDateString(this.albumProps.releaseDate);
            let newAlbum = this.store.createRecord('album', {
              artist: this.artist,
              title: this.albumProps.title,
              releaseDate: formattedDateString,
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
            .then(() => {
              this.transitionToRoute('artists')
            })
            .catch(err => {
              alert(err.message)
            });
        }
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
