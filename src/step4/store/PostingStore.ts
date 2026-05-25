import Posting from "../../step1/entity/board/Posting";

interface PostingStore {
    create(posting: Posting): string;
    retieve(postingId: string): Posting | null;
    retieveByBoardId(boardId: string): Posting[];
    update(posting: Posting): void;
    delete(postingId: string): void;

    exists(postingId: string): boolean;
}

export default PostingStore;