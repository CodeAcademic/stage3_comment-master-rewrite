import PostingDto from "../../service/dto/PostingDto";
import { question } from "readline-sync";
import CommentDto from "../../service/dto/CommentDto";
import CommentService from "../../service/CommentService";
import ServiceLogicLycler from "../../logic/ServiceLogicLycler";

class PostingView {
    posting: PostingDto;
    commentService: CommentService;

    constructor(inputPosting: PostingDto) {
        const serviceFactory = ServiceLogicLycler.shareInstance();
        this.posting = inputPosting;
        this.commentService = serviceFactory.createCommentService();
    }

    showMenu(): void {
        let inputNumber = 0;
        while (true) {
            this.displayMainMenu();
            inputNumber = this.selectMenu();
            switch (inputNumber) {
                case 1:
                    this.registerComment();
                    break;
                case 2:
                    this.findAllCommnents();
                    break;
                case 0:
                    return;
                default:
                    console.log('Choose Again!');
            }
        }
    }

    displayMainMenu(): void {
        console.clear();
        console.log('.....................');
        console.log(' [Posting Detail]');
        console.log('    title: ' + this.posting.title);
        console.log('    writer: ' + this.posting.writerEmail);
        console.log('    contents: ' + this.posting.contents);
        console.log('    written date: ' + this.posting.writtenDate);
        console.log('.........................');
        console.log(' 1. Register a commnet');
        console.log(' 2. Find All comments');
        console.log('........................');
        console.log(' 0. Previous');
        console.log('........................');
    }

    registerComment(): void {
        const writer = question(' comment writer: ');
        const contents = question(' comment contents: ');
        const commentDto = new CommentDto(writer, contents);
        commentDto.usid = this.commentService.register(this.posting.usid, commentDto);
        console.log('\n> Registered a comment --> ', commentDto);
    }

    findAllCommnents(): void {
        let comments = this.commentService.findByPostingId(this.posting.usid);
        let inputNumber = 0;

        console.clear();
        console.log('....................');
        console.log(' [Posting : ' + this.posting.title + ']');
        console.log('....................')
        console.log(' Comments ==>');
        for (let idx in comments) {
            console.log(' ' + comments[idx].contents);
        }
        console.log('.....................');
        console.log(' 0. Previous');
        console.log('.....................')
        inputNumber = this.selectKey();
        if (inputNumber == 0) {
            return;
        }
    }

    selectKey(): number {
        const answer = question('Select number : ');
        const key = parseInt(answer);
        if (key == 0) {
            return key;
        } else {
            console.log('it\'s a invalid number --> ' + key);
            return -1;
        }
    }

    selectMenu(): number {
        const answer = question('Select number : ');
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 2) {
            return menuNumber;
        } else {
            console.log('it\'s a invalid number --> ' + menuNumber);
            return -1;
        }
    }
}


export default PostingView;