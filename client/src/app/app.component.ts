import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: any = [];
  totalPages: any;
  selectedTodoId: any = null;
  todo: any;
  message: any;
  sortOrder: any = 'asc';
  currentPage = 1;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.toggleMessage('Fetching Todos...');
    this.todos = this.appService.getTodos(this.sortOrder, this.currentPage);
    this.appService.getTotal()
    .subscribe((data: any) => {
      this.totalPages = new Array(data.pages);
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      const formData = { title: event.target.value, _id: this.selectedTodoId };
      if (this.selectedTodoId) {
        this.appService.updateTodo(formData)
          .subscribe(() => this.resetTodoInput('Todo Updated Successfully'));
        return;
      }
      this.toggleMessage('Saving Todo...');
      this.appService.createTodo(formData)
        .subscribe(() => this.resetTodoInput('Todo Added Successfully'));
    }
  }

  updateTodo({ title, _id }) {
    this.todo = title;
    this.selectedTodoId = _id;
  }

  deleteTodo({ _id }) {
    this.toggleMessage('Deleting Todo...');
    this.appService.deleteTodo(_id)
      .subscribe(() => this.resetTodoInput('Todo Deleted Successfully'));
  }

  toggleMessage(message) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 1500);
  }

  sortBy(order) {
    this.sortOrder = order;
    this.todos = this.appService.getTodos(this.sortOrder);
  }

  pageTo(pageNum: any) {
    this.currentPage = pageNum;
    if ( pageNum === 'prev' ) {
      this.currentPage = 1;
    }
    if ( pageNum === 'next' ) {
      this.currentPage = this.totalPages.length;
    }
    this.fetchTodos();
  }

  resetTodoInput = (message) => {
    this.todo = '';
    this.selectedTodoId = null;
    this.fetchTodos();
    this.toggleMessage(message);
  }
}
