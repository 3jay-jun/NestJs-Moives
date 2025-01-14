import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOen(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} Not Found`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOen(id);
    this.movies = this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  update(id: number, updateData: updateMovieDto){
    const movie = this.getOen(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
