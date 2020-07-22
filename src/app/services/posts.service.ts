import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";

import { Posts } from '../posts/posts.model'; 
import { Subject } from "rxjs";
import { map } from 'rxjs/operators'
import { stringify } from "querystring";

@Injectable({providedIn: 'root'})

export class PostsService {
    constructor(private http: HttpClient, public utilSvc: UtilitiesService, private router: Router) {}

    posts: Posts[] = [];
    activePosts = new Subject<Posts[]>();

    getPosts() {
        // this.spinner.show();
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
        // this.spinner.hide();
    }

    findPost(id: string) {
        return this.http.get<{_id: string, title: string, body: string}>('http://localhost:3000/api/posts/' + id);
    }

    deletePost(id: string) {
        this.http.delete('http://localhost:3000/api/posts/' + id)
        .subscribe(() => {
            const deletedPosts = this.posts.filter(deleted => deleted.id !== id)
            this.posts = deletedPosts;
            this.activePosts.next([...deletedPosts]);
        });
    }

    getActivePostListener() {
        return this.activePosts.asObservable();
    }

    updatePost(id: string, title: string, body: string) {
        // this.spinner.show();
        const post: Posts = {
            id: id,
            title: title,
            body: body
        }
        this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(response => {
            const updatedPost = [...this.posts];
            const originalIndex = updatedPost.findIndex(p => p.id === post.id)
            updatedPost[originalIndex] = post;
            this.posts = updatedPost;
            this.afterUpdates();
        });
        // this.spinner.hide();
    }

    addPosts(title: string, body: string) {
        const post: Posts = {id: null, title: title, body: body};
        this.http.post<{id: string, title: string, body: string}>('http://localhost:3000/api/posts', post)
            .subscribe((resp) => {
                const postId = resp.id;
                post.id = postId;
                this.posts.push(post);
                this.afterUpdates();
            });
    }

    afterUpdates() {
        this.activePosts.next([...this.posts])
            this.router.navigate(["/"]);
    }

    cancelPost() {
        this.router.navigate(['/'])
    }
}