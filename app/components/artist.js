import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ArtistComponent extends Component {
  @tracked isHidden = true;

  @action
  toggleHidden() {
    this.isHidden = !this.isHidden;
  }
}
