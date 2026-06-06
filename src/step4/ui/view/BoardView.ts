import BoardDto from "../../service/dto/BoardDto";
import { question } from "readline-sync";
import PostingDto from "../../service/dto/PostingDto";
import PostingService from "../../service/PostingService";
import ServiceLogicLycler from "../../logic/ServiceLogicLycler";
import PostingView from "./PostingView";


class BoardView {
    board: BoardDto;
    postingService: PostingService;

    constructor(inputBoard: BoardDto) {
        const serviceFactory = ServiceLogicLycler.shareInstance();
        this.board = inputBoard;
        this.postingService = serviceFactory.createPostingService();
    }

    showMenu(): void {
        let inputNumber = 0;
        while (true) {
            this.displayMainMenu();
            inputNumber = this.selectMenu();
            switch (inputNumber) {
                case 1:
                    this.registerPosting();
                    break;
                case 2:
                    this.findAllPosting();
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
        console.log('.......................');
        console.log(' [Board Detail]');
        console.log('    name: ' + this.board.name);
        console.log('    admin: ' + this.board.adminEmail);
        console.log('    create: ' + this.board.createDate);
        console.log('......................');
        console.log(' 1. Register a posting');
        console.log(' 2. Find All postings');
        console.log('......................')
        console.log('0. Previous');
        console.log('......................')
    }

    registerPosting(): void {

        const title = question('\n posting title: ');
        const writerEmail = question(' posting writerEmail: ');
        const contents = question(' posting contents: ');
        const postingDto = new PostingDto(title, writerEmail, contents);
        postingDto.usid = this.postingService.register(this.board.clubId, postingDto);
        console.log('\n> Registered a posting --> ', postingDto);
    }

    findAllPosting(): void {

        let postings = this.postingService.findByBoardId(this.board.clubId);
        let inputNumber = 0;
        console.clear();
        console.log('......................');
        console.log(' [Board : ' + this.board.name + '] ');
        console.log('......................');
        console.log(' Posting List ==>');
        for (let idx in postings) {
            let menuNumber = parseInt(idx) + 1;
            console.log(' ' + menuNumber + '. ' + postings[idx].title);
        }

        console.log('.............................');
        console.log(' 0. Previous');
        console.log('.............................');
        inputNumber = this.selectPostingNumber(postings.length);

        if (inputNumber == 0) {
            return;
        }

        let selectPosting = postings[inputNumber - 1];
        let postingView = new PostingView(selectPosting);
        postingView.showMenu();
    }

    selectPostingNumber(postingSize: number): number {
        const answer = question('Select Posting number : ');
        const postingNumber = parseInt(answer);
        if (postingNumber >= 0 && postingNumber <= postingSize) {
            return postingNumber;
        } else {
            console.log('it\'s a invalid number --> ' + postingNumber);
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

export default BoardView;