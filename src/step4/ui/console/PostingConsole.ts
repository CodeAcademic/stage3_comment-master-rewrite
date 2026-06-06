import { question } from "readline-sync";
import ServiceLogicLycler from "../../logic/ServiceLogicLycler";
import BoardService from "../../service/BoardService";
import BoardDto from "../../service/dto/BoardDto";
import PostingDto from "../../service/dto/PostingDto";
import PostingService from "../../service/PostingService";

class PostingConsole {

    currentBoard: BoardDto | null = null;

    boardService: BoardService;
    postingService: PostingService;

    constructor() {
        const serviceFactory = ServiceLogicLycler.shareInstance();

        this.boardService = serviceFactory.createBoardService();
        this.postingService = serviceFactory.createPostingService();
    }

    hasCurrentBoard(): boolean {
        return this.currentBoard !== null;
    }

    requestCurrentBoardName(): string | null {
        let clubName = null;

        if (this.hasCurrentBoard() && this.currentBoard) {
            clubName = this.currentBoard.name;
        }
        return clubName;
    }

    findBoard(): void {
        let boardFound = null;

        while (true) {
            const clubName = question('\n club name to find a board (0. Posting menu): ');

            if (clubName === '0') {
                break;
            }

            try {
                boardFound = this.boardService.findByClubName(clubName);
                console.log('\n> Found board: ', boardFound);
                break;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
            boardFound = null;
        }
        this.currentBoard = boardFound;
    }

    register(): void {
        if (!this.hasCurrentBoard()) {
            console.log('> No target board yet. Find target board first.');
            return;
        }

        while (true) {
            const title = question('\n posting title (0. Posting menu): ');

            if (title === '0') {
                return;
            }
            const writerEmail = question(' posting writerEmail: ');
            const contents = question(' posting contents: ');

            try {
                if (this.currentBoard) {
                    const postingDto = new PostingDto(title, writerEmail, contents);

                    postingDto.usid = this.postingService.register(this.currentBoard.clubId, postingDto);
                    console.log('\n> Registered a posting --> ', postingDto);
                }
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
    }

    findByBoardId(): void {
        if (!this.hasCurrentBoard()) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        try {
            if (this.currentBoard) {
                const postings = this.postingService.findByBoardId(this.currentBoard.clubId);

                let index = 0;

                for (const postingDto of postings) {
                    console.log(`[${index}] , ` + postingDto.postingDtoInfo);
                    index++;
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Error: ${e.message}`);
            }
        }
    }

    find(): void {
        if (!this.hasCurrentBoard()) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        let postingDto = null;

        while (true) {
            const postingId = question('\n posting id to find (0. Posting menu): ');

            if (postingId === '0') {
                break;
            }

            try {
                postingDto = this.postingService.find(postingId);
                console.log('\n> Found posting: ', postingDto);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
    }

    findOne() {
        if (!this.hasCurrentBoard()) {
            console.log('> No target club yet. find target club first.');
            return null;
        }

        let postingDto = null;

        while (true) {
            const postingId = question('\n posting id to find (0. Posting menu): ');

            if (postingId === '0') {
                break;
            }

            try {
                postingDto = this.postingService.find(postingId);
                console.log('\n> Found posting: ', postingDto);
                break;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
            postingDto = null;
        }
        return postingDto;
    }

    modify(): void {
        const targetPosting = this.findOne();

        if (!targetPosting) {
            return;
        }

        const newTitle = question('\n new posting title (0.Posting menu, Enter. no change): ');

        if (newTitle === '0') {
            return;
        }
        targetPosting.title = newTitle;

        const contents = question(' new posting contents (Enter. no change): ');
        targetPosting.contents = contents;

        try {
            this.postingService.modify(targetPosting);
            console.log('\n> Modified Posting : ', targetPosting);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Error: ${e.message}`);
            }
        }
    }

    remove(): void {
        const targetPosting = this.findOne();

        if (!targetPosting) {
            return;
        }

        const confirmStr = question('Remove this posting in the board? (Y:yes, N:no): ');

        if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
            console.log('\n> Removing a posting -->' + targetPosting.title);
            this.postingService.remove(targetPosting.usid);
        } else {
            console.log(' > Remove cancelled, this posting is safe --> ' + targetPosting.title);
        }
    }
}

export default PostingConsole;