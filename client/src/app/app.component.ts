import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: any = [];
  selectedTodoId: any = null;
  todo: any;
  message: any;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.todos = this.appService.getTodos();
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      const formData = { title: event.target.value, _id: this.selectedTodoId };
      if (this.selectedTodoId) {
        this.appService.updateTodo(formData)
          .subscribe(this.resetTodoInput);
        return;
      }
      this.appService.createTodo(formData)
        .subscribe(this.resetTodoInput);
    }
  }

  updateTodo({ title, _id }) {
    this.todo = title;
    this.selectedTodoId = _id;
  }

  deleteTodo({ _id }) {
    this.appService.deleteTodo(_id)
      .subscribe(this.resetTodoInput);
  }

  toggleMessage(message) {
    setTimeout(() => {
      this.message = message;
    }, 2000);
  }

  resetTodoInput = () => {
    this.todo = '';
    this.selectedTodoId = null;
    this.todos = this.appService.getTodos();
  }
}
