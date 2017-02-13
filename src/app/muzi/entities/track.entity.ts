export class Genre {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  edit_genre(new_name){
    this.name = new_name;
  }
}

export class Track {
  id: number;
  title: string;
  rating: string;
  genres: Genre [];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.genres = [];
  }

  add_single_genre(genre: Genre){
    this.genres.push(genre);
  }

  edit_genre(genres: Genre []){
    this.genres = genres;
  }
}
