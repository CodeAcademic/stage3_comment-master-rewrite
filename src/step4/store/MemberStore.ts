import CommunityMember from "../../step1/entity/club/CommunityMember";

interface MemberStore {
    create(member: CommunityMember): string;
    retrieve(email: string): CommunityMember | null;
    retrieveByName(name: string): CommunityMember[];
    update(member: CommunityMember): void;
    delete(email: string): void;

    exists(email: string): boolean;
}


export default MemberStore;