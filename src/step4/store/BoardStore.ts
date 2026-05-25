import SocialBoard from "../../step1/entity/board/SocialBoard";

interface BoardStore {
    create(board: SocialBoard): string;
    retrieve(boardId: string): SocialBoard | null;
    retrieveByName(boardId: string): SocialBoard[];
    retrieveAll(): SocialBoard[];
    update(board: SocialBoard): void;
    delete(boardId: string): void;

    exists(boardId: string): boolean;
}


export default BoardStore;