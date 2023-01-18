import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.state';

export const selectMap = createFeatureSelector<MapState>('mapState');

export const selectMapItems = createSelector(
  selectMap,
  (state: MapState) => state.mapItems
);

export const selectFetchingItems = createSelector(
  selectMap,
  (state: MapState) => state.fetchingItems
);

export const selectRentRange = createSelector(
  selectMap,
  (state: MapState) => state.rentRange
);

export const selectFilter = createSelector(
  selectMap,
  (state: MapState) => state.filter
);

export const selectFilteredItems = createSelector(
  selectMap,
  (state: MapState) => state.filteredItems
);
