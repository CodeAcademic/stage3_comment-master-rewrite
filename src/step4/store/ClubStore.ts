import TravelClub from "../../step1/entity/club/TravelClub";

interface ClubStore {
    create(club: TravelClub): string;
    retrieve(clubId: string): TravelClub | null;
    retriveByName(name: string): TravelClub | null;
    update(club: TravelClub): void;
    delete(clubId: string): void;
    exists(clubId: string): boolean;
}


export default ClubStore;