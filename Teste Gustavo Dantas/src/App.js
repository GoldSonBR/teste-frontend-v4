import React, { useState, useCallback } from 'react';
import Map from './components/map';
import EquipmentFilter from './components/EquipmentFilter';
import EquipmentDetails from './components/EquipmentDetails';
import EquipmentForm from './components/EquipmentForm'; // Importar o novo componente
import { getEquipmentDetails } from './data/loadData';
import axios from 'axios';
import './styles/styles.css'; // Ajuste o caminho conforme necessário
import logo from './resources/AikoV4.png'; // Importar a imagem

const App = () => {
    const [filter, setFilter] = useState('');
    const [selectedState, setSelectedState] = useState('Todos');
    const [selectedEquipment, setSelectedEquipment] = useState(null); // Adicione esta linha para definir o estado
    const [positions, setPositions] = useState(getEquipmentDetails()); // Mover para o estado
    const [newEquipmentLocation, setNewEquipmentLocation] = useState(null); // Para armazenar a nova localização

    // Filtra os equipamentos com base no termo de pesquisa e no estado selecionado
    const filteredPositions = positions.filter(position => {
        const matchesSearch = position.displayName.toLowerCase().includes(filter.toLowerCase()); // Usar displayName
        const matchesState = selectedState === 'Todos' || position.status === selectedState;
        return matchesSearch && matchesState;
    });

    const handleAddEquipment = useCallback(async (newEquipment) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newEquipment.address)}`);
            const locationData = response.data[0];

            if (locationData) {
                const { lat, lon } = locationData;
                setPositions(prevPositions => [
                    ...prevPositions,
                    { 
                        ...newEquipment, 
                        id: Date.now().toString(), 
                        lat: parseFloat(lat),
                        lon: parseFloat(lon),
                        displayName: `${newEquipment.name} (Modelo: ${newEquipment.modelName})`, // Atualiza para incluir o Nome do Modelo
                        address: newEquipment.address
                    }
                ]);
            } else {
                console.error("Endereço não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar a localização:", error);
        }
    }, []);

    const handleRemoveEquipment = useCallback((id) => {
        setPositions(prevPositions => prevPositions.filter(position => position.id !== id));
    }, []);

    const handleFilter = useCallback((filterValue) => {
        setFilter(filterValue);
    }, []);

    const handleStatusChange = useCallback((status) => {
        setSelectedState(status);
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <img src={logo} alt="Logo Aiko" className="header-logo" />
            </header>
            <div className="filter-container">
                <EquipmentFilter onFilter={handleFilter} onStatusChange={handleStatusChange} />
            </div>
            <div className="map-container">
                <Map 
                    positions={filteredPositions.length > 0 ? filteredPositions : positions} 
                    onMarkerClick={setSelectedEquipment} 
                    onRemove={handleRemoveEquipment} 
                    newEquipmentLocation={newEquipmentLocation} 
                />
            </div>
            <div className="add-equipment-header">
                <h2>Adicionar Novo Equipamento</h2>
            </div>
            <div className="equipment-form-container">
                <EquipmentForm onAdd={handleAddEquipment} location={newEquipmentLocation} />
            </div>
            <EquipmentDetails equipment={selectedEquipment} onClose={() => setSelectedEquipment(null)} />
            <footer className="app-footer">
                <p>
                    Gustavo Dantas - 
                    <a href="https://github.com/GoldSonBR" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        GitHub
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default App;
