import { Component } from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WordQuizGame';
  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add(
      {
        severity: 'info', summary: 'Info', detail: 'Message Content', life: 4000});
  }
}
