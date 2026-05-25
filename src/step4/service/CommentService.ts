import CommentDto from "./dto/CommentDto";

interface CommentService {
    register(postingId: string, commentDto: CommentDto): string;
    find(commentId: string): CommentDto;
    findByPostingId(postingId: string): CommentDto[];
    modify(commentDto: CommentDto): void;
    remove(commentId: string): void;
}


export default CommentService;