import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Posts } from '../../posts/posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html'
})

export class PostListComponent implements OnInit, OnDestroy{
    constructor(public postSvc: PostsService) {}

    posts: Posts[] = [];
    subscription: Subscription;

    ngOnInit() {
        this.postSvc.getPosts();
        this.subscription = this.postSvc.getActivePostListener().subscribe((posts: Posts[]) => {
            this.posts = posts;
        });
    }

    delete(id: string) {
        this.postSvc.deletePost(id);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}