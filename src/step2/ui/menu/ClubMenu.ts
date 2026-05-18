import { question } from "readline-sync";
import ClubConsole from "../console/ClubConsole";
import ClubMembershipMenu from "./ClubMembershipConsole";


class ClubMenu {
    clubMembershipMenu: ClubMembershipMenu;
    clubConsole: ClubConsole;

    constructor() {
        this.clubMembershipMenu = new ClubMembershipMenu();
        this.clubConsole = new ClubConsole();
    }

    showMenu(): void {
        let inputNumber = 0;

        while (true) {
            this.displayMainMenu();
            inputNumber = this.selectMenu();

            switch (inputNumber) {
                case 1:
                    this.clubConsole.register();
                    break;
                case 2:
                    this.clubConsole.find();
                    break;
                case 3:
                    this.clubConsole.modify();
                    break;
                case 4:
                    this.clubConsole.remove();
                    break;
                case 5:
                    this.clubMembershipMenu.showMenu();
                    break;
                case 0:
                    return;
                default:
                    console.log('Choose Again!');
            }
        }
    }

    displayMainMenu(): void {
        console.log('....................');
        console.log('[Travel Club Menu]');
        console.log('....................');
        console.log(' 1. Register');
        console.log(' 2. Find');
        console.log(' 3. Modify');
        console.log(' 4. Remove');
        console.log('....................');
        console.log(' 5. Membership Menu');
        console.log('....................');
        console.log(' 0. Previous');
        console.log('....................');
    }

    selectMenu(): number {

        const answer = question('Select number : ');
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 5) {
            return menuNumber;
        }
        else {
            console.log('It\'s a invalid number -> ' + menuNumber);
            return -1;
        }
    }
}

export default ClubMenu;