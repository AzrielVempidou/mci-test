import { Express } from 'express';
import { FilterDTO, TodoDTO } from './todo.interface';
import { readData, writeData } from '../../data';
import { shortUUIDGenerator } from '../../utils/ShortUUIDGenerator';
import { Todo } from '../../interfaces/Todo';

export default class TodoService {
  constructor(
    private app: Express,
  ) {}

  create(dto: TodoDTO) {
    // implement
    const data = readData();
    const id = shortUUIDGenerator();
    let newTodo = { id, ...dto, deletedAt: null}
    data.push(newTodo);
    writeData(data);

  }

  update(id: string, dto: TodoDTO) {
    // implement
    const data = readData();
    const index = data.findIndex(todo => todo.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...dto};
      writeData(data);
      return data[index]
    }
    throw new Error('Todo Not Found')
  }

  get(id: string) {
    // implement
    const data = readData();
    const todo = data.find(todo =>  todo.id === id);
    if (todo) {
      return todo
    }
    throw new Error('Todo Not Found');
  }
  
  getAll(filter: FilterDTO) {
    const data = readData();
    // implement filter
    let filteredData = data;
    if (filter.active !== undefined) {
      if (filter.active) {
        filteredData = data .filter(todo => todo.deletedAt === null);
      } else {
        filteredData = data .filter(todo => todo.deletedAt !== null);
      }
    }
    return filteredData;
  }

  hardDelete(id: string) {
    // implement
    const data = readData();
    const newData = data.find(todo =>  todo.id !== id);
    if (Array.isArray(newData) && newData.length > 0) {
      writeData(newData);
      return true
    } else {
    throw new Error('Todo Not Found');
    }
  }

  softDelete(id: string) {
    // implement
    const data = readData();
    const index = data.findIndex(todo => todo.id === id);
    if (index !== -1) {
      data[index].deletedAt = new Date();
      writeData(data)
    }
  }
}