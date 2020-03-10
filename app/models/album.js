import Model, { attr, belongsTo, hasMany} from '@ember-data/model';

export default class AlbumModel extends Model {
  @attr title;
  @attr releaseDate;
  @belongsTo('artist') artist;
  @hasMany('song') songs;
}
