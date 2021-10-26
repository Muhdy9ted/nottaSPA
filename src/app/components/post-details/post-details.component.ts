import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_shared/models/post.model';
import { PostService } from 'src/app/_shared/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { CreatePostDto } from 'src/app/_shared/models/create-post-dto.model';
import { NgForm } from '@angular/forms';
import { CreateCommentDto } from 'src/app/_shared/models/create-comment-dto.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post;
  spin = false;
  error;

  constructor(public postService: PostService, private router: ActivatedRoute, private alertify: AlertifyService,
              private route: Router) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.router.snapshot.params.id).subscribe((response) => {
      console.log(response);
      this.post = response;
      console.log(response);
    });
  }

  onSubmit(form: NgForm) {
    this.spin = true;
    this.postService.createCommentDto.PostId = this.post.id;
    this.postService.createComment().subscribe((response) => {
      this.spin = false;
      form.reset();
      this.postService.createCommentDto = new CreateCommentDto();
    }, error => {
      this.spin = false;
      this.alertify.error(`sending comment Failed, please retry`);
    }, () => {
      this.error = '';
      this.route.navigate(['/posts']);
    });
  }

}
