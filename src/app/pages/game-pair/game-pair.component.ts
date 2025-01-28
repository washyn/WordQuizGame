import { Component, Injector, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ElementOption,
  ElementWord,
  GetDataStrategy,
} from '../../shared/interfaces';
import { LOAD_DATA_STRATEGY } from '../../shared/load-data-strategy';

@Component({
  selector: 'app-game-pair',
  templateUrl: './game-pair.component.html',
  styleUrls: ['./game-pair.component.css'],
})
export class GamePairComponent implements OnInit {
  titleGame: string = 'Word Quiz Game';
  @Input() option!: string;

  private loadDataStrategy!: GetDataStrategy;

  constructor(
    protected injector: Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  restartCurrentLevel() {
    this.resetCurrentGameState();
    this.displayAllButtons();
    this.resortElements();
  }
  nextQuestion() {
    this.initializeLevel();
  }
  resetCurrentGameState() {
    if (this.existsElementClickedLeft()) {
      let clickedPreviousElement = this.getElementClickedLeft();
      this.unmarkElement(clickedPreviousElement);
    }
    if (this.existsElementClickedRigth()) {
      let clickedPreviousElement = this.getElementClickedRigth();
      this.unmarkElement(clickedPreviousElement);
    }
  }

  checkFinishedLevel() {
    setTimeout(() => {
      let finished = this.finishedLevel();
      console.log('Finished: ' + finished);
      if (finished) {
        this.confirmationService.confirm({
          message: 'Are you sure you want to restart the game?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Yes',
          rejectLabel: 'No',
          accept: () => {
            this.initializeLevel();
          },
          reject: () => {
            console.log('Rejected');
          },
        });
      }
    }, 1000);
  }

  finishedLevel() {
    return !this.someElementIsVisible();
  }

  // some element is visible
  someElementIsVisible() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (elementButton.style.visibility !== 'hidden') {
        return true;
      }
    }
    elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (elementButton.style.visibility !== 'hidden') {
        return true;
      }
    }
    return false;
  }

  clickedElementA(element: ElementOption) {
    let existsClickedElementA = this.existsElementClickedLeft();
    if (existsClickedElementA) {
      let clickedPreviousElement = this.getElementClickedLeft();
      this.unmarkElement(clickedPreviousElement);
      this.markButtonAsClicked(element);
      // si hay un elemento en el otro lado, entonces obtenerlo y compararlo con este
      // en caso sean iguales, deparecerlos a ambos...
      let existsClickedElementB = this.existsElementClickedRigth();
      if (existsClickedElementB) {
        let clickedPreviousElementB = this.getElementClickedRigth();
        if (
          clickedPreviousElementB.getAttribute('associated') ===
          element.idAssociated.toString()
        ) {
          let currentElement = this.getElementClickedLeft();
          this.hideElement(currentElement);
          this.hideElement(clickedPreviousElementB);
          this.unmarkElement(currentElement);
          this.unmarkElement(clickedPreviousElementB);
          this.checkFinishedLevel();
        } else {
          let currentElement = this.getElementClickedLeft();
          this.markAsWrongSelectedElement(currentElement);
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    } else {
      this.markButtonAsClicked(element);
      // hacer la misma comparacion aqui...
      let existsClickedElementB = this.existsElementClickedRigth();
      if (existsClickedElementB) {
        let clickedPreviousElementB = this.getElementClickedRigth();
        if (
          clickedPreviousElementB.getAttribute('associated') ===
          element.idAssociated.toString()
        ) {
          let currentElement = this.getElementClickedLeft();
          this.hideElement(currentElement);
          this.hideElement(clickedPreviousElementB);
          this.unmarkElement(currentElement);
          this.unmarkElement(clickedPreviousElementB);
          this.checkFinishedLevel();
        } else {
          let currentElement = this.getElementClickedLeft();
          this.markAsWrongSelectedElement(currentElement);
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    }
  }

  clickedElementB(element: ElementOption) {
    let existsClickedElementB = this.existsElementClickedRigth();
    if (existsClickedElementB) {
      let clickedPreviousElement = this.getElementClickedRigth();
      this.unmarkElement(clickedPreviousElement);
      this.markButtonAsClicked(element);
      // si hay un elemento en el otro lado, entonces obtenerlo y compararlo con este
      // en caso sean iguales, deparecerlos a ambos...
      let existsClickedElementA = this.existsElementClickedLeft();
      if (existsClickedElementA) {
        let clickedPreviousElementA = this.getElementClickedLeft();
        if (
          clickedPreviousElementA.getAttribute('associated') ===
          element.idAssociated.toString()
        ) {
          let currentElement = this.getElementClickedRigth();
          this.hideElement(currentElement);
          this.hideElement(clickedPreviousElementA);
          this.unmarkElement(currentElement);
          this.unmarkElement(clickedPreviousElementA);
          this.checkFinishedLevel();
        } else {
          let currentElement = this.getElementClickedRigth();
          this.markAsWrongSelectedElement(currentElement);
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    } else {
      this.markButtonAsClicked(element);
      // hacer la misma comparacion aqui...
      let existsClickedElementA = this.existsElementClickedLeft();
      if (existsClickedElementA) {
        let clickedPreviousElementA = this.getElementClickedLeft();
        if (
          clickedPreviousElementA.getAttribute('associated') ===
          element.idAssociated.toString()
        ) {
          let currentElement = this.getElementClickedRigth();
          this.hideElement(currentElement);
          this.hideElement(clickedPreviousElementA);
          this.unmarkElement(currentElement);
          this.unmarkElement(clickedPreviousElementA);
          this.checkFinishedLevel();
        } else {
          let currentElement = this.getElementClickedRigth();
          this.markAsWrongSelectedElement(currentElement);
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    }
  }

  markButtonAsClicked(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      elementButton.classList.remove('p-button-secondary');
      elementButton.classList.add('p-button-primary');
      elementButton.setAttribute('isClicked', 'true');
    }
  }

  unmarkElement(element: HTMLElement) {
    element.classList.remove('p-button-primary');
    element.classList.remove('p-button-danger');
    element.classList.add('p-button-secondary');
    element.removeAttribute('isClicked');
  }

  markAsWrongSelectedElement(element: HTMLElement) {
    element.classList.remove('p-button-primary');
    element.classList.remove('p-button-secondary');
    element.classList.add('p-button-danger');
  }
  unmarkAsWrongSelectedElement(element: HTMLElement) {
    element.classList.remove('p-button-primary');
    element.classList.remove('p-button-danger');
    element.classList.add('p-button-secondary');
  }

  unmarkClickedButton(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      elementButton.classList.remove('p-button-primary');
      elementButton.classList.add('p-button-secondary');
      elementButton.removeAttribute('isClicked');
    }
  }

  elementIsClicked(element: HTMLElement) {
    return element.getAttribute('isClicked') === 'true';
  }

  buttonIsClicked(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      return elementButton.getAttribute('isClicked') === 'true';
    }
    throw new Error('elementButton is null');
  }

  getElementClicked() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = elements[i];
      elementButton.classList.remove('p-button-primary');
      elementButton.classList.add('p-button-secondary');
    }
    elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = elements[i];
      elementButton.classList.remove('p-button-primary');
      elementButton.classList.add('p-button-secondary');
    }
  }

  unmarkAllLeftButtons() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      this.unmarkElement(elementButton);
    }
  }

  unmarkAllRightButtons() {
    let elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      this.unmarkElement(elementButton);
    }
  }

  toggleButtonState(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      if (this.buttonIsClicked(element)) {
        this.unmarkClickedButton(element);
      } else {
        this.markButtonAsClicked(element);
      }
    }
  }

  hideElement(element: HTMLElement) {
    element.style.visibility = 'hidden';
  }

  displayAllButtons() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      elementButton.style.visibility = 'visible';
    }
    elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      elementButton.style.visibility = 'visible';
    }
  }

  resortElements() {
    this.element.elementsA.sort(() => Math.random() - 0.5);
    this.element.elementsB.sort(() => Math.random() - 0.5);
  }

  existsElementClickedLeft() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (this.elementIsClicked(elementButton)) {
        return true;
      }
    }
    return false;
  }

  existsElementClickedRigth() {
    let elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (this.elementIsClicked(elementButton)) {
        return true;
      }
    }
    return false;
  }

  getElementClickedLeft() {
    let elements = document.getElementsByClassName('leftButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (this.elementIsClicked(elementButton)) {
        return elementButton;
      }
    }
    throw new Error('elementButton is null');
  }
  getElementClickedRigth() {
    let elements = document.getElementsByClassName('rightButton');
    for (let i = 0; i < elements.length; i++) {
      let elementButton = <HTMLElement>elements[i];
      if (this.elementIsClicked(elementButton)) {
        return elementButton;
      }
    }
    throw new Error('elementButton is null');
  }

  element: ElementWord = {
    elementsA: [],
    elementsB: [],
  };

  ngOnInit(): void {
    this.initializeLevel();
  }

  initializeLevel() {
    this.initializeWordsGame();
  }

  initializeWordsGame() {
    if (this.option && this.option.length && this.option !== '') {
      this.loadDataStrategy = LOAD_DATA_STRATEGY.File(this.injector);
    } else {
      this.loadDataStrategy = LOAD_DATA_STRATEGY.LocalStorage(this.injector);
    }

    this.loadDataStrategy.getData(this.option).subscribe((data) => {
      this.element = data;
      this.restartCurrentLevel();
      this.resortElements();
      this.titleGame = this.option ?? 'Word Quiz Game';
    });
  }
}
