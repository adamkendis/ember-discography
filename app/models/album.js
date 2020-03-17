import Model, { attr, belongsTo, hasMany} from '@ember-data/model';

export default class AlbumModel extends Model {
  @attr('string') title;
  @attr releaseDate;
  @belongsTo('artist', { async: true }) artist;
  @hasMany('song') songs;
}
