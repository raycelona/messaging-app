import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Posts } from '../posts.model';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./styles.css']
})
export class CreatePostComponent implements OnInit {

    constructor(private postSvc: PostsService, public route: ActivatedRoute) {}

    postTitle: string; 
    postBody: string;
    posts: Posts;
    version = 'create';
    id: string;

    onSavePost(form: NgForm) {
        if(form.invalid) {
            return;
        }
        if(this.version === 'create') {
            this.postSvc.addPosts(form.value.title, form.value.body);
        } else {
            this.postSvc.updatePost(this.id, form.value.title, form.value.body)
        }
        form.resetForm();
    }

    onCancelPost() {
        this.postSvc.cancelPost();
    }

    ngOnInit() {
        this.route.paramMap.subscribe((param: ParamMap) => {
            if(param.has('id')) {
                this.version = 'edit';
                this.id = param.get('id');
                this.postSvc.findPost(this.id).subscribe((postData) => {
                    this.posts = {id: postData._id, title: postData.title, body: postData.body}
                });
            } else {
                this.version = 'create';
                this.id = null;
            };
        });
    }
}