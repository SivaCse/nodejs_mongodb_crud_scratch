import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/todos';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getTodos(order = 'asc', pageNum = 1) {
    return this.http.get(`${URL}/${order}/${pageNum}`);
  }

  getTotal() {
    return this.http.get(`${URL}/count`);
  }

  createTodo(todo) {
    return this.http.post(URL, todo);
  }

  updateTodo(todo) {
    return this.http.put(`${URL}/${todo._id}`, todo);
  }

  deleteTodo(id) {
    return this.http.delete(`${URL}/${id}`);
  }

}
