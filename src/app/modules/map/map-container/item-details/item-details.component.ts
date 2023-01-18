import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMapItem } from 'src/shared/models/map.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent {
  @Input() mapItem!: IMapItem;

  constructor(private location: Location) {}

  onBackToResult() {
    this.location.go('/');
  }
}
