import MemberDto from "./dto/MemberDto";


interface MemberService {
    register(memberDto: MemberDto): void;
    find(memberId: string): MemberDto;
    findByName(memberName: string): MemberDto[];
    modify(memberDto: MemberDto): void;
    remove(memberId: string): void;
}


export default MemberService;