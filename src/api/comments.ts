import { CrudEndpoint } from '~/api/utils';
import { CreateCommentDto, Comment } from '~/api/solutions';

export class CommentsEndpoint extends CrudEndpoint<Comment, CreateCommentDto, any> {
  constructor() {
    super('/comment');
  }
}

export const comments = new CommentsEndpoint();
