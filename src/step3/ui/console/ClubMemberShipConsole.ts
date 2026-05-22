import { question } from "readline-sync";
import RoleInClub from "../../../step1/entity/club/RoleInClub";
import ServiceLogicLycler from "../../logic/ServiceLogicLycler";
import ClubService from "../../service/ClubService";
import ClubMembershipDto from "../../service/dto/ClubMembershipDto";
import TravelClubDto from "../../service/dto/TravelClubDto";
import ServiceLycler from "../../service/ServiceLycler";


class ClubMembershipConsole {
    currentClub: TravelClubDto | null = null;
    clubService: ClubService;

    constructor() {
        const serviceFactory: ServiceLycler = ServiceLogicLycler.shareInstance();
        this.clubService = serviceFactory.createClubService();
    }

    hasCurrentClub(): boolean {
        return this.currentClub !== null;
    }

    requestCurrentClubName(): string | null {
        let clubName = null;

        if (this.currentClub) {
            clubName = this.currentClub.name;
        }
        return clubName;
    }

    findClub(): void {
        let clubFound = null;
        while (true) {
            const clubName = question('\n club name to find (0.Membership menu): ');

            if (clubName === '0') {
                break;
            }

            try {
                clubFound = this.clubService.findByName(clubName);
                console.log('\n> Found club: ', clubFound);
                break;
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
            clubFound = null;
        }
        this.currentClub = clubFound;
    }

    add(): void {
        if (!this.currentClub) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        while (true) {
            const email = question('\n member\'s email to add (0.Member menu): ');

            if (email === '0') {
                return;
            }
            const memberRole = question(' President|Member : ');

            try {
                const clubMembershipDto = new ClubMembershipDto(this.currentClub.usid, email);

                clubMembershipDto.role = memberRole as RoleInClub;

                this.clubService.addMembership(clubMembershipDto);
                console.log(`\n> Add a member [email:${email}] in club [name:${this.currentClub.name}]`);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
    }

    find(): void {
        if (!this.currentClub) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        while (true) {
            const memberEmail = question('\n email to find (0.Membership menu): ');

            if (memberEmail === '0') {
                break;
            }

            try {
                const membershipDto = this.clubService.findMembership(this.currentClub.usid, memberEmail);
                console.log('\n> Found membership information: ', membershipDto);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
    }

    findOne(): ClubMembershipDto | null {
        let membershipDto = null;

        while (true) {
            const memberEmail = question('\n member email to find (0.Membership menu): ');

            if (memberEmail === '0') {
                break;
            }

            try {
                if (this.currentClub) {
                    membershipDto = this.clubService.findMembership(this.currentClub.usid, memberEmail);
                    console.log('\n> Found membership information: ', membershipDto);
                    break;
                }
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Error: ${e.message}`);
                }
            }
        }
        return membershipDto;
    }

    modify(): void {
        if (!this.currentClub) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        const targetMembership = this.findOne();

        if (!targetMembership) {
            return;
        }

        const newRole = question('new President|Member (0.Membership menu, Enter. no change): ');

        if (newRole === '0') {
            return;
        }
        targetMembership.role = newRole as RoleInClub;

        const clubId = targetMembership.clubId;

        this.clubService.modifyMembership(clubId, targetMembership);

        const modifiedMembership = this.clubService.findMembership(clubId, targetMembership.memberEmail);
        console.log('\n> Modified membership information: ', modifiedMembership);
    }

    remove(): void {
        if (!this.currentClub) {
            console.log('> No target club yet. Find target club first.');
            return;
        }

        const targetMembership = this.findOne();

        if (!targetMembership) {
            return;
        }

        const confirmStr = question('Remove this member in the club? (Y:yes, N:no): ');

        if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {

            console.log('\n> Removing a membership --> ' + targetMembership.memberEmail);
            if (this.currentClub) {
                this.clubService.removeMembership(this.currentClub.usid, targetMembership.memberEmail);
            }
        }
    }
}

export default ClubMembershipConsole;