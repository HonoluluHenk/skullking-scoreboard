import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ScoreboardService} from './services/scoreboard.service';
import {BoardviewComponent} from './boardview/boardview.component';
import {EntryviewComponent} from './entryview/entryview.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        BoardviewComponent
    ],
    declarations: [BoardviewComponent, EntryviewComponent],
    providers: [ScoreboardService]
})
export class ScoreboardModule {
}
