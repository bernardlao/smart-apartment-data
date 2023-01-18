import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as MapReducer from './map/map.reducer';

export const reducers: ActionReducerMap<State> = {
  mapState: MapReducer.reducer,
}

export const metaReducers: MetaReducer<State>[] = [];
