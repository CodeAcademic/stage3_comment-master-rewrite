import BoardStore from "./BoardStore";
import ClubStore from "./ClubStore";
import CommentStore from "./CommentStore";
import MemberStore from "./MemberStore";
import PostingStore from "./PostingStore";


interface ClubStoreLycler {
    requestMemberStore(): MemberStore;
    requestClubStore(): ClubStore;
    requestBoardStore(): BoardStore;
    requestPostingStore(): PostingStore;
    requestCommentStore(): CommentStore;
}

export default ClubStoreLycler;