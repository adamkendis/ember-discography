import { Factory, association } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() {
    return faker.random.words(
      faker.random.number({min: 1, max: 6})
    );
  },
  length() {
    // Value between 1-7 minutes (60-420 seconds)
    return faker.random.number({min: 60, max: 420})
  },
  album: association(),
});
