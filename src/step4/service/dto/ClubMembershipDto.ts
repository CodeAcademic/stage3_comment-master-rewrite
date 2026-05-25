import ClubMembership from "../../../step1/entity/club/ClubMembership";
import RoleInClub from "../../../step1/entity/club/RoleInClub";
import DateUtil from "../../../util/DateUtil";


class ClubMemberShipDto {

    clubId: string = '';
    memberEmail: string = '';
    role: RoleInClub = RoleInClub.Member;
    joinDate: string = '';

    constructor(clubId: string, memberEmail: string) {
        this.clubId = clubId;
        this.memberEmail = memberEmail;
        this.joinDate = DateUtil.today();
    }

    static fromEntity(membership: ClubMembership): ClubMemberShipDto {
        const membershipDto = new ClubMemberShipDto(membership.clubId, membership.memberEmail);

        membershipDto.role = membership.role;
        membershipDto.joinDate = membership.joinDate;

        return membershipDto;
    }

    toMembership(): ClubMembership {
        const membership = new ClubMembership(this.clubId, this.memberEmail);
        
        membership.role = this.role;
        membership.joinDate = this.joinDate;

        return membership;
    }
}

export default ClubMemberShipDto;