import faker from 'faker';

export default function(server) {
  server.createList('artist', faker.random.number({min: 3, max: 7}), 'withRandomAlbums');
}
