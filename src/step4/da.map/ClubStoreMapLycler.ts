import BoardStore from "../store/BoardStore";
import ClubStore from "../store/ClubStore";
import ClubStoreLycler from "../store/ClubStoreLycler";
import MemberStore from "../store/MemberStore";
import PostingStore from "../store/PostingStore";
import BoardMapStore from "./BoardMapStore";
import ClubMapStore from "./ClubMapStore";
import MemberMapStore from "./MemberMapStore";
import PostingMapStore from "./PostingMapStore";
import CommentStore from "../store/CommentStore";
import CommentMapStore from "./CommentMapStore";


class ClubStoreMapLycler implements ClubStoreLycler {
    
    private static lycler: ClubStoreLycler;

    clubStore: ClubStore | null;
    memberStore: MemberStore | null;
    boardStore: BoardStore | null;
    postingStore: PostingStore | null;
    commentStore: CommentStore | null;

    private constructor() {
        this.clubStore = null;
        this.memberStore = null;
        this.boardStore = null;
        this.postingStore = null;
        this.commentStore = null;
    }

    static getInstance(): ClubStoreLycler {
        if (!this.lycler) {
            this.lycler = new ClubStoreMapLycler();
        }
        return this.lycler;
    }

    requestMemberStore(): MemberStore {
        if (!this.memberStore) {
            this.memberStore = new MemberMapStore();
        }
        return this.memberStore;
    }

    requestClubStore(): ClubStore {
        if (!this.clubStore) {
            this.clubStore = new ClubMapStore();
        }
        return this.clubStore;
    }

    requestBoardStore(): BoardStore {
        if (!this.boardStore) {
            this.boardStore = new BoardMapStore();
        }
        return this.boardStore;
    }

    requstPostingStore(): PostingStore {
        if (!this.postingStore) {
            this.postingStore = new PostingMapStore();
        }
        return this.postingStore;
    }

    requestCommentStore(): CommentStore {
        if (!this.commentStore) {
            this.commentStore = new CommentMapStore();
        }
        return this.commentStore;
    }
}

export default ClubStoreMapLycler;