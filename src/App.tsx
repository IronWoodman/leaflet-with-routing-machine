import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import shp from 'shpjs';
import './App.css';
import getJson from './gis_osm_railways_free_1.json';

const data = getJson as GeoJSON.GeoJsonObject;

interface ILocation {
    lat: number;
    lng: number;
}

interface IState {
    key1: number;
    key2: number;
    loaded: boolean;
    error?: Error;
    bikes?: any;
    zoom: number;
    location: ILocation;
}

export default class App extends React.Component<any, IState> {
    protected data?: GeoJSON.GeoJsonObject | GeoJSON.GeoJsonObject[] = undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            key1: 0,
            key2: 100,
            loaded: false,
            error: undefined,
            bikes: undefined,
            location: {
                lat: 51.505,
                lng: -0.09,
            },
            zoom: 2,
        };
    }

    componentDidMount() {
        fetch('https://bikewise.org:443/api/v2/locations/markers?proximity_square=10')
            .then((response) => response.json())
            .then((data) =>
                this.setState((prevState) => {
                    console.log('bikes - ', data);
                    return { key1: prevState.key1 + 1, bikes: data };
                })
            );

        shp('files/RoadGraph')
            .then((geojson: any) => {
                this.data = geojson;
                this.setState((prevState) => ({ key2: prevState.key2 + 1, loaded: true }));
            })
            .catch((error: Error) => {
                this.setState({ error });
            });
    }

    render() {
        const { key1, key2, loaded } = this.state;
        const position: [number, number] = [this.state.location.lat, this.state.location.lng];

        return (
            <div>
                <Map className="map" center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <GeoJSON
                        key={this.state.key1}
                        data={this.state.bikes}
                        style={() => ({
                            color: 'red',
                            weight: 10000000000000000,
                            fillColor: 'yellow',
                            fillOpacity: 1,
                        })}
                    />

                    {this.data && (
                        <GeoJSON
                            key={key2}
                            data={this.data}
                            style={() => ({
                                color: '#4a83ec',
                                weight: 3,
                                fillColor: '#1a1d62',
                                fillOpacity: 3,
                            })}
                        />
                    )}
                </Map>
            </div>
        );
    }
}

// {this.data && (
//     <GeoJSON
//         key={key2}
//         data={this.data}
//         style={() => ({
//             color: '#4a83ec',
//             weight: 1,
//             fillColor: '#1a1d62',
//             fillOpacity: 1,
//         })}
//     />
// )}
