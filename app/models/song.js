import Model, { attr, belongsTo } from '@ember-data/model';

export default class SongModel extends Model {
  @attr title;
  // Length of song in seconds. This will make it easy to compute album length.
  @attr length;
  @belongsTo('album') album;
  @belongsTo('artist') artist;
}
