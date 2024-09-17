import equipmentPositionHistory from './equipmentPositionHistory.json';
import equipmentData from './equipment.json';
import equipmentStateData from './equipmentState.json';
import equipmentStateHistoryData from './equipmentStateHistory.json';
import equipmentPositionHistoryData from './equipmentPositionHistory.json'; // Adicione esta linha
import equipmentModelData from './equipmentModel.json'; // Importar o arquivo de modelos

export const getPositions = () => {
    return equipmentPositionHistory.map(item => item.positions).flat();
};

export const getEquipmentDetails = () => {
    return equipmentData.map(equipment => {
        // Encontrar o modelo do equipamento correspondente
        const model = equipmentModelData.find(model => model.id === equipment.equipmentModelId);

        // Encontrar o histórico de estados do equipamento
        const stateHistory = equipmentStateHistoryData.find(history => history.equipmentId === equipment.id);
        const currentState = stateHistory ? stateHistory.states[stateHistory.states.length - 1] : null;
        const stateDetails = currentState ? equipmentStateData.find(state => state.id === currentState.equipmentStateId) : null;

        // Encontrar a posição mais recente do equipamento
        const positionHistory = equipmentPositionHistoryData.find(history => history.equipmentId === equipment.id);
        const latestPosition = positionHistory ? positionHistory.positions[positionHistory.positions.length - 1] : null;

        return {
            ...equipment,
            modelName: model ? model.name : 'Modelo Desconhecido', // Nome do modelo
            status: stateDetails ? stateDetails.name : 'Desconhecido',
            color: stateDetails ? stateDetails.color : '#000000',
            lat: latestPosition ? latestPosition.lat : null,
            lon: latestPosition ? latestPosition.lon : null,
            displayName: model ? `${model.name} (${equipment.name})` : equipment.name // Nome para exibição
        };
    }).filter(position => position.lat && position.lon); // Filtra apenas os que têm lat e lon
};