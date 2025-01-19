import {Component} from "@angular/core";

@Component({
  selector: 'app-header',
  template:`
    <p-toolbar>
      <ng-template #start>
        <p-button
          label="label"
          size="small"
          class="mr-2"
          severity="secondary"
          variant="outlined"
        />
        <p-button
          label="label"
          size="small"
          class="mr-2"
          severity="secondary"
          variant="outlined"
        />
        <p-button
          icon="pi pi-plus"
          class="mr-2"
          severity="secondary"
          variant="outlined"
          size="small"
        />
        <p-button
          icon="pi pi-print"
          class="mr-2"
          severity="secondary"
          variant="outlined"
          size="small"
        />
        <p-button
          icon="pi pi-upload"
          severity="secondary"
          variant="outlined"
          size="small"
        />
      </ng-template>
      <ng-template #center>
        <p-iconfield iconPosition="left">
          <p-inputicon styleClass="pi pi-search" />
          <input type="text" pSize="small" pInputText placeholder="Search" />
        </p-iconfield>
      </ng-template>
      <ng-template #end>
        <!--      <p-splitbutton label="Save" [model]="items" />-->
      </ng-template>
    </p-toolbar>
  `
})
export class HeaderComponent {}
