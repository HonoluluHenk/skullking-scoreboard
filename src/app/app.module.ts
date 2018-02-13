import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ScoreboardModule} from './scoreboard/scoreboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ScoreboardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
