import { createAction, props } from '@ngrx/store';

export const getArticle = createAction('[Article] Get Article List', props<{article: any}>());