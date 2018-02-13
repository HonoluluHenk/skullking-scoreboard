import { Component, OnInit } from '@angular/core';
import {ScoreboardService} from '../services/scoreboard.service';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {

  constructor(public scoreBoard: ScoreboardService) { }

  ngOnInit() {
  }

}
