import React, { useState } from 'react';

const EquipmentFilter = ({ onFilter, onStatusChange }) => { // Adicionei onStatusChange
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('Todos'); // Novo estado para o status

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onFilter(value); // Chama a função de filtragem
    };

    const handleStatusChange = (event) => { // Nova função para lidar com a mudança de status
        const value = event.target.value;
        setStatus(value);
        onStatusChange(value); // Chama a função de filtragem por status
    };

    return (
        <div className="equipment-filter">
            <input
                type="text"
                placeholder="Pesquisar equipamento..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={status} onChange={handleStatusChange}> {/* Adicionei o seletor de status */}
                <option value="Todos">Todos</option>
                <option value="Operando">Operando</option>
                <option value="Parado">Parado</option>
                <option value="Manutenção">Manutenção</option>
            </select>
        </div>
    );
};

export default EquipmentFilter;
