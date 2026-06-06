import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import BoardService from "../service/BoardService";
import BoardDto from "../service/dto/BoardDto";
import BoardStore from "../store/BoardStore";
import ClubStore from "../store/ClubStore";


class BoardServiceLogic implements BoardService {

    boardStore: BoardStore;
    clubStore: ClubStore;

    constructor() {
        this.boardStore = ClubStoreMapLycler.getInstance().requestBoardStore();
        this.clubStore = ClubStoreMapLycler.getInstance().requestClubStore();
    }

    register(boardDto: BoardDto): string {

        const boardId = boardDto.clubId;
        const targetBoard = this.boardStore.retrieve(boardId);

        if (targetBoard) {
            throw new Error('Board already exists in the club --> ' + targetBoard.name);
        }

        const clubFound = this.clubStore.retrieve(boardId);

        if (!clubFound) {
            throw new Error('No such club with id: ' + boardId);
        }

        const adminEmail = clubFound.getMembershipBy(boardDto.adminEmail);
        if (!adminEmail) {
            throw new Error('In the club, No such member with admin\'s email --> ' + boardDto.adminEmail);
        }
        return this.boardStore.create(boardDto.toBoard());
    }

    find(boardId: string): BoardDto {
        const board = this.boardStore.retrieve(boardId);

        if (!board) {
            throw new Error('No such board with id -->' + boardId);
        }
        return BoardDto.fromEntity(board);
    }

    findByName(boardName: string): BoardDto[] {
        const boards = this.boardStore.retrieveByName(boardName);
        if (!boards.length) {
            throw new Error('No such board with name --> ' + boardName);
        }
        return boards.map(board => BoardDto.fromEntity(board));
    }

    findAll(): BoardDto[] {
        const boards = this.boardStore.retrieveAll();
        return boards.map(board => BoardDto.fromEntity(board));
    }

    findByClubName(clubName: string): BoardDto | null {
        const foundClub = this.clubStore.retrieveByName(clubName);

        if (!foundClub) {
            throw new Error('No such club with name: ' + clubName);
        }

        const board = this.boardStore.retrieve(foundClub.getId());
        return board ? BoardDto.fromEntity(board) : null;
    }

    modify(boardDto: BoardDto): void {
        const boardId = boardDto.clubId;
        const targetBoard = this.boardStore.retrieve(boardId);

        if (!targetBoard) {
            throw new Error('No such board with id --> ' + boardDto.clubId);
        }

        if (boardDto.name) {
            targetBoard.name = boardDto.name;
        }

        if (boardDto.adminEmail) {
            targetBoard.adminEmail = boardDto.adminEmail;
        }

        const foundClub = this.clubStore.retrieve(boardDto.clubId);

        if (!foundClub) {
            throw new Error('No such club with id --> ' + boardDto.clubId);
        }
        
        const membership = foundClub.getMembershipBy(boardDto.adminEmail);

        if (!membership) {
            throw new Error('In the club, No such member with admin\'s email --> ' + boardDto.adminEmail);
        }
        this.boardStore.update(boardDto.toBoard());
    }

    remove(boardId: string): void {
        
        const foundBoard = this.boardStore.retrieve(boardId);

        if (!foundBoard) {
            throw new Error('No such board with id --> ' + boardId);
        }
        this.boardStore.delete(boardId);
    }
}

export default BoardServiceLogic;