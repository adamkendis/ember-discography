import Model, { attr, belongsTo } from '@ember-data/model';

export default class SongModel extends Model {
  @attr('string') title;
  // Length of song in seconds. This will make it easy to compute album length.
  @attr('timeString') length;
  @belongsTo('album') album;
  @belongsTo('artist') artist;
}
