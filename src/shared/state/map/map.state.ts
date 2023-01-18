import { IFilter, IMapItem } from '../../models/map.model';

export interface MapState {
  mapItems: IMapItem[];
  filteredItems: IMapItem[];
  fetchingItems: boolean;
  rentRange: { min: number; max: number };
  filter: IFilter;
}

export const initialState: MapState = {
  mapItems: [],
  filteredItems: [],
  rentRange: { min: 0, max: 0 },
  fetchingItems: false,
  filter: {
    studio: true,
    oneBed: true,
    twoBed: true,
    threeBed: true,
    range: null,
  },
};
