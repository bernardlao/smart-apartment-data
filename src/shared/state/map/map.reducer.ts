import { Action, createReducer, on } from '@ngrx/store';
import { initialState, MapState } from './map.state';
import * as MapActions from './map.actions';
import { IMapItem } from 'src/shared/models/map.model';

const mapReducer = createReducer(
  initialState,
  on(MapActions.getMapData, (state) => ({
    ...state,
    fetchingItems: false,
  })),
  on(MapActions.getMapDataSuccess, (state, { mapItems }) => {
    const pricesArr: number[] = mapItems.reduce((prices, item: IMapItem) => {
      const itemPrices = item.floorplans.map((floor) => floor.price);
      return [...prices, ...itemPrices];
    }, [] as number[]);
    return {
      ...state,
      fetchingItems: false,
      rentRange: { min: Math.min(...pricesArr), max: Math.max(...pricesArr) },
      mapItems,
      filteredItems: mapItems,
    };
  }),
  on(MapActions.getMapDataFailed, (state) => ({
    ...state,
    fetchingItems: false,
  })),
  on(MapActions.setFilter, (state, { filter }) => {
    const isWithinRange = (
      item: IMapItem,
      isFiltered: boolean,
      numberOfBed: number,
      range: number | null
    ): boolean => {
      if (!isFiltered) return false;
      if (range === null) return isFiltered;
      const option = item.floorplans.find((fp) => fp.bedrooms === numberOfBed);
      if (!option) return false;
      return option.price <= range;
    };

    const filtered = state.mapItems.filter((item) => {
      const { studio, oneBed, twoBed, threeBed, range } = filter;
      const hasStudio = isWithinRange(item, studio, 0, range);
      const hasOneBed = isWithinRange(item, oneBed, 1, range);
      const hasTwoBed = isWithinRange(item, twoBed, 2, range);
      const hasThreeBed = isWithinRange(item, threeBed, 3, range);
      return hasStudio || hasOneBed || hasTwoBed || hasThreeBed;
    });
    return {
      ...state,
      filteredItems: filtered,
      filter,
    };
  })
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}
