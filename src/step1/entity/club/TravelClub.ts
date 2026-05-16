import DateUtil from "../../../util/DateUtil";
import AutoIdEntity from "../AutoIdEntity";
import ClubMembership from "./ClubMembership";

class TravelClub implements AutoIdEntity {
    private readonly MINIMUM_NAME_LENGTH: number = 3;
    private readonly MINIMUM_INTRO_LENGTH: number = 10;

    usid: string = '';
    name: string = '';
    intro: string = '';
    foundationDate: string = '';

    boardId: string = '';
    membershipList: ClubMembership[] = [];

    constructor(name: string, intro: string) {
        this.setName(name);
        this.setIntro(intro);
        this.foundationDate = DateUtil.today();
    }

    getId(): string {
        return this.usid;
    }

    setAutoId(autoId: string): void {
        this.usid = autoId;
    }

    getMembershipBy(email: string): ClubMembership | null {
        if (!email || !email.length) {
            return null;
        }

        let clubMembership;

        for (clubMembership of this.membershipList) {
            if (email === clubMembership.memberEmail) {
                return clubMembership;
            }
        }
        return null;
    }

    setName(name: string): void {
        if (name.length < this.MINIMUM_NAME_LENGTH) {
            throw new Error('\n> Name should be longer than ' + this.MINIMUM_NAME_LENGTH);
        }
        this.name = name;
    }

    setIntro(intro: string): void {
        if (intro.length < this.MINIMUM_INTRO_LENGTH) {
            throw new Error('\n> Intro should be longer than ' + this.MINIMUM_INTRO_LENGTH);
        }
        this.intro = intro;
    }

    static getSample(keyInclude: boolean): TravelClub {
        const name = 'namoosori club';
        const intro = 'Welcome to namoosori club.';
        const club = new TravelClub(name, intro);

        if (keyInclude) {
            const sequence = 21;

            club.setAutoId(sequence.toString());
        }
        return club;
    }
}

export default TravelClub;