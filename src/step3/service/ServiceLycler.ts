import BoardService from "./BoardService";
import ClubService from "./ClubService";
import MemberService from "./MemberService";
import PostingService from "./PostingService";


interface ServiceLycler {
    createClubService(): ClubService;
    createMemberService(): MemberService;
    createBoardService(): BoardService;
    createPostingService(): PostingService;
}

export default ServiceLycler;