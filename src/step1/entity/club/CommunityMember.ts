import Entity from "../Entity";
import Address from "./Address";
import ClubMembership from "./ClubMembership";


class CommunityMember implements Entity { 
    email: string = '';
    name: string = '';
    nickName: string = '';
    phoneNumber: string = '';
    birthDay: string = '';

    addresses: Address[] = [];
    membershipList: ClubMembership[] = [];

    constructor(email: string, name: string, phoneNumber: string) {
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    getId(): string {
        return this.email;
    }

    static getSample(): CommunityMember {
        const member = new CommunityMember('namoosori@test.co.kr', 'Minsoo Lee', '010-3321-1001');

        member.nickName = 'Min';
        member.birthDay = '2001.09.23';
        member.addresses.push(Address.getHomeAddressSample());

        return member;
    }
}

export default CommunityMember;