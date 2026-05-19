import Posting from "../../../step1/entity/board/Posting";
import SocialBoard from "../../../step1/entity/board/SocialBoard";
import CommunityMember from "../../../step1/entity/club/CommunityMember";
import TravelClub from "../../../step1/entity/club/TravelClub";

class MapStorage {
    private static uniqueInstance: MapStorage;

    clubMap: Map<string, TravelClub>;
    memberMap: Map<string, CommunityMember>;
    boardMap: Map<string, SocialBoard>;
    postingMap: Map<string, Posting>;
    autoIdMap: Map<string, number>;

    private constructor() {
        this.clubMap = new Map<string, TravelClub>();
        this.memberMap = new Map<string, CommunityMember>();
        this.boardMap = new Map<string, SocialBoard>();
        this.postingMap = new Map<string, Posting>();
        this.autoIdMap = new Map<string, number>();
    }

    static getInstance(): MapStorage {
        if (this.uniqueInstance === undefined) {
            this.uniqueInstance = new MapStorage();
        }
        return this.uniqueInstance;
    }
}


export default MapStorage;