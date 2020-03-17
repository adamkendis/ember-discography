import { Factory, association, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() {
    return faker.random.words(faker.random.number({min: 1, max: 3}));
  },
  releaseDate() {
    return faker.date.past(60).toLocaleDateString();
  },
  artist: association(),
  withTenSongs: trait({
    afterCreate(album, server) {
      server.createList(
        'song', 
        10, 
        { album }
      )
    }
  }),
});
