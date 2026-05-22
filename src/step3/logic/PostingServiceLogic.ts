import Posting from "../../step1/entity/board/Posting";
import SocialBoard from "../../step1/entity/board/SocialBoard";
import TravelClub from "../../step1/entity/club/TravelClub";
import PostingDto from "../service/dto/PostingDto";
import PostingService from "../service/PostingService";
import MapStorage from "./storage/MapStorage";


class PostingServiceLogic implements PostingService {
    
    boardMap: Map<string, SocialBoard>;
    postingMap: Map<string, Posting>;
    clubMap: Map<string, TravelClub>;

    constructor() {
        this.boardMap = MapStorage.getInstance().boardMap;
        this.postingMap = MapStorage.getInstance().postingMap;
        this.clubMap = MapStorage.getInstance().clubMap;
    }

    register(boardId: string, postingDto: PostingDto): string {
        
        const foundClub = this.clubMap.get(boardId);

        if (!foundClub) {
            throw new Error('\n> In the club, No such member with admin\'s email --> ' + postingDto.writerEmail);
        }
        foundClub.getMembershipBy(postingDto.writerEmail);

        const foundBoard = this.boardMap.get(boardId);

        if (!foundBoard) {
            throw new Error('\n> No such a board with id --> ' + boardId);
        }

        const newPosting = postingDto.toPostingInBoard(foundBoard);

        this.postingMap.set(newPosting.getId(), newPosting);

        return newPosting.getId();
    }

    find(postingId: string): PostingDto {
        
        const foundPosting = this.postingMap.get(postingId);

        if (!foundPosting) {
            throw new Error('\n> No such a posting with id: ' + postingId);
        }
        return PostingDto.fromEntity(foundPosting);
    }

    findByBoardId(boardId: string): PostingDto[] {
        const foundBoard = this.boardMap.get(boardId);

        if (!foundBoard) {
            throw new Error('\n> No such a board with id --> ' + boardId);
        }

        const postings = Array.from(this.postingMap.values());

        return postings.filter(posting => posting.boardId === boardId).map(targetPosting => PostingDto.fromEntity(targetPosting));
    }

    modify(postingDto: PostingDto): void {
        
        const postingId = postingDto.usid;
        const targetPosting = this.postingMap.get(postingId);

        if (!targetPosting) {
            throw new Error('\n> No such a posting with id : ' + postingId);
        }

        if (!postingDto.title) {
            postingDto.title = targetPosting.title;
        }

        if (!postingDto.contents) {
            postingDto.contents = targetPosting.contents;
        }

        const newPosting = postingDto.toPostingIn(postingId, targetPosting.boardId);

        this.postingMap.set(postingId, newPosting);
    }

    remove(postingId: string): void {
        
        if (!this.postingMap.get(postingId)) {
            throw new Error('\n> No such a posting with id: ' + postingId);
        }
        this.postingMap.delete(postingId);
    }
}

export default PostingServiceLogic;