import { Component, OnInit } from '@angular/core';
import {QuizApiService} from '../quiz-api.service'
@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.css']
})
export class QuizAppComponent implements OnInit {
  questions = [];
  answer = false;
  num = 0;
  points =0;

  constructor(private api:QuizApiService) { }

  ngOnInit(): void {
    this.start();
  }

  checkAnswer( correct_answer:String ,your_answer :String){
    this.answer = correct_answer == your_answer?true:false;
    this.answer?this.points +=1:this.points -=1;
    this.num<this.questions.length?this.num+=1:null;

  }
  start(){
    this.questions = [];
    this.api.getQuiz().subscribe(async res => {
      let quiz = res['results'];
      quiz.forEach(element => {
        element.incorrect_answers.push(element.correct_answer);
        element.incorrect_answers.sort(()=>.5 -Math.random());

        
      });
      this.questions =await quiz;
      this.num = 0;
      this.points = 0;
    });
  }
}
