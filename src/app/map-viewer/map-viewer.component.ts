import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  imports:[RouterOutlet],
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements AfterViewInit {
  private map!: L.Map;
  private imageBounds:L.LatLngBoundsExpression = [[0, 0], [8000, 8000]];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      this.map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomSnap: 0.1
      });

      const imageUrl = '/assets/bts-map.jpg';
      L.imageOverlay(imageUrl, this.imageBounds).addTo(this.map);
      this.map.fitBounds(this.imageBounds);
    }
  }
}
