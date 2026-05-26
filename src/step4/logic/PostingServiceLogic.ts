import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import PostingDto from "../service/dto/PostingDto";
import PostingService from "../service/PostingService";
import BoardStore from "../store/BoardStore";
import ClubStore from "../store/ClubStore";
import PostingStore from "../store/PostingStore";


class PostingServiceLogic implements PostingService {

    boardStore: BoardStore;
    postingStore: PostingStore;
    clubStore: ClubStore;

    constructor() {
        this.boardStore = ClubStoreMapLycler.getInstance().requestBoardStore();
        this.postingStore = ClubStoreMapLycler.getInstance().requestPostingStore();
        this.clubStore = ClubStoreMapLycler.getInstance().requestClubStore();
    }

    register(boardId: string, postingDto: PostingDto): string {
        
        const foundClub = this.clubStore.retrieve(boardId);
        if (!foundClub) {
            throw new Error('No such club with id --> ' + boardId);
        }

        const membership = foundClub.getMembershipBy(postingDto.writerEmail);

        if (!membership) {
            throw new Error('In the club, No such member with admin\'s email --> ' + postingDto.writerEmail);
        }

        const foundBoard = this.boardStore.retrieve(boardId);

        if (!foundBoard) {
            throw new Error('No such board with id --> ' + boardId);
        }
        return this.postingStore.create(postingDto.toPostingInBoard(foundBoard));
    }

    find(postingId: string): PostingDto {
        const foundPosting = this.postingStore.retieve(postingId);

        if (!foundPosting) {
            throw new Error('No such posting with id: ' + postingId);
        }
        return PostingDto.fromEntity(foundPosting);
    }

    findByBoardId(boardId: string): PostingDto[] {
        const foundBoard = this.boardStore.retrieve(boardId);

        if (!foundBoard) {
            throw new Error('No such board with id --> ' + boardId);
        }
        return this.postingStore.retieveByBoardId(boardId).map(posting => PostingDto.fromEntity(posting));
    }

    modify(postingDto: PostingDto): void {
        const postingId = postingDto.usid;
        const targetPosting = this.postingStore.retieve(postingId);

        if (!targetPosting) {
            throw new Error('No such posting with id : ' + postingId);
        }

        if (!postingDto.title) {
            postingDto.title = targetPosting.title;
        }
        if (!postingDto.contents) {
            postingDto.contents = targetPosting.contents;
        }

        this.postingStore.update(postingDto.toPostingIn(postingId, targetPosting.boardId));
    }

    remove(postingId: string): void {
        if (!this.postingStore.retieve(postingId)) {
            throw new Error('No such posting with id: ' + postingId);
        }
        this.postingStore.delete(postingId);
    }
}

export default PostingServiceLogic;