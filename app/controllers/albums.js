import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AlbumsController extends Controller {

  @action
  delete(e) {
    let id = e.target.value;
    let album = this.store.peekRecord('album', id);
    let songs = album.hasMany('songs').value().toArray();
    album.destroyRecord()
      .then(() => {
        songs.forEach((song) => {
          this.store.unloadRecord(song);
        });
      });
  }

  @action
  update(id, title) {
    this.store.findRecord('album', id)
      .then(album => {
        album.title = title;
        album.save() })
      .catch(err => {
        alert(err);
      })
  }
}
