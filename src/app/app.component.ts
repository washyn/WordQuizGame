import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

interface ElementWord {
  elementsA: ElementOption[];
  elementsB: ElementOption[];
}
interface ElementOption {
  text: string;
  idAssociated: number;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  restartCurrentLevel() {
    this.resetCurrentGameState();
    this.displayAllButtons();
    this.resortElements();
  }
  nextQuestion() {
    this.initializeWordsGame();
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
          accept: () => {
            this.initializeWordsGame();
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

  // displayMessageFinishedLevel() {
  //   if (this.finishedLevel()) {
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'Finished level',
  //       life: 4000,
  //     });
  //   }
  // }

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
          this.unmarkElement(currentElement);
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
          this.unmarkElement(currentElement);
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
          this.unmarkElement(currentElement);
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
          this.unmarkElement(currentElement);
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
    element.classList.add('p-button-secondary');
    element.removeAttribute('isClicked');
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
    elementsA: [
      { id: this.guidGenerator(), text: 'Good', idAssociated: 2 },
      { id: this.guidGenerator(), text: 'Hard', idAssociated: 3 },
      { id: this.guidGenerator(), text: 'Think', idAssociated: 5 },
      { id: this.guidGenerator(), text: 'Strong', idAssociated: 6 },
    ],
    elementsB: [
      { id: this.guidGenerator(), text: 'Bueno', idAssociated: 2 },
      { id: this.guidGenerator(), text: 'Difícil', idAssociated: 3 },
      { id: this.guidGenerator(), text: 'Pensar', idAssociated: 5 },
      { id: this.guidGenerator(), text: 'Fuerte', idAssociated: 6 },
    ],
  };

  ngOnInit(): void {
    this.initializeWordsGame();
  }

  initializeWordsGame() {
    this.restartCurrentLevel();

    let n = this.gerRandomBetween(2, 10);
    let counter = 0;
    let keyValuePairWords = [];
    while (counter < n) {
      let randomWord = this.getRandomWord();
      keyValuePairWords.push({
        key: randomWord.English,
        value: randomWord.Spanish,
      });
      counter++;
    }

    this.element.elementsA = [];
    this.element.elementsB = [];
    keyValuePairWords.forEach((element, index) => {
      this.element.elementsA.push({
        id: this.guidGenerator(),
        text: element.key,
        idAssociated: index,
      });
      this.element.elementsB.push({
        id: this.guidGenerator(),
        text: element.value,
        idAssociated: index,
      });
    });
    this.resortElements();
  }

  gerRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomWord() {
    let randomIndex = this.gerRandomBetween(0, this.translations.length - 1);
    return this.translations[randomIndex];
  }

  // esta lista obtenerla del backend de una base de datos...
  translations: { English: string; Spanish: string }[] = [
    { English: 'Hello', Spanish: 'Hola' },
    { English: 'Goodbye', Spanish: 'Adiós' },
    { English: 'Please', Spanish: 'Por favor' },
    { English: 'Thank you', Spanish: 'Gracias' },
    { English: 'Yes', Spanish: 'Sí' },
    { English: 'No', Spanish: 'No' },
    { English: 'Excuse me', Spanish: 'Perdón' },
    { English: 'Sorry', Spanish: 'Lo siento' },
    { English: 'Friend', Spanish: 'Amigo' },
    { English: 'Family', Spanish: 'Familia' },
    { English: 'House', Spanish: 'Casa' },
    { English: 'Car', Spanish: 'Coche' },
    { English: 'Book', Spanish: 'Libro' },
    { English: 'School', Spanish: 'Escuela' },
    { English: 'Teacher', Spanish: 'Maestro' },
    { English: 'Student', Spanish: 'Estudiante' },
    { English: 'Water', Spanish: 'Agua' },
    { English: 'Food', Spanish: 'Comida' },
    { English: 'Dog', Spanish: 'Perro' },
    { English: 'Cat', Spanish: 'Gato' },
    { English: 'Table', Spanish: 'Mesa' },
    { English: 'Chair', Spanish: 'Silla' },
    { English: 'Window', Spanish: 'Ventana' },
    { English: 'Door', Spanish: 'Puerta' },
    { English: 'Computer', Spanish: 'Computadora' },
    { English: 'Phone', Spanish: 'Teléfono' },
    { English: 'Day', Spanish: 'Día' },
    { English: 'Night', Spanish: 'Noche' },
    { English: 'Morning', Spanish: 'Mañana' },
    { English: 'Afternoon', Spanish: 'Tarde' },
    { English: 'Evening', Spanish: 'Noche' },
    { English: 'Week', Spanish: 'Semana' },
    { English: 'Month', Spanish: 'Mes' },
    { English: 'Year', Spanish: 'Año' },
    { English: 'Time', Spanish: 'Tiempo' },
    { English: 'Work', Spanish: 'Trabajo' },
    { English: 'Love', Spanish: 'Amor' },
    { English: 'Happiness', Spanish: 'Felicidad' },
    { English: 'Sadness', Spanish: 'Tristeza' },
    { English: 'City', Spanish: 'Ciudad' },
    { English: 'Country', Spanish: 'País' },
    { English: 'Garden', Spanish: 'Jardín' },
    { English: 'Flower', Spanish: 'Flor' },
    { English: 'Tree', Spanish: 'Árbol' },
    { English: 'Sun', Spanish: 'Sol' },
    { English: 'Moon', Spanish: 'Luna' },
    { English: 'Star', Spanish: 'Estrella' },
    { English: 'Fire', Spanish: 'Fuego' },
    { English: 'Earth', Spanish: 'Tierra' },
    { English: 'Sky', Spanish: 'Cielo' },
    { English: 'Ocean', Spanish: 'Océano' },
  ];
  guidGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
