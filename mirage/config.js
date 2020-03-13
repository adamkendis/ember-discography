export default function() {

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    
    this.get('/artists');
    this.get('/artists/:id');
    this.get('/albums');
    this.get('/albums/:id');
    this.get('/songs');
    this.post('/songs/');
    this.put('/songs/:id');
    this.del('/songs/:id');
    this.del('/albums/:id');
    this.get('/new');

}
