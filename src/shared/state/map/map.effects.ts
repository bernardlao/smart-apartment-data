import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, timer } from 'rxjs';
import { MAP_MOCK_DATA } from 'src/shared/mocks/map.mock';
import * as MapActions from './map.actions';

@Injectable()
export class MapEffects {
  constructor(private action$: Actions<any>) {}

  fetchMapData$ = createEffect(() =>
    this.action$.pipe(
      ofType(MapActions.getMapData.type),
      switchMap(() => {
        //api call will be done here with map and catchError, I instead return mock
        return of(MapActions.getMapDataSuccess({ mapItems: MAP_MOCK_DATA }))
      })
    )
  );
}
