import Posting from "../../../step1/entity/board/Posting";
import SocialBoard from "../../../step1/entity/board/SocialBoard";
import DateUtil from "../../../util/DateUtil";


class PostingDto {
    usid: string = '';
    title: string = '';
    writerEmail: string = '';
    contents: string = '';
    writtenDate: string = '';
    readCount: number = 0;

    constructor(title: string, writerEmail: string, contents: string) {
        this.title = title;
        this.writerEmail = writerEmail;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    static fromEntity(posting: Posting): PostingDto {
        const postingDto = new PostingDto(posting.title, posting.writerEmail, posting.contents);

        postingDto.usid = posting.usid;
        postingDto.writtenDate = posting.writtenDate;
        postingDto.readCount = posting.readCount;

        return postingDto;
    }

    get postingDtoInfo(): string {
        return `Posting id: ${this.usid}, title: ${this.title}, writer email: ${this.writerEmail}, read count: ${this.readCount}, written date: ${this.writtenDate}, contents: ${this.contents}`;
    }

    toPostingInBoard(board: SocialBoard): Posting {
        const posting = new Posting(board.nextPostingId, board.getId(), this.title, this.writerEmail, this.contents);

        posting.writtenDate = this.writtenDate;
        posting.readCount = this.readCount;

        return posting;
    }

    toPostingIn(postingId: string, boardId: string): Posting {
        const posting = new Posting(postingId, boardId, this.title, this.writerEmail, this.contents);

        posting.writtenDate = this.writtenDate;
        posting.readCount = this.readCount;

        return posting;
    }
}

export default PostingDto;