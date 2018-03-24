import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ScoreboardService} from './services/scoreboard.service';
import {BoardviewComponent} from './boardview/boardview.component';
import {ScoreComponent} from './score/score.component';
import {EnterAsTabDirective} from '../directives/enter-as-tab.directive';
import { BonusPopupComponent } from './bonus-popup/bonus-popup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        BoardviewComponent
    ],
    declarations: [
        BoardviewComponent,
        ScoreComponent,
        EnterAsTabDirective,
        BonusPopupComponent
    ],
    providers: [ScoreboardService]
})
export class ScoreboardModule {
}
