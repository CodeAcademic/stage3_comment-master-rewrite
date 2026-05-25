import Comment from "../../step1/entity/board/Comment";

interface CommentStore {
    create(comment: Comment): string;
    retieve(commentId: string): Comment | null;
    retieveByPostingId(postingId: string): Comment[];
    update(comment: Comment): void;
    delete(commentId: string): void;

    exists(commentId: string): boolean;
}


export default CommentStore;