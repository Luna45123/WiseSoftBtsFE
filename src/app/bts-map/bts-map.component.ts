import { Component } from '@angular/core';
import { StationSelectorComponent } from "../station-selector/station-selector.component";
import { MapViewerComponent } from "../map-viewer/map-viewer.component";
import { RouterOutlet } from '@angular/router';
// import { MapViewerComponent } from '../map-viewer/map-viewer.component';
@Component({
  selector: 'app-bts-map',
  imports: [StationSelectorComponent, MapViewerComponent,RouterOutlet],
  templateUrl: './bts-map.component.html',
  styleUrl: './bts-map.component.scss'
})
export class BtsMapComponent {

}
