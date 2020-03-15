import Model, { attr, hasMany } from '@ember-data/model';

export default class ArtistModel extends Model {
  @attr('string') name;
  @attr('string') image;
  @hasMany('album', { async: true }) albums;
  @hasMany('song') songs;
}
