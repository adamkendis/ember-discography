import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { formatDateYearFirst } from '../helpers/format-date-year-first';
import { formatDateYearLast } from '../helpers/format-date-year-last';

export default class AlbumComponent extends Component {
  @tracked showSongs = false;
  @tracked editing = false;
  @tracked newTitle = this.args.album.title;
  @tracked newDate = formatDateYearFirst(this.args.album.releaseDate);

  @action 
  toggleSongs() {
    this.showSongs = !this.showSongs;
  }

  @action
  toggleEditing() {
    this.editing = !this.editing;
  }

  @action 
  updateAlbum() {
    let { album, update } = this.args;
    this.editing = true;
    let newReleaseDate = formatDateYearLast(this.newDate)
    update(album.id, this.newTitle, newReleaseDate);
    this.editing = false;
  }
}
