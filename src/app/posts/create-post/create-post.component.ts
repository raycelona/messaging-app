import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../../services/posts.service';


@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./styles.css']
})
export class CreatePostComponent implements OnInit {

    constructor(private postSvc: PostsService) {}

    postTitle: string; 
    postBody: string;

    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.postSvc.addPosts(form.value.title, form.value.body);
        form.resetForm();
    }

    ngOnInit() {}
}