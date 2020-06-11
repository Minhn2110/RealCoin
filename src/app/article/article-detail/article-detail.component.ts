import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as Selector from '../../state/index';
import * as Actions from '../../state/store.action';
import { fakeData, fakeData2, article } from '../../dash-board/data';

import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articleId: string;
  articleDetail: object;
  articleList: any[] = [];
  constructor(
    private store: Store,
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService,


  ) { }

  ngOnInit() {

    this.articleId = this.route.snapshot.paramMap.get('id');
    console.log(this.articleId)

    this.store.pipe(select(Selector.selectFeatureProperty)).subscribe((data) => {
      console.log('data', data);
      if (data && data.length > 0) {
        this.articleList = data;
        this.articleDetail = this.articleList.filter((item => item.Id == this.articleId));
        console.log(this.articleDetail);
      } else {
        this.articleApi();
      }
    }); 
  }
  articleApi() {
    this.authenticationService.getArticle().subscribe(data => {
      this.store.dispatch(Actions.getArticle({ article: data }));
    });
  }

}
