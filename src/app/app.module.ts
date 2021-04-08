import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { MainModule } from './views/components/main/main.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { appStateReducer } from './store/appState.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppStateEffects } from './store/appState.effect';
import { QlgyService } from './services/glgy.service';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    ShellModule,
    MainModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ appState: appStateReducer }),
    StoreModule.forFeature('appState', appStateReducer),
    EffectsModule.forRoot([AppStateEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [QlgyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
