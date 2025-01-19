import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

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
  restartCurrentLevel() {
    this.resetCurrentGameState();
    this.displayAllButtons();
    this.resortElements();
  }
  nextQuestion() {}
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
      { id: this.guidGenerator(), text: 'Great', idAssociated: 1 },
      { id: this.guidGenerator(), text: 'Good', idAssociated: 2 },
      { id: this.guidGenerator(), text: 'Hard', idAssociated: 3 },
      { id: this.guidGenerator(), text: 'Do', idAssociated: 4 },
      { id: this.guidGenerator(), text: 'Think', idAssociated: 5 },
      { id: this.guidGenerator(), text: 'Strong', idAssociated: 6 },
      { id: this.guidGenerator(), text: 'New', idAssociated: 7 },
      { id: this.guidGenerator(), text: 'Pass', idAssociated: 8 },
      { id: this.guidGenerator(), text: 'Try', idAssociated: 9 },
      { id: this.guidGenerator(), text: 'Thing', idAssociated: 10 },
    ],
    elementsB: [
      { id: this.guidGenerator(), text: 'Genial', idAssociated: 1 },
      { id: this.guidGenerator(), text: 'Bueno', idAssociated: 2 },
      { id: this.guidGenerator(), text: 'Difícil', idAssociated: 3 },
      { id: this.guidGenerator(), text: 'Hacer', idAssociated: 4 },
      { id: this.guidGenerator(), text: 'Pensar', idAssociated: 5 },
      { id: this.guidGenerator(), text: 'Fuerte', idAssociated: 6 },
      { id: this.guidGenerator(), text: 'Nuevo', idAssociated: 7 },
      { id: this.guidGenerator(), text: 'Pasar', idAssociated: 8 },
      { id: this.guidGenerator(), text: 'Intentar', idAssociated: 9 },
      { id: this.guidGenerator(), text: 'Cosa', idAssociated: 10 },
    ],
  };

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

  ngOnInit(): void {
    this.resortElements();
  }
}
