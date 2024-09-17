import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import iconUrl from '../resources/ferramenta-de-configuracao-do-gears.png';

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const Map = ({ positions, onMarkerClick, onRemove }) => {
    return (
        <div className="map-container"> {/* Remover estilos inline */}
            <MapContainer 
                center={[-19.126536, -45.947756]} 
                zoom={13} 
                className="leaflet-map" // Adicionar uma classe para o CSS
                whenCreated={map => { map.invalidateSize(); }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map(position => (
                    position.lat && position.lon && (
                        <Marker key={position.id} position={[position.lat, position.lon]} icon={customIcon} eventHandlers={{
                            click: () => {
                                onMarkerClick(position);
                            },
                        }}>
                            <Popup>
                                <div>
                                    <h3>{position.displayName}</h3>
                                    <p>Endereço: {position.address}</p>
                                    <button onClick={() => onRemove(position.id)} style={{ marginTop: '10px' }}>Remover</button>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;