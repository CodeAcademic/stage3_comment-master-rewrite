import DateUtil from '../../../util/DateUtil';
import CommunityMember from './CommunityMember';
import RoleInClub from './RoleInClub';
import TravelClub from './TravelClub';


class ClubMembership {
    clubId: string = '';
    memberEmail: string = '';
    role: RoleInClub = RoleInClub.Member;
    joinDate: string = '';

    constructor(clubId: string, memberEmail: string) {
        this.clubId = clubId;
        this.memberEmail = memberEmail;

        this.joinDate = DateUtil.today();
    }

    static getSample(club: TravelClub, member: CommunityMember): ClubMembership {
        const membership = new ClubMembership(club.getId(), member.email);

        membership.role = RoleInClub.Member;

        return membership;
    }
}

export default ClubMembership;