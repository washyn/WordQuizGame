import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    RadioButtonModule,
    TableModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    CardModule,
    AvatarModule,
    ConfirmDialogModule,
    FieldsetModule,
    FileUploadModule,
    PasswordModule,
    TagModule,
    ToastModule,

    StyleClassModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    RadioButtonModule,
    TableModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    CardModule,
    AvatarModule,
    ConfirmDialogModule,
    FieldsetModule,
    FileUploadModule,
    PasswordModule,
    TagModule,
    ToastModule,

    StyleClassModule,
  ],
})
export class PrimeSharedModule{}
