import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private posts: Post[] = [
    new Post('Green Park', 'United States', '/assets/images/post-1.png'),
    new Post('Walking in the street', 'United States', '/assets/images/post-2.png')
];

  constructor() {}

  addPost(post: Post) {
    this.posts.push(post);
  }

  getPosts() {
    return this.posts.slice();
  }
}
