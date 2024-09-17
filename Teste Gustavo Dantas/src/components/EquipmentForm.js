import React, { useState } from 'react';

const EquipmentForm = ({ onAdd, location }) => {
    const [name, setName] = useState('');
    const [modelId, setModelId] = useState('');
    const [modelName, setModelName] = useState(''); // Novo estado para o Nome do Modelo
    const [status, setStatus] = useState('Operando'); // Status padrão
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && modelId && modelName && address) { // Verifica se todos os campos estão preenchidos
            onAdd({ name, equipmentModelId: modelId, modelName, status, address }); // Passa todas as informações
            setName('');
            setModelId('');
            setModelName(''); // Reseta o Nome do Modelo
            setStatus('Operando');
            setAddress('');
        }
    };

    // Função para determinar a cor do indicador
    const getStatusColor = () => {
        switch (status) {
            case 'Operando':
                return '#2ecc71';
            case 'Parado':
                return '#e74c3c';
            case 'Manutenção':
                return '#f1c40f';
            default:
                return 'gray';
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
            <form className="equipment-form" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}> {/* Alterado para alinhar os itens lado a lado */}
                <input
                    type="text"
                    placeholder="Nome do Equipamento"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '10px', margin: '5px' }}
                />
                <input
                    type="text"
                    placeholder="ID do Modelo"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    required
                    style={{ padding: '10px', margin: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Nome do Modelo" // Novo campo para o Nome do Modelo
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    required
                    style={{ padding: '10px', margin: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ padding: '10px', margin: '5px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '10px', margin: '5px' }}>
                        <option value="Operando">Operando</option>
                        <option value="Parado">Parado</option>
                        <option value="Manutenção">Manutenção</option>
                    </select>
                    <div style={{ width: '20px', height: '20px', backgroundColor: getStatusColor(), borderRadius: '50%', marginLeft: '10px' }} />
                </div>
                <button type="submit" style={{ padding: '10px', margin: '5px' }}>Adicionar Equipamento</button>
                {location && (
                    <p style={{ margin: '5px' }}>Localização selecionada: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
                )}
            </form>
        </div>
    );
};

export default EquipmentForm;
