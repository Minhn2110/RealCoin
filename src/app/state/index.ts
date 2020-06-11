import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getArticle } from './store.action';

const getMainReducerState = createFeatureSelector<any>('reducer');

export const selectFeatureProperty = createSelector(
  getMainReducerState,
  (state: any) => state.article
);

