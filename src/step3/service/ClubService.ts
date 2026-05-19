import ClubMembershipDto from "./dto/ClubMembershipDto";
import TravelClubDto from "./dto/TravelClubDto";


interface ClubService {
    register(clubDto: TravelClubDto): void;
    find(clubId: string): TravelClubDto | null;
    findByName(name: string): TravelClubDto;
    modify(clubDto: TravelClubDto): void;
    remove(clubId: string): void;

    addMembership(membershipDto: ClubMembershipDto): void;
    findMembership(clubId: string, memberId: string): ClubMembershipDto | null;
    modifyMembership(clubId: string, membershipDto: ClubMembershipDto): void;
    removeMembership(clubId: string, memberId: string): void;
}

export default ClubService;