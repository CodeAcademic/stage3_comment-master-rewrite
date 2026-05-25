import DateUtil from "../../../util/DateUtil";
import Comment from "../../../step1/entity/board/Comment";
import Posting from "../../../step1/entity/board/Posting";


class CommentDto {
    usid: string = '';
    writer: string = '';
    contents: string = '';
    writtenDate: string = '';

    constructor(writer: string, contents: string) {
        this.writer = writer;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    static fromEntity(comment: Comment): CommentDto {
        const commentDto = new CommentDto(comment.writer, comment.contents);
        commentDto.writtenDate = comment.writtenDate;
        commentDto.usid = comment.usid;
        return commentDto;
    }

    get commentDtoInfo(): string {
        return `Comment id: ${this.usid}, writer: ${this.writer}, contents: ${this.contents}, written date: ${this.writtenDate}`;
    }

    toCommentInPosting(posting: Posting): Comment {
        const comment = new Comment(posting.nextCommentId, posting.getId(), this.writer, this.contents);
        return comment;
    }
}


export default CommentDto;