import { UPDATE_ATTACKER_DATA, UPDATE_DEFENDER_DATA, CLEAR_DATA } from './calculator.constants';

export const actionUpdateAttackerData = changes => ({ type: UPDATE_ATTACKER_DATA, changes });
export const actionUpdateDefenderData = changes => ({ type: UPDATE_DEFENDER_DATA, changes });
export const actionClearData = () => ({ type: CLEAR_DATA });
