import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-menu',
  template: `
    <p-card header="Quiz game" (click)="router.navigate(['/menu-game-pair'])">
      <p class="m-0">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta dolore
        praesentium laborum tempora, numquam omnis cupiditate ducimus accusamus,
        illo quibusdam, expedita odit consequatur aperiam. Architecto eligendi
        blanditiis accusamus numquam officiis.
      </p>
    </p-card>
  `,
})
export class AppMenuComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    public router: Router,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {}
}
