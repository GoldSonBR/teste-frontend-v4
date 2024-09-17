import React from 'react';

const EquipmentDetails = ({ equipment, onClose }) => {
    if (!equipment) return null; // Não exibe nada se não houver equipamento selecionado

    return (
        <div className="equipment-details-container"> {/* Adicionada classe */}
            <h2>{equipment.displayName}</h2>
            <p><strong>Status:</strong> {equipment.status}</p>
            <p>
                <span style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: equipment.color,
                    borderRadius: '50%', // Para um círculo
                    marginLeft: '10px'
                }}></span>
            </p>
            <p><strong>Modelo:</strong> {equipment.modelName}</p>
            <button onClick={onClose} style={{ marginTop: '10px' }}>Fechar</button>
        </div>
    );
};

export default EquipmentDetails;
