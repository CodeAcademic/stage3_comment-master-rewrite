import { question } from "readline-sync";
import BoardMenu from "./BoardMenu";
import ClubMenu from "./ClubMenu";
import MemberMenu from "./MemberMenu";


class MainMenu {
    clubMenu: ClubMenu;
    memberMenu: MemberMenu;
    boardMenu: BoardMenu;

    constructor() {
        this.clubMenu = new ClubMenu();
        this.memberMenu = new MemberMenu();
        this.boardMenu = new BoardMenu();
    }

    showMenu(): void {
        let inputNumber = 0;

        while (true) {
            this.displayMainMenu();
            inputNumber = this.selectMainMenu();

            switch (inputNumber) {
                case 1:
                    this.clubMenu.showMenu();
                    break;
                case 2:
                    this.memberMenu.showMenu();
                    break;
                case 3:
                    this.boardMenu.showMenu();
                    break;
                case 0:
                    this.exitProgram();
                default:
                    console.log('Choose Again!');
            }
        }
    }

    displayMainMenu(): void {
        console.log('...................');
        console.log(' [Main Menu] ');
        console.log('...................');
        console.log(' 1. Club Menu');
        console.log(' 2. Member Menu');
        console.log(' 3. Board Menu');
        console.log('...................');
        console.log(' 0. Exit Program');
        console.log('...................');
    }

    selectMainMenu(): number {
        const answer = question('Select number : ')
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 3) {
            return menuNumber;
        } else {
            console.log('It\'s a invalid number -> ' + menuNumber);
            return -1;
        }
    }

    exitProgram(): void {
        console.log('Program exit. Bye...');
        process.exit(0);
    }
}

export default MainMenu;