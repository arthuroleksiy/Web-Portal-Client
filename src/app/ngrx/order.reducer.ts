import { Order } from './../interfaces/Order';
import { Action } from '@ngrx/store';

export const ADD_ORDER = 'ADD_ORDER';

export function addOrderReducer(state: Order[] = [], action) {
  switch (action.type) {
    case ADD_ORDER:
        return [...state, action.payload];
    default:
        return state;
    }
}
