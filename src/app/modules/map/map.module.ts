import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapSidebarComponent } from './map-container/map-sidebar/map-sidebar.component';
import { MapContentComponent } from './map-container/map-content/map-content.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/shared/state';
import { reducer } from 'src/shared/state/map';
import { MapViewerComponent } from 'src/shared/standalones/map-viewer/map-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './map-container/item-details/item-details.component';


@NgModule({
  declarations: [
    MapComponent,
    MapContainerComponent,
    MapSidebarComponent,
    MapContentComponent,
    ItemDetailsComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    MapViewerComponent,
    ReactiveFormsModule,
  ]
})
export class MapModule { }
