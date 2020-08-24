import { MapLayer } from 'react-leaflet';
import * as L from 'leaflet';
import { withLeaflet } from 'react-leaflet';
import 'leaflet-routing-machine';

class RoutingMachine extends MapLayer<any> {
  createLeafletElement() {
    const { map } = (this.props as any).leaflet;
    
    const waypoints = [
        L.latLng(54.496566, 21.1810993),
        L.latLng(54.514357, 21.248480)
    ];

    let leafletElement = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5000/route/v1'
      })      
    })
    .addTo(map);

    leafletElement.hide(); // hide road describtion

    return leafletElement.getPlan();
  }
}

export default withLeaflet(RoutingMachine);