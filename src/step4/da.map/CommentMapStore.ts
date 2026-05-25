import Comment from "../../step1/entity/board/Comment";
import CommentStore from "../store/CommentStore";
import MemoryMap from "./io/MemoryMap";


class CommentMapStore implements CommentStore { 

    commentMap: Map<string, Comment>; 

    constructor() {
        this.commentMap = MemoryMap.getInstance().commentMap;
    }

    create(comment: Comment): string {
        const targetCommit = this.commentMap.get(comment.getId());

        if (targetCommit) {
            throw new Error('\n> Already exists: ' + targetCommit);
        }
        this.commentMap.set(comment.getId(), comment);

        return comment.getId();
    }

    retieve(commentId: string): Comment | null {
        return this.commentMap.get(commentId) || null;
    }

    retieveByPostingId(postingId: string): Comment[] {
        const comments = Array.from(this.commentMap.values());
        return comments.filter(comment => comment.postingId === postingId);
    }

    update(comment: Comment): void {
        this.commentMap.set(comment.getId(), comment);
    }

    delete(commentId: string): void {
        this.commentMap.delete(commentId)
    }

    exists(commentId: string): boolean {
        return this.commentMap.get(commentId) !== null;
    }
}

export default CommentMapStore;