import CommunityMember from "../../step1/entity/club/CommunityMember";
import MemberDto from "../service/dto/MemberDto";
import MemberService from "../service/MemberService";
import MapStorage from "./storage/MapStorage";

class MemberServiceLogic implements MemberService {

    memberMap: Map<string, CommunityMember>;

    constructor() {
        this.memberMap = MapStorage.getInstance().memberMap;
    }

    register(memberDto: MemberDto): void {
        const memberEmail = memberDto.email;
        const foundMember = this.memberMap.get(memberEmail);

        if (foundMember) {
            throw new Error('Member already exist the member email: ' + foundMember.email);
        }
        this.memberMap.set(memberEmail, memberDto.toMember());
    }

    find(memberEmail: string): MemberDto {
        const foundMember = this.memberMap.get(memberEmail);

        if (!foundMember) {
            throw new Error('No such member with email --> ' + memberEmail);
        }
        return MemberDto.fromEntity(foundMember);
    }

    findByName(memberName: string): MemberDto[] {
        const members = Array.from(this.memberMap.values());

        if (!members) {
            return [];
        }
        return members.filter(member => member.name === memberName).map(targetMember => MemberDto.fromEntity(targetMember));
    }

    modify(memberDto: MemberDto): void {

        const memberEmail = memberDto.email;
        const targetMember = this.memberMap.get(memberEmail);

        if (!targetMember) {
            throw new Error('No such member with email: ' + memberEmail);
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

        if (!memberDto.birthDay) {
            memberDto.birthDay = targetMember.birthDay;
        }

        this.memberMap.set(memberEmail, memberDto.toMember());
    }

    remove(memberEmail: string): void {
        if (!this.memberMap.get(memberEmail)) {
            throw new Error('No such member with email: ' + memberEmail);
        }
        this.memberMap.delete(memberEmail);
    }
}

export default MemberServiceLogic;