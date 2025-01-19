import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
interface Question {
  word: string;
  options: Option[];
}
interface Option {
  text: string;
  isCorrect?: boolean;
}
@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.css'],
})
export class GameQuestionComponent implements OnInit {
  currentWord: string = 'outstanding';
  errorCount: number = 0;
  successCount: number = 0;
  currentIndex: number = 0;
  // currentQuestion!: Question;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    // this.questions[this.currentIndex];
  }

  show() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
      life: 4000,
    });
  }

  //HTMLButtonElement
  selectButton(item: Option) {
    let selector = document.getElementsByClassName('optionButton');
    for (let i = 0; i < selector.length; i++) {
      if (selector[i].getAttribute('isCorrect') === 'true') {
        selector[i].classList.remove('p-button-secondary');
        selector[i].classList.add('p-button-success');
      }
    }
    if (item.isCorrect) {
      this.successCount++;
      // agregar animacion de scuccess al boton
    } else {
      this.errorCount++;
      // agregar animacion de error al boton
      // si este elemento tiene el atributo isCorrect agregar verde y al elemento seleccionado agregar rojo atributo
    }

    // reset counters if last question
    if (this.currentIndex === this.questions.length - 1) {
      if (this.successCount + this.errorCount === this.questions.length) {
        this.successCount = 0;
        this.errorCount = 0;
      }
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Info',
    //   detail: `${item.text} - ${item.isCorrect}`,
    //   life: 4000,
    // });
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    // resort options
    this.questions[this.currentIndex].options.sort(() => Math.random() - 0.5);
  }

  questions: Question[] = [
    {
      word: 'outstanding',
      options: [
        { text: 'Sobresaliente', isCorrect: true },
        { text: 'Ordinario' },
        { text: 'Aburrido' },
        { text: 'Agradable' },
      ],
    },
    {
      word: 'reliable',
      options: [
        { text: 'Confiable', isCorrect: true },
        { text: 'Arriesgado' },
        { text: 'Engañoso' },
        { text: 'Falso' },
      ],
    },
    {
      word: 'challenging',
      options: [
        { text: 'Desafiante', isCorrect: true },
        { text: 'Fácil' },
        { text: 'Común' },
        { text: 'Simple' },
      ],
    },
    {
      word: 'achieve',
      options: [
        { text: 'Lograr', isCorrect: true },
        { text: 'Perder' },
        { text: 'Evitar' },
        { text: 'Olvidar' },
      ],
    },
    {
      word: 'hesitate',
      options: [
        { text: 'Dudar', isCorrect: true },
        { text: 'Asegurar' },
        { text: 'Decidir' },
        { text: 'Moverse' },
      ],
    },
    // {
    //   word: 'resilient',
    //   options: [
    //     { text: 'Resiliente', isCorrect: true },
    //     { text: 'Frágil' },
    //     { text: 'Romper' },
    //     { text: 'Débil' },
    //   ],
    // },
    // {
    //   word: 'innovate',
    //   options: [
    //     { text: 'Innovar', isCorrect: true },
    //     { text: 'Imitar' },
    //     { text: 'Repetir' },
    //     { text: 'Evitar' },
    //   ],
    // },
    // {
    //   word: 'overcome',
    //   options: [
    //     { text: 'Superar', isCorrect: true },
    //     { text: 'Evitar' },
    //     { text: 'Renunciar' },
    //     { text: 'Ignorar' },
    //   ],
    // },
    // {
    //   word: 'persistent',
    //   options: [
    //     { text: 'Persistente', isCorrect: true },
    //     { text: 'Inconstante' },
    //     { text: 'Pasivo' },
    //     { text: 'Desinteresado' },
    //   ],
    // },
    // {
    //   word: 'remarkable',
    //   options: [
    //     { text: 'Notable', isCorrect: true },
    //     { text: 'Normal' },
    //     { text: 'Común' },
    //     { text: 'Inútil' },
    //   ],
    // },
    // {
    //   word: 'empathy',
    //   options: [
    //     { text: 'Empatía', isCorrect: true },
    //     { text: 'Frialdad' },
    //     { text: 'Antipatía' },
    //     { text: 'Desprecio' },
    //   ],
    // },
    // {
    //   word: 'dedicated',
    //   options: [
    //     { text: 'Dedicado', isCorrect: true },
    //     { text: 'Apático' },
    //     { text: 'Poco serio' },
    //     { text: 'Rápido' },
    //   ],
    // },
    // {
    //   word: 'adaptable',
    //   options: [
    //     { text: 'Adaptable', isCorrect: true },
    //     { text: 'Rígido' },
    //     { text: 'Fijo' },
    //     { text: 'Complicado' },
    //   ],
    // },
    // {
    //   word: 'genuine',
    //   options: [
    //     { text: 'Genuino', isCorrect: true },
    //     { text: 'Falso' },
    //     { text: 'Dudoso' },
    //     { text: 'Artificial' },
    //   ],
    // },
    // {
    //   word: 'versatile',
    //   options: [
    //     { text: 'Versátil', isCorrect: true },
    //     { text: 'Limitado' },
    //     { text: 'Único' },
    //     { text: 'Rígido' },
    //   ],
    // },
    // {
    //   word: 'trustworthy',
    //   options: [
    //     { text: 'Confiable', isCorrect: true },
    //     { text: 'Engañoso' },
    //     { text: 'Dudoso' },
    //     { text: 'Inseguro' },
    //   ],
    // },
    // {
    //   word: 'insightful',
    //   options: [
    //     { text: 'Perspicaz', isCorrect: true },
    //     { text: 'Confuso' },
    //     { text: 'Superficial' },
    //     { text: 'Ignorante' },
    //   ],
    // },
    // {
    //   word: 'efficient',
    //   options: [
    //     { text: 'Eficiente', isCorrect: true },
    //     { text: 'Lento' },
    //     { text: 'Ineficaz' },
    //     { text: 'Complicado' },
    //   ],
    // },
    // {
    //   word: 'curious',
    //   options: [
    //     { text: 'Curioso', isCorrect: true },
    //     { text: 'Desinteresado' },
    //     { text: 'Normal' },
    //     { text: 'Tímido' },
    //   ],
    // },
    // {
    //   word: 'ambitious',
    //   options: [
    //     { text: 'Ambicioso', isCorrect: true },
    //     { text: 'Conforme' },
    //     { text: 'Pasivo' },
    //     { text: 'Limitado' },
    //   ],
    // },
  ];
}
