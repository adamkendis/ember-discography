import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name () {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  },
  image () {
    return faker.image.avatar();
  },

  withAlbums: trait({
    afterCreate(artist, server) {
      server.createList(
        'album', 
        faker.random.number({min: 1, max: 4}), 
        { artist }).forEach(album => {
          server.createList(
            'song',
            faker.random.number({min: 1, max: 15}),
            { artist, album }
          );
        });
    }
  }),
});
