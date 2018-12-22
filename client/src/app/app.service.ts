import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get('http://localhost:3000/todos');
  }

  createTodo(todo) {
    return this.http.post('http://localhost:3000/todos', todo);
  }

  updateTodo(todo) {
    return this.http.put(`http://localhost:3000/todos/${todo._id}`, todo);
  }

  deleteTodo(id) {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }

}
