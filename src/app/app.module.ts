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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QlgyService } from './services/glgy.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/router.serializer';
import { reducers } from './store/reducers'
import { RouterModule } from '@angular/router';
import { MainComponent } from './views/components/main/main.component';
import { appStateReducer } from './store/state/appState.reducer';
import { AppStateEffects } from './store/state/appState.effect';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    ShellModule,
    MainModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('appState', appStateReducer),
    EffectsModule.forRoot([AppStateEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    RouterModule.forRoot([
      // { path: '/edit', component: MainComponent },
      { path: '**', component: MainComponent },
    ], { useHash: true }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    })
  ],
  declarations: [AppComponent],
  providers: [QlgyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
