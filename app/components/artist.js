import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ArtistComponent extends Component {
  @tracked isHidden = true;
  @tracked editing = false;
  @tracked newName = this.args.artist.name;
  @tracked newImage = this.args.artist.image

  @action
  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  @action
  toggleEditing() {
    this.editing = !this.editing;
  }

  @action 
  updateArtist() {
    let { artist, update } = this.args;
    this.editing = true;
    update(artist.id, {
      name: this.newName,
      image: this.newImage,
    });
    this.editing = false;
  }
}
