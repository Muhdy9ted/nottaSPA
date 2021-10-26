import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/_shared/services/post.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CreatePostDto } from 'src/app/_shared/models/create-post-dto.model';
import { Post } from 'src/app/_shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  spin = false;
  error;
  posts: Post[];

  constructor(public postService: PostService, private alertify: AlertifyService, private router: Router) { }
  ngOnInit() {
    this.getPosts();
  }

  onSubmit(form: NgForm) {
    this.spin = true;
    this.postService.createPost().subscribe((response) => {
      this.spin = false;
      form.reset();
      this.postService.createPostDto = new CreatePostDto();
    }, error => {
      this.spin = false;
      this.alertify.error(`sending post Failed, please retry`);
    }, () => {
      this.error = '';
      this.router.navigate(['/posts']);
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((response) => {
      console.log(response);
      this.posts = response;
      console.log(this.posts);
    });
  }
}
