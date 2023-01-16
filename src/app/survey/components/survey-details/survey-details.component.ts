import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';
import { Question } from 'src/app/core/models/question';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  public survey: Survey = new Survey();
  public question: Array<Question> = [];

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      const surveyId: number = routeParams['id'];
      this.surveyService.findOne(surveyId)
      .subscribe((survey: Survey) => {
        this.survey = survey;
        console.log('questions found >>', this.survey.getQuestions());
      });
    });
  }

  public onDelete(question: Question) {
    this.surveyService.removeOneQuestion(this.survey.getId(), question.getId())
    .subscribe(
      (survey: Survey) => {
        this.survey = survey;
        this.question.splice(
          this.question.findIndex((s: Question) => s.getId() === question.getId()),
          1
        );
      }
    );
  }

  public onBackButton(): void {
    this.location.back();
  }
}