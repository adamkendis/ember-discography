import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AlbumComponent extends Component {
  @tracked showSongs = false;
  @tracked editing = false;
  @tracked newTitle = this.args.album.title;

  @action 
  toggleSongs() {
    this.showSongs = !this.showSongs;
  }

  @action
  toggleEditing() {
    this.editing = !this.editing;
  }

  @action 
  updateTitle() {
    let { album, update } = this.args;
    this.editing = true;
    update(album.id, this.newTitle);
    this.editing = false;
  }
}
