import ClubMembership from "../../step1/entity/club/ClubMembership";
import CommunityMember from "../../step1/entity/club/CommunityMember";
import RoleInClub from "../../step1/entity/club/RoleInClub";
import TravelClub from "../../step1/entity/club/TravelClub";
import ClubService from "../service/ClubService";
import ClubMembershipDto from "../service/dto/ClubMembershipDto";
import TravelClubDto from "../service/dto/TravelClubDto";
import MapStorage from "./storage/MapStorage";

class ClubServiceLogic implements ClubService {

    clubMap: Map<string, TravelClub>;
    memberMap: Map<string, CommunityMember>;
    autoIdMap: Map<string, number>;

    constructor() {
        this.clubMap = MapStorage.getInstance().clubMap;
        this.memberMap = MapStorage.getInstance().memberMap;
        this.autoIdMap = MapStorage.getInstance().autoIdMap;
    }

    register(clubDto: TravelClubDto): void {
        const foundClub = this.retrieveByName(clubDto.name);

        if (foundClub) {
            throw new Error('Club already exists with name: ' + foundClub.name);
        }
        const club = clubDto.toTravelClub();
        const className = TravelClub.name;

        if ('getId' in club || 'setAutoId' in club) {
            if (this.autoIdMap.get(className) === undefined) {
                this.autoIdMap.set(className, Number(club.getId()));
            }

            let keySequence = this.autoIdMap.get(className);

            if (keySequence !== undefined) {
                const autoId = keySequence.toString();

                club.setAutoId(autoId);
                this.autoIdMap.set(className, ++keySequence);
            }
        }

        this.clubMap.set(club.getId(), club);
        clubDto.usid = club.getId();
    }

    find(clubId: string): TravelClubDto | null {
        const foundClub = this.clubMap.get(clubId);

        if (!foundClub) {
            throw new Error('No such club with id --> ' + clubId);
        }
        return TravelClubDto.fromEntity(foundClub);
    }

    findByName(name: string): TravelClubDto {
        const foundClub = this.retrieveByName(name);

        if (!foundClub) {
            throw new Error('No such club with name --> ' + name);
        }
        return TravelClubDto.fromEntity(foundClub);
    }

    modify(clubDto: TravelClubDto): void {

        const clubId = clubDto.usid;
        const targetClub = this.clubMap.get(clubId);

        if (!targetClub) {
            throw new Error('No such club with id --> ' + clubDto.usid);
        }

        if (!clubDto.name) {
            clubDto.name = targetClub.name;
        }

        if (!clubDto.intro) {
            clubDto.intro = targetClub.intro;
        }
        this.clubMap.delete(clubId);
    }

    remove(clubId: string): void {
        if (!this.clubMap.get(clubId)) {
            throw new Error('No such club with id --> ' + clubId);
        }
        this.clubMap.delete(clubId)
    }

    addMembership(membershipDto: ClubMembershipDto): void {

        const memberId = membershipDto.memberEmail;
        const foundMember = this.memberMap.get(memberId);

        if (!foundMember) {
            throw new Error('No such member with email --> ' + memberId);
        }

        const clubId = membershipDto.clubId;
        const foundClub = this.clubMap.get(clubId);

        if (!foundClub) {
            throw new Error('No such club with id: ' + membershipDto.clubId);
        }

        const membership = foundClub.membershipList.find((membership) => memberId === membership.memberEmail);

        if (membership) {
            throw new Error('Member already exists in the club --> ' + memberId);
        }

        const clubMembership = membershipDto.toMembership();

        foundClub.membershipList.push(clubMembership);
        this.clubMap.set(clubId, foundClub);

        foundMember.membershipList.push(clubMembership);
        this.memberMap.set(memberId, foundMember);
    }

    findMembership(clubId: string, memberId: string): ClubMembershipDto | null {
        
        const foundClub = this.clubMap.get(clubId);
        let membership = null;

        if (foundClub) {
            membership = this.getMembershipOfClub(foundClub, memberId);
        }

        return membership ? ClubMembershipDto.fromEntity(membership) : membership;
    }

    modifyMembership(clubId: string, membershipDto: ClubMembershipDto): void {
        
        const targetEmail = membershipDto.memberEmail;
        const newRole = membershipDto.role;

        const targetClub = this.clubMap.get(clubId);
        
        if (targetClub) {
            const membershipOfClub = this.getMembershipOfClub(targetClub, targetEmail);

            membershipOfClub.role = newRole as RoleInClub;
        }

        const targetMember = this.memberMap.get(targetEmail);

        if (targetMember) {
            targetMember.membershipList.filter(membershipOfMember => membershipOfMember.clubId === clubId).map(membershipOfMember => membershipOfMember.role = newRole);

            this.memberMap.set(targetMember.getId(), targetMember);
        }
    }

    removeMembership(clubId: string, memberId: string): void {

        const foundClub = this.clubMap.get(clubId);
        const foundMember = this.memberMap.get(memberId);

        if (foundClub && foundMember) {
            const clubMembership = this.getMembershipOfClub(foundClub, memberId);
            const clubIndex = foundClub.membershipList.indexOf(clubMembership);
            const memberIndex = foundMember.membershipList.indexOf(clubMembership);

            foundClub.membershipList.splice(clubIndex, 1);
            foundMember.membershipList.splice(memberIndex, 1);
        }
    }

    retrieveByName(name: string): TravelClub | null {
        const clubs = Array.from(this.clubMap.values());

        if (!clubs.length) {
            return null;
        }

        return clubs.find(club => club.name === name) || null;
    }

    getMembershipOfClub(club: TravelClub, memberId: string): ClubMembership {

        for (const membership of club.membershipList) {
            if (memberId === membership.memberEmail) {
                return membership;
            }
        }
        throw new Error(`No such member[${memberId}] in club [${club.name}]`);
    }
}


export default ClubServiceLogic;