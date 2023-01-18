import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { IMapItem } from 'src/shared/models/map.model';

@Component({
  selector: 'app-map-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `<div id="map" class="map match-parent"></div>`,
  styles: [
    `
      :host::ng-deep {
        .match-parent {
          width: 100%;
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewerComponent implements OnChanges {
  @Input() items: IMapItem[] = [];
  @Output() selectItem = new EventEmitter<IMapItem>();

  public map!: mapboxgl.Map;

  private markers: mapboxgl.Marker[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].firstChange) {
      this.setupMap();
    } else {
      this.loadPins();
    }
  }

  setupMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.map.accessToken,
      container: 'map',
      style: environment.map.mapStyle,
      center: [-96.937683, 32.874643],
      zoom: 10,
    }).on('load', () => this.loadPins());
  }

  loadPins() {
    if (this.markers.length > 0) this.removePins();
    let coordinates: mapboxgl.LngLatLike[] = [];
    this.items.forEach((item) => {
      const coordinate: mapboxgl.LngLatLike = [
        +item.geocode.Longitude,
        +item.geocode.Latitude,
      ];
      coordinates = [...coordinates, coordinate];
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinate)
        .addTo(this.map);
      marker.getElement().addEventListener('click', () => {
        this.selectItem.next(item);
      });
      this.markers = [...this.markers, marker];
    });

    const bounds = coordinates.reduce(function (bounds, coordinate) {
      return bounds.extend(coordinate);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    this.map.fitBounds(bounds, {
      padding: 80,
      maxZoom: coordinates.length > 1 ? 15 : 16,
    });
  }

  removePins() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];
  }
}
