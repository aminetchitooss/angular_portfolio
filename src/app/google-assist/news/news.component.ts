import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { News } from 'src/app/shared/models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() itemList: Observable<News[]>;

  newsList: News[] = []
  constructor(public ds: DataService) { }
  test = []
  ngOnInit() {
    this.itemList.subscribe(param => {
      if (param.length > 0) {
        this.newsList = param.map(res => ({ ...res, urlToImage: (this.ds.isNotNull(res.urlToImage) ? res.urlToImage : this.ds.IMAGE_PLACE_HOLDER) }))
        console.log(this.newsList)
      }
    })
  }

  openLink(pLink) {
    window.open(pLink, '_blank')
  }

}
