/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GamePairComponent } from './game-pair.component';

describe('GamePairComponent', () => {
  let component: GamePairComponent;
  let fixture: ComponentFixture<GamePairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
