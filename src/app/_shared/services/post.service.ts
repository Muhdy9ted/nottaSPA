import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreatePostDto } from '../models/create-post-dto.model';
import { Post } from '../models/post.model';
import { CreateCommentDto } from '../models/create-comment-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL = environment.apiUrl ;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userId: any;
  createPostDto: CreatePostDto = new CreatePostDto();
  createCommentDto: CreateCommentDto = new CreateCommentDto();
  posts: Post[];
  post: Post;

  constructor(public http: HttpClient) { }

  createPost() {
    return  this.http.post(this.baseURL + 'posts/', this.createPostDto).pipe(map((response: any) => {}));
  }

  getPosts() {
    return  this.http.get(this.baseURL + 'posts/').pipe(map((response: any) => {
      console.log(response);
      this.posts = response;
      console.log(this.posts);
      return this.posts;
    }));
  }

  getPost(id: number) {
    return  this.http.get(this.baseURL + 'posts/' + id).pipe(map((response: any) => {
      console.log(response);
      this.post = response;
      console.log(this.post);
      return this.post;
    }));
  }

  createComment() {
    return  this.http.post(this.baseURL + 'comments', this.createCommentDto);

  }

}
