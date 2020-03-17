export default function() {

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    
    this.resource('artists');
    this.resource('songs'); 
    this.resource('albums');

    // Delete album's songs on album delete to prevent orphaned records.
    this.del('/albums/:id', ({ albums }, request) => {
      let id = request.params.id;
      let album = albums.find(id);
      album.songs.destroy();
      album.destroy();
    });

    // Delete artist's albums and songs on artist delete.
    this.del('/artists/:id', ({ artists }, request) => {
      let id = request.params.id;
      let artist = artists.find(id);
      artist.albums.destroy();
      artist.songs.destroy();
    })
}
