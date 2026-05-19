import BoardService from "./BoardService";
import ClubService from "./ClubService";
import MemberService from "./MemberService";
import PostingService from "./PostingService";


interface ServiceLycler {
    createClubService(): ClubService;
    createClubService(): MemberService;
    createClubService(): BoardService;
    createClubService(): PostingService;
}

export default ServiceLycler;