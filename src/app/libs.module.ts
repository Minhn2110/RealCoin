import { NgModule } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [],
  imports: [
    CountUpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
   ],
  exports: [
    CountUpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
})
export class LibraryModule {}