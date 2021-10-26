import { UserCred } from './user-cred.model';
import { Comment } from './comment.model';

export class Post {
    public comments: Comment[];
    public content: string;
    public id: number;
    public likes: number;
    public user: UserCred;
}
