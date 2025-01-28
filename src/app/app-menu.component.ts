import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';

// routerLink="/backoffice/lot-result"
// [queryParams]="{ lotId: lot.id }"

@Component({
  selector: 'app-menu',
  template: `<div class="text-center">
      <div class="mx-auto font-medium text-4xl mb-4 text-gray-700">
        Select one option
      </div>
    </div>
    <p-divider></p-divider>
    <div class="grid grid-cols-1 gap-3">
      <p-button
        *ngFor="let item of options"
        class="flex flex-col gap-2"
        [label]="item.label"
        [raised]="true"
        severity="secondary"
        routerLink="/game-pair"
        [queryParams]="{ option: item.label }"
      />
    </div>
    <p-divider></p-divider>
    <div class="grid grid-cols-1">
      <p-fileupload
        class="flex flex-col gap-2"
        mode="basic"
        chooseIcon="pi pi-upload"
        accept=".csv"
        maxFileSize="4000000"
        (onSelect)="onSelectFile($event)"
        [auto]="true"
        chooseLabel="Browse"
      />
    </div> `,
})
export class AppMenuComponent implements OnInit {
  constructor(private messageService: MessageService, private router: Router) {}

  onSelectFile(event: FileSelectEvent) {
    if (event.files.length > 0) {
      let file = event.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = reader.result as string;
        localStorage.setItem(
          'csvData',
          JSON.stringify({
            data: csvContent,
          })
        );
        this.router.navigate(['/game-pair']);
        this.messageService.add({
          severity: 'success',
          summary: 'File selected',
          detail: file.name,
        });
      };
      reader.readAsText(file);
    }
  }

  csvData: [string, string, string][] = [];

  options: { label: string; value: string }[] = [
    { label: 'English new words learned - Common words 1.csv', value: '1' },
    { label: 'English new words learned - Common words 2.csv', value: '1' },
    {
      label: 'English new words learned - Palabras más escritas en inglés.csv',
      value: '1',
    },
    {
      label: 'English new words learned - Palabras más habladas en inglés.csv',
      value: '1',
    },
  ];

  onClick(value: { label: string; value: string }) {
    console.log('Clicked: ' + value);
  }

  ngOnInit(): void {}
}
