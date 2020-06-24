import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Posts } from '../posts/posts.model'; 
import { Subject } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})

export class PostsService {
    constructor(private http: HttpClient) {}

    private posts: Posts[] = [];
    activePosts = new Subject<Posts[]>()

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map(data => {
            return data.posts.map(post => {
                return {
                    title: post.title,
                    body: post.body,
                    id: post._id
                }
            })
        }))
        .subscribe(newValues => {
                this.posts = newValues;
                this.activePosts.next([...this.posts]);
            },
            (err) => {}
        );
    }

    deletePost(id: string) {
        this.http.delete('http://localhost:3000/api/posts/' + id)
        .subscribe(() => {
            console.log('deleted post #', id);
            const deletedPosts = this.posts.filter(deleted => deleted.id !== id)
            this.posts = deletedPosts;
            this.activePosts.next([...deletedPosts]);
        });
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