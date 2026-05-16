import Posting from "./entity/board/Posting";
import SocialBoard from "./entity/board/SocialBoard";
import ClubMembership from "./entity/club/ClubMembership";
import CommunityMember from "./entity/club/CommunityMember";
import TravelClub from "./entity/club/TravelClub";


const club = TravelClub.getSample(true);
console.log(club);

const member = CommunityMember.getSample();
console.log(member);

const membership = ClubMembership.getSample(club, member);
console.log(membership);

const board = SocialBoard.getSample(club);
console.log(board);

const postings = Posting.getSample(board);
console.log(postings.map(posting => posting));