import Model, { attr, hasMany } from '@ember-data/model';

export default class ArtistModel extends Model {
  @attr name;
  @attr('string') image;
  @hasMany('album') albums;
  @hasMany('song') songs;
}
