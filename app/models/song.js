import Model, { attr, belongsTo } from '@ember-data/model';

export default class SongModel extends Model {
  @attr('string') title;
  // Length of song in seconds.
  @attr('number') length;
  @belongsTo('artist') artist;
  @belongsTo('album') album;
}
