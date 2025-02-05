import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ElementOption, ElementWord } from '../../shared/interfaces';
import { DataProvider } from '../../shared/data-provider';
import { ClockService } from '../../shared/clock.service';
import { StopwatchService } from '../../shared/stopwatch.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-pair',
  templateUrl: './game-pair.component.html',
  styleUrls: ['./game-pair.component.css'],
})
export class GamePairComponent implements OnInit, OnDestroy {
  titleGame: string = 'Word Quiz Game';
  wrongAnswerCount: number = 0;
  rightAnswerCount: number = 0;
  totalQuestions: number = 0;
  timeSolvedGame: string = '00:00:00';
  time$ = this.stopwatchService.time$;
  private counterSubject = new BehaviorSubject<number>(0);
  public touchCounter$: Observable<number> = this.counterSubject.asObservable();

  constructor(
    protected injector: Injector,
    private messageService: MessageService,
    private dataProvider: DataProvider,
    private confirmationService: ConfirmationService,
    private stopwatchService: StopwatchService
  ) {}
  ngOnDestroy(): void {
    this.stopwatchService.reset();
  }

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
      if (finished || this.totalQuestions === this.rightAnswerCount) {
        this.timeSolvedGame = this.stopwatchService.getCurrentTime();
        this.confirmationService.confirm({
          header: 'Confirmation',
          icon: 'pi pi-exclamation-circle',
          rejectButtonProps: {
            label: 'Cancel',
            icon: 'pi pi-times',
            outlined: true,
            size: 'small',
          },
          acceptButtonProps: {
            label: 'Next',
            icon: 'pi pi-check',
            size: 'small',
          },
          accept: () => {
            this.initializeLevel();
          },
          reject: () => {
            console.log('Rejected');
          },
        });
      }
    }, 400);
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
  // NOTE: improve this function
  clickedElementA(element: ElementOption) {
    this.counterSubject.next(this.counterSubject.value + 1);
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
          this.markElementSuccess(currentElement);
          setTimeout(() => {
            this.hideElement(currentElement);
            this.hideElement(clickedPreviousElementB);
            this.unmarkElement(currentElement);
            this.unmarkElement(clickedPreviousElementB);
            this.rightAnswerCount++;
            this.checkFinishedLevel();
          }, 200);
        } else {
          let currentElement = this.getElementClickedLeft();
          this.markAsWrongSelectedElement(currentElement);
          this.wrongAnswerCount++;
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
          this.markElementSuccess(currentElement);
          setTimeout(() => {
            this.hideElement(currentElement);
            this.hideElement(clickedPreviousElementB);
            this.unmarkElement(currentElement);
            this.unmarkElement(clickedPreviousElementB);
            this.rightAnswerCount++;
            this.checkFinishedLevel();
          }, 200);
        } else {
          let currentElement = this.getElementClickedLeft();
          this.markAsWrongSelectedElement(currentElement);
          this.wrongAnswerCount++;
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    }
  }
  // NOTE: improve this function
  clickedElementB(element: ElementOption) {
    this.counterSubject.next(this.counterSubject.value + 1);
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
          this.markElementSuccess(currentElement);
          setTimeout(() => {
            this.hideElement(currentElement);
            this.hideElement(clickedPreviousElementA);
            this.unmarkElement(currentElement);
            this.unmarkElement(clickedPreviousElementA);
            this.rightAnswerCount++;
            this.checkFinishedLevel();
          }, 200);
        } else {
          let currentElement = this.getElementClickedRigth();
          this.markAsWrongSelectedElement(currentElement);
          this.wrongAnswerCount++;
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
          this.markElementSuccess(currentElement);
          setTimeout(() => {
            this.hideElement(currentElement);
            this.hideElement(clickedPreviousElementA);
            this.unmarkElement(currentElement);
            this.unmarkElement(clickedPreviousElementA);
            this.rightAnswerCount++;
            this.checkFinishedLevel();
          }, 200);
        } else {
          let currentElement = this.getElementClickedRigth();
          this.markAsWrongSelectedElement(currentElement);
          this.wrongAnswerCount++;
          setTimeout(() => {
            this.unmarkElement(currentElement);
          }, 200);
        }
      }
    }
  }

  markButtonAsSuccess(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      elementButton.classList.remove('p-button-secondary');
      elementButton.classList.remove('p-button-danger');
      elementButton.classList.add('p-button-primary');
    }
  }
  unMarkButtonAsSuccess(element: ElementOption) {
    let elementButton = document.getElementById(element.id);
    if (elementButton) {
      elementButton.classList.remove('p-button-primary');
      elementButton.classList.add('p-button-secondary');
    }
  }

  markElementSuccess(element: HTMLElement) {
    element.classList.remove('p-button-secondary');
    element.classList.remove('p-button-danger');
    element.classList.add('p-button-primary');
  }
  unMarkElementSuccess(element: HTMLElement) {
    element.classList.remove('p-button-primary');
    element.classList.add('p-button-secondary');
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
    this.touchCounter$.subscribe((value) => {
      if (value === 1) {
        this.stopwatchService.start();
      }
    });
  }

  initializeLevel() {
    this.initializeWordsGame();
  }

  initializeWordsGame() {
    this.dataProvider.getData().subscribe((data) => {
      this.element = data;
      this.restartCurrentLevel();
      this.resortElements();
      this.totalQuestions = this.element.elementsA.length;
      this.wrongAnswerCount = 0;
      this.rightAnswerCount = 0;
      this.counterSubject.next(0);
      this.stopwatchService.reset();
    });
  }
}
