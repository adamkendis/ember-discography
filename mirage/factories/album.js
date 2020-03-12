import { Factory, association } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() {
    return faker.random.words(faker.random.number({min: 1, max: 4}));
  },
  releaseDate() {
    return faker.date.past(60).toLocaleDateString();
  },
  artist: association(),
});
