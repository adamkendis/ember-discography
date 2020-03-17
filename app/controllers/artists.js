import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ArtistController extends Controller {

  @action
  deleteArtist(e) {
    let id = e.target.value;
    let artist = this.store.peekRecord('artist', id);
    let albums =  artist.hasMany('albums').value();
    let songs = artist.hasMany('songs').value();
    artist.destroyRecord()
      .then(() => {
        if (albums) {
          albums.toArray().forEach((album) => {
            this.store.unloadRecord(album);
          });
        }
        if (songs) {
          songs.toArray().forEach((song) => {
            this.store.unloadRecord(song);
          });
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  @action
  update(id, name, image) {
    this.store.findRecord('artist', id)
      .then(artist => {
        artist.name = name;
        artist.image = image;
        artist.save() })
      .catch((err) => {
        alert(err);
      })
  }
}
