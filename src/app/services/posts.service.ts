import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Posts } from '../posts/posts.model'; 
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsService {
    constructor(private http: HttpClient) {}

    private posts: Posts[] = [];
    activePosts = new Subject<Posts[]>()

    getPosts() {
        this.http.get<{message: string, posts: Posts[]}>('http://localhost:3000/api/posts').subscribe(
            (data) => {
                this.posts = data.posts;
                this.activePosts.next([...this.posts]);
            },
            (err) => {}
        );
    }

    deletePost(index: number) {
        this.posts.splice(index, 1);
        this.activePosts.next([...this.posts]);
    }

    getActivePostListener() {
        return this.activePosts.asObservable();
    }

    addPosts(title: string, body: string) {
        const post: Posts = {id: null, title: title, body: body};
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
            .subscribe((resp) => {
                console.log(resp.message);
                this.posts.push(post);
                this.activePosts.next([...this.posts]);
            });
    }
}