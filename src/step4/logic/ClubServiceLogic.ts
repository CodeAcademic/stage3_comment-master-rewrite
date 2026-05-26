import ClubMembership from "../../step1/entity/club/ClubMembership";
import RoleInClub from "../../step1/entity/club/RoleInClub";
import TravelClub from "../../step1/entity/club/TravelClub";
import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import ClubService from "../service/ClubService";
import ClubMemberShipDto from "../service/dto/ClubMembershipDto";
import TravelClubDto from "../service/dto/TravelClubDto";
import ClubStore from "../store/ClubStore";
import MemberStore from "../store/MemberStore";


class ClubServiceLogic implements ClubService {

    clubStore: ClubStore;
    memberStore: MemberStore;

    constructor() {

        this.clubStore = ClubStoreMapLycler.getInstance().requestClubStore();
        this.memberStore = ClubStoreMapLycler.getInstance().requestMemberStore();
    }

    register(clubDto: TravelClubDto): void {
        const foundClub = this.clubStore.retrieveByName(clubDto.name);

        if (foundClub) {
            throw new Error('Club already exists with name: ' + clubDto.name);
        }
        const club = clubDto.toTravelClub();

        const clubId = this.clubStore.create(club);
        clubDto.usid = clubId;
    }

    find(clubId: string): TravelClubDto {
        const foundClub = this.clubStore.retrieve(clubId);

        if (!foundClub) {
            throw new Error('No such club with name: ' + clubId);
        }
        return TravelClubDto.fromEntity(foundClub);
    }

    findByName(name: string): TravelClubDto {
        const foundClub = this.clubStore.retrieveByName(name);

        if (!foundClub) {
            throw new Error('No such club with name: ' + name);
        }
        return TravelClubDto.fromEntity(foundClub);
    }

    modify(clubDto: TravelClubDto): void {
        const foundClub = this.clubStore.retrieveByName(clubDto.name);

        if (foundClub) {
            throw new Error('Club already exists with name: ' + clubDto.name);
        }

        const targetClub = this.clubStore.retrieve(clubDto.usid);

        if (!targetClub) {
            throw new Error('No such club with id: ' + clubDto.usid);
        }

        if (!clubDto.name) {
            clubDto.name = targetClub.name;
        }
        if (!clubDto.intro) {
            clubDto.intro = targetClub.intro;
        }

        this.clubStore.update(clubDto.toTravelClub());
    }

    remove(clubId: string): void {
        if (!this.clubStore.exists(clubId)) {
            throw new Error('No such club with id: ' + clubId);
        }
        this.clubStore.delete(clubId);
    }

    addMembership(membershipDto: ClubMemberShipDto): void {
        const memberId = membershipDto.memberEmail;
        const foundMember = this.memberStore.retrieve(memberId);

        if (!foundMember) {
            throw new Error('No such member with email: ' + memberId);
        }

        const foundClub = this.clubStore.retrieve(membershipDto.clubId);

        if (!foundClub) {
            throw new Error('No such club with id: ' + membershipDto.clubId);
        }

        const membership = foundClub.membershipList.find((membership) => memberId === membership.memberEmail);

        if (membership) {
            throw new Error('Member already exists in the club --> ' + memberId);
        }

        const clubMembership = membershipDto.toMembership();

        foundClub.membershipList.push(clubMembership);
        this.clubStore.update(foundClub);

        foundMember.membershipList.push(clubMembership);
        this.memberStore.update(foundMember);
    }

    findMembershipIn(clubId: string, memberId: string): ClubMemberShipDto | null {
        const foundClub = this.clubStore.retrieve(clubId);
        let membership = null;

        if (foundClub) {
            membership = this.getMembershipIn(foundClub, memberId);
        }

        return membership ? ClubMemberShipDto.fromEntity(membership) : membership;
    }

    modifyMembership(clubId: string, membershipDto: ClubMemberShipDto): void {
        const targetEmail = membershipDto.memberEmail;
        const newRole = membershipDto.role;

        const targetClub = this.clubStore.retrieve(clubId);

        if (targetClub) {
            const membershipOfClub = this.getMembershipIn(targetClub, targetEmail);

            membershipOfClub.role = newRole as RoleInClub;
            this.clubStore.update(targetClub);
        }

        const targetMember = this.memberStore.retrieve(targetEmail);

        if (targetMember) {
            targetMember.membershipList.filter(membershipOfMember => membershipOfMember.clubId === clubId).map(membershipOfMember => membershipOfMember.role = newRole);
            this.memberStore.update(targetMember);
        }
    }

    removeMembership(clubId: string, memberId: string): void {
        const foundClub = this.clubStore.retrieve(clubId);
        const foundMember = this.memberStore.retrieve(memberId);

        if (foundClub && foundMember) {
            const clubMembership = this.getMembershipIn(foundClub, memberId);

            const clubIndex = foundClub.membershipList.indexOf(clubMembership);
            const memberIndex = foundMember.membershipList.indexOf(clubMembership);

            foundClub.membershipList.splice(clubIndex, 1);
            foundMember.membershipList.splice(memberIndex, 1);
        }
    }

    private getMembershipIn(club: TravelClub, memberEmail: string): ClubMembership {
        for (const membership of club.membershipList) {
            if (memberEmail === membership.memberEmail) {
                return membership;
            }
        }
        throw new Error(`No such member[${memberEmail}] in club [${club.name}]`);
    }
}

export default ClubServiceLogic;