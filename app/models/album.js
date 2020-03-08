import Model, { attr, belongsTo, hasMany} from '@ember-data/model';

export default class AlbumModel extends Model {
  @attr('string') title;
  @attr('date') releaseDate;
  @belongsTo('artist') artist;
  @hasMany('song') songs;
}
