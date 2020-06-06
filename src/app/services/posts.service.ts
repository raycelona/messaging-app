import { Injectable } from "@angular/core";

import { Posts } from '../posts/posts.model'; 
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsService {
    private posts: Posts[] = [];
    activePosts = new Subject<Posts[]>()

    getPosts() {
        return [...this.posts];
    }

    deletePost(index: number) {
        this.posts.splice(index, 1);
        this.activePosts.next([...this.posts]);
    }

    getActivePostListener() {
        return this.activePosts.asObservable();
    }

    addPosts(title: string, body: string) {
        const post: Posts = {title: title, body: body};
        this.posts.push(post);
        this.activePosts.next([...this.posts])
    }
}