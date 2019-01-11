import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainScenePageComponent } from './main-scene-page/main-scene.component';
import { SelectionValueDialogComponent } from './shared/selection-value-dialog/selection-value-dialog.component';
import { ArithmeticOperationDialogComponent } from './task-pages/arithmeticOperation/arithmeticOperation.component';
import { AppComponent } from './app.component';
import { ResultPagePageComponent } from './result-page/result-page.component';
import { ReadJsonService } from './services/read-json.service';
import { TranslateOperationDialogComponent } from './task-pages/translateOperation/translateOperation.component';
import { SoundService } from './services/sound.service';
import { InfoPageComponent } from './shared/info-page/info-page.component';
import { RandomService } from './services/random.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebase;



@NgModule({
  exports: [
    MatDialogModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  entryComponents: [MainScenePageComponent, SelectionValueDialogComponent],
  declarations: [
    LandingPageComponent,
    LoginPageComponent,
    MainScenePageComponent,
    AppComponent,
    MainScenePageComponent,
    SelectionValueDialogComponent,
    ArithmeticOperationDialogComponent,
    ResultPagePageComponent,
    TranslateOperationDialogComponent,
    InfoPageComponent
  ],
  bootstrap: [AppComponent],
  providers: [ReadJsonService, SoundService, RandomService]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
