import SocialBoard from "../../step1/entity/board/SocialBoard";
import TravelClub from "../../step1/entity/club/TravelClub";
import BoardService from "../service/BoardService";
import BoardDto from "../service/dto/BoardDto";
import MapStorage from "./storage/MapStorage";


class BoardServiceLogic implements BoardService {

    boardMap: Map<string, SocialBoard>;
    clubMap: Map<string, TravelClub>;

    constructor() {
        this.boardMap = MapStorage.getInstance().boardMap;
        this.clubMap = MapStorage.getInstance().clubMap;
    }

    register(boardDto: BoardDto): string {
        const boardId = boardDto.clubId;
        const targetBoard = this.boardMap.get(boardId);

        if (targetBoard) {
            throw new Error('Board already exists in the club --> ' + targetBoard.name);
        }

        const clubFound = this.clubMap.get(boardId);

        if (!clubFound) {
            throw new Error('No such club with id: ' + boardId);
        }

        const adminMembership = clubFound.getMembershipBy(boardDto.adminEmail);

        if (!adminMembership) {
            throw new Error('In the club, No such member with admin\'s email --> ' + boardDto.adminEmail);
        }

        const board = boardDto.toBoard();
        this.boardMap.set(boardId, board);

        return boardId;
    }

    find(boardId: string): BoardDto {
        const board = this.boardMap.get(boardId);

        if (!board) {
            throw new Error('No such board with id --> ' + boardId);
        }
        return BoardDto.fromEntity(board);
    }

    findByName(boardName: string): BoardDto[] {
        
        const boards = Array.from(this.boardMap.values());

        if (!boards || !boards.length) {
            throw new Error('No boards in the storage');
        }

        const boardDtos = boards.filter(board => board.name === boardName).map(board => BoardDto.fromEntity(board));

        if (!boardDtos.length) {
            throw new Error('No such board with name --> ' + boardName);
        }
        return boardDtos;
    }

    findByClubName(clubName: string): BoardDto | null {
        
        const clubs = Array.from(this.clubMap.values());
        const foundClub = clubs.find((club) => club.name === clubName);

        if (!foundClub) {
            throw new Error('No such club with name: ' + clubName);
        }
        const board = this.boardMap.get(foundClub.getId());
        return board ? BoardDto.fromEntity(board) : null;
    }

    modify(boardDto: BoardDto): void {
        
        const boardId = boardDto.clubId;
        const targetBoard = this.boardMap.get(boardId);

        if (!targetBoard) {
            throw new Error('No such board with id --> ' + boardDto);
        }

        if (!boardDto.name) {
            boardDto.name = targetBoard.name;
        }

        if (!boardDto.adminEmail) {
            boardDto.adminEmail = targetBoard.adminEmail;
        }

        const foundClub = this.clubMap.get(boardDto.clubId);

        if (!foundClub) {
            throw new Error('No such club with id --> ' + boardDto.clubId);
        }

        const membership = foundClub.getMembershipBy(boardDto.adminEmail);

        if (!membership) {
            throw new Error('In the club, No such member with admin\'s email --> ' + boardDto.adminEmail);
        }
        this.boardMap.set(boardId, boardDto.toBoard());
    }

    remove(boardId: string): void {
        const foundBoard = this.boardMap.get(boardId);

        if (!foundBoard) {
            throw new Error('No such board with id --> ' + boardId);
        }
        this.boardMap.delete(boardId);
    }
}


export default BoardServiceLogic;