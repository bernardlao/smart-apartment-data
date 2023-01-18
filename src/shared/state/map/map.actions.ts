import { createAction, props } from '@ngrx/store';
import { IFilter, IMapItem } from 'src/shared/models/map.model';

export const getMapDataSuccess = createAction(
  '[Map API] Fetch Map Success',
  props<{ mapItems: IMapItem[] }>()
);

export const getMapDataFailed = createAction(
  '[MAp API] Fetch Map Failed',
  props<{ error: any }>()
);

export const getMapData = createAction('[Get Map Data] Get Map Data Items');

export const setFilter = createAction(
  '[Filter Data] Set Filter Data',
  props<{ filter: IFilter }>()
);
