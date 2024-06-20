import {
  CreateTodoRequest,
  RemoveTodoRequest,
  UpdateTodoRequest,
} from '@app/generated-models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoRequest) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne({ id: +id });
  }

  @Patch()
  update(@Body() request: UpdateTodoRequest) {
    return this.todosService.update(request);
  }

  @Delete()
  remove(@Body() request: RemoveTodoRequest) {
    return this.todosService.remove(request);
  }
}
