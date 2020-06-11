import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as Selector from '../state/index';
import * as Actions from '../state/store.action';
import { fakeData, fakeData2, article } from '../dash-board/data';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  todayNewsData: any;

  constructor(
    private store: Store,

  ) { }

  ngOnInit() {
    this.store.dispatch(Actions.getArticle({ article: article }));

    this.store.pipe(select(Selector.selectFeatureProperty)).subscribe((data) => {
      console.log(data)
      this.todayNewsData = data;
    }); 
  }

}
