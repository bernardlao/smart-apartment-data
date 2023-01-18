import { FormControl } from "@angular/forms";

export interface IMapItem {
  listID: number;
  order: number;
  propertyID: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  pets: boolean;
  washerDry: string;
  photo: string;
  favorite: boolean;
  highestSentCommissions: number;
  onsiteManager: null;
  management: null;
  proximity: number;
  section8: boolean;
  seniorHousing: boolean;
  studentHousting: boolean;
  floorplans: IMapFloorplan[];
  highValueAmenities: string[];
  paidUtilities: string[];
  geocode: IMapGeocode;
}

export interface IMapFloorplan {
  bedrooms: number;
  type: string;
  price: number;
}

export interface IMapGeocode {
  Longitude: string;
  Latitude: string;
  Percision: string;
  IsValid: boolean;
}

export interface IFilterForm {
  studio: FormControl<boolean>;
  oneBed: FormControl<boolean>;
  twoBed: FormControl<boolean>;
  threeBed: FormControl<boolean>;
  range: FormControl<number | null>;
}

export interface IFilter {
  studio: boolean;
  oneBed: boolean;
  twoBed: boolean;
  threeBed: boolean;
  range: number | null;
}
