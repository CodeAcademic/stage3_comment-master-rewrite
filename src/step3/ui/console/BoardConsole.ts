import { question } from "readline-sync";
import ServiceLogicLycler from "../../logic/ServiceLogicLycler";
import BoardService from "../../service/BoardService";
import ClubService from "../../service/ClubService";
import BoardDto from "../../service/dto/BoardDto";
import TravelClubDto from "../../service/dto/TravelClubDto";


class BoardConsole {

    clubService: ClubService;
    boardService: BoardService;

    constructor() {
        this.clubService = ServiceLogicLycler.shareInstance().createClubService();
        this.boardService = ServiceLogicLycler.shareInstance().createBoardService();
    }

    findClub(): TravelClubDto | null {

        let clubFound = null;

        while (true) {
            const clubName = question('\n club name to find (0.Member menu): ');

            if (clubName === '0') {
                break;
            }

            try {
                clubFound = this.clubService.findByName(clubName);
                console.log('\n> Found club: ', clubFound);
                break;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
            clubFound = null;
        }
        return clubFound;
    }

    register(): void {

        while (true) {
            const targetclub = this.findClub();

            if (!targetclub) {
                return;
            }

            const boardName = question('\n board name to register (0.Board menu): ');

            if (boardName === '0') {
                return;
            }
            const adminEmail = question('\n admin member\'s email: ');

            try {
                const newBoardDto = new BoardDto(targetclub.usid, boardName, adminEmail);

                this.boardService.register(newBoardDto);
                console.log('\n> Registered board: ', newBoardDto);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
    }

    findByName(): void {
        const boardName = question('\n board name to find (0.Board menu): ');

        if (boardName === '0') {
            return;
        }

        try {
            const boardDtos = this.boardService.findByName(boardName);

            let index = 0;

            for (const boardDto of boardDtos) {
                console.log(`\n [${index}]`, boardDto);
                index++;
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Error: ${e.message}`);
            }
        }
    }

    findOne(): BoardDto | null {
        let boardFound = null;

        while (true) {
            const clubName = question('\n club name to find a board (0.Board menu): ');

            if (clubName === '0') {
                break;
            }

            try {
                boardFound = this.boardService.findByClubName(clubName);
                if (boardFound) {
                    console.log('\n> Found club: ', boardFound);
                }
                break;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
        return boardFound;
    }

    modify(): void {
        const targetBoard = this.findOne();

        if (!targetBoard) {
            return;
        }

        const newBoardName = question('\n new board name to modify (0.Board menu, Enter. no change): ');

        if (newBoardName === '0') {
            return;
        }
        targetBoard.name = newBoardName;

        const newAdminEmail = question('\n new admmin member\'s email (Enter. no change): ');

        targetBoard.adminEmail = newAdminEmail;

        try {
            this.boardService.modify(targetBoard);
            console.log('\n> Modified board: ', targetBoard);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Error: ${e.message}`);
            }
        }
    }

    remove(): void {
        const targetBoard = this.findOne();

        if (!targetBoard) {
            return;
        }

        const confirmStr = question('Remove this board? (Y:yes, N:no): ');

        if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
            console.log('\n> Removing a board --> ' + targetBoard.name);

            this.boardService.remove(targetBoard.clubId);
        } else {
            console.log('\n> Remove cancelled, your board is safe. -->', targetBoard.name);
        }
    }
}

export default BoardConsole;