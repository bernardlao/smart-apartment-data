import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IFilterForm, IMapItem } from 'src/shared/models/map.model';
import {
  selectFilteredItems,
  selectRentRange,
  setFilter,
} from 'src/shared/state/map';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrls: ['./map-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSidebarComponent {
  public mapItems$ = this.store.select(selectFilteredItems);
  public rentRange$ = this.store.select(selectRentRange);

  public form: FormGroup<IFilterForm>;

  constructor(private store: Store, private location: Location) {
    this.form = new FormGroup<IFilterForm>({
      studio: new FormControl(true, { nonNullable: true }),
      oneBed: new FormControl(true, { nonNullable: true }),
      twoBed: new FormControl(true, { nonNullable: true }),
      threeBed: new FormControl(true, { nonNullable: true }),
      range: new FormControl(null),
    });
  }

  onSelectMapItem(item: IMapItem) {
    this.location.go(`${item.propertyID}`);
  }

  onFilter() {
    const formValue = this.form.getRawValue();
    this.store.dispatch(setFilter({ filter: formValue }));
  }
}
