import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from './feed.service';
import { Post } from './post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  posts: Post[];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.posts = this.feedService.getPosts();
  }
}
