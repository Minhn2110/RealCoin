import * as Actions from './store.action';

import { createReducer, on } from '@ngrx/store';

export const initialState: any = {
  article: '',
};
const mainReducer = createReducer(
  initialState,
  on(Actions.getArticle, (state, {article}) => (
    console.log('state', state, article),
    { ...state, article: article, home: 5 }
    )),
);

export function reducer(state: any | undefined, action: any) {
  return mainReducer(state, action);
}