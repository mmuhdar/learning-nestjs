import { Controller, Get, Param } from '@nestjs/common';

@Controller('book')
export class BookController {
  @Get('/:name')
  getAllBooks(@Param('name') name: string) {
    return `Hello ${name}`;
  }
}
