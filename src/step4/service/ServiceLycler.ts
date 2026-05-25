import BoardService from "./BoardService";
import ClubService from "./ClubService";
import CommentService from "./CommentService";
import MemberService from "./MemberService";
import PostingService from "./PostingService";


interface ServiceLycler {
    createClubService(): ClubService;
    createMemberService(): MemberService;
    createBoardService(): BoardService;
    createPostingService(): PostingService;
    createCommentService(): CommentService;
}


export default ServiceLycler;