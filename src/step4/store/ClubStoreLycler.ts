import BoardStore from "./BoardStore";
import ClubStore from "./ClubStore";
import CommentStore from "./CommentStore";
import MemberStore from "./MemberStore";


interface ClubStoreLycler {
    requestMemberStore(): MemberStore;
    requestClubStore(): ClubStore;
    requestBoardStore(): BoardStore;
    requestCommentStore(): CommentStore
}

export default ClubStoreLycler;