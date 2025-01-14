import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, Req, Res
} from "@nestjs/common";
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entity";

@Controller('movies')
export class MoviesController {
  constructor(readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query() map) {
    return `search data = ${map.year}`;
  }
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.movieService.getOen(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.movieService.deleteOne(id);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: updateMovieDto) {

    return this.movieService.update(movieId, updateData);
  }
}
