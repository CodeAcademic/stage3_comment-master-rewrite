import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import MemberDto from "../service/dto/MemberDto";
import MemberService from "../service/MemberService";
import MemberStore from "../store/MemberStore";


class MemberServiceLogic implements MemberService {

    memberStore: MemberStore;

    constructor() {
        this.memberStore = ClubStoreMapLycler.getInstance().requestMemberStore();
    }

    register(memberDto: MemberDto): void {
        const email = memberDto.email;
        const foundMember = this.memberStore.retrieve(email);

        if (foundMember) {
            throw new Error('Member already exists the member email: ' + foundMember.email);
        }
        this.memberStore.create(memberDto.toMember());
    }

    find(memberEmail: string): MemberDto {
        const foundMember = this.memberStore.retrieve(memberEmail);

        if (!foundMember) {
            throw new Error('No such member with email: ' + memberEmail);
        }
        return MemberDto.fromEntity(foundMember)
    }

    findByName(memberName: string): MemberDto[] {
        const members = this.memberStore.retrieveByName(memberName);

        if (!members) {
            throw new Error('No such member with name: ' + memberName);
        }
        return members.map((targetMember) => MemberDto.fromEntity(targetMember));
    }

    modify(memberDto: MemberDto): void {
        const targetMember = this.memberStore.retrieve(memberDto.email);

        if (!targetMember) {
            throw new Error('No such member with email: ' + memberDto.email);
        }
        if (!memberDto.name) {
            memberDto.name = targetMember.name;
        }
        if (!memberDto.nickName) {
            memberDto.nickName = targetMember.nickName;
        }
        if (!memberDto.phoneNumber) {
            memberDto.phoneNumber = targetMember.phoneNumber;
        }
        if (!memberDto.birthday) {
            memberDto.birthday = targetMember.birthDay;
        }
        this.memberStore.update(memberDto.toMember());
    }

    remove(memberId: string): void {
        if (!this.memberStore.exists(memberId)) {
            throw new Error('No such member with email: ' + memberId);
        }
        this.memberStore.delete(memberId);
    }
}

export default MemberServiceLogic;