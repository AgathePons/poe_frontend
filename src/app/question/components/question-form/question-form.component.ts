import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';
import { QuestionDto } from '../../dto/question-dto';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SurveyService } from 'src/app/core/service/survey.service';
import { Survey } from 'src/app/core/models/survey';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {


  public questionForm!: FormGroup;
  public addMode: boolean = true;
  public question!: Question;
  @Input() public fromSurvey: number = 0;
  @Output() public surveyToSend: EventEmitter<Survey> = new EventEmitter<Survey>();
  @Output() public questionTypeToSend: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;

    console.log('this data = ', data);


    this.questionForm = data.form;

    console.log('this questionForm = ', this.questionForm)



    if (this.questionForm.value.id !== undefined && this.questionForm.value.id !== 0) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }


  }

  public onSubmit(): void {
    const dto: QuestionDto = new QuestionDto(this.questionForm.value);
    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.questionService.addQuestion(dto);
    } else {
      subscription = this.questionService.updateQuestion(dto);
    }
    subscription.subscribe((question: Question) => {
      this.question = question;
      if (this.fromSurvey !== 0) {
        console.log('Je rajoute la question à la survey ID n°', this.fromSurvey);
        this.surveyService.addManyQuestions(this.fromSurvey, [question.getId()]).subscribe((survey: Survey) => {
          this.surveyToSend.emit(survey)
          if (question.getAnswerType() === 'CHOOSE_ONE' || question.getAnswerType() === 'CHOOSE_MANY') {
            this.questionTypeToSend.emit(true)
            console.log('emit CHOOSE ONE type');
            

          } else {
            this.questionTypeToSend.emit(false)
            console.log('emit NO type');


          }
          this.questionForm.reset()

          Object.keys(this.questionForm.controls).forEach(key => {
            this.questionForm.get(key)!.setErrors(null);
          });

        }

        );
      } else {
        this.goBack();

      }

    })
  }

  public goBack(): void {
    this.location.back();
  }

  public get c(): { [key: string]: AbstractControl } {
    return this.questionForm.controls;
  }
}

