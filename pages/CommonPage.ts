import { Page, Locator , expect } from '@playwright/test'; 

export class CommonPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    username : Locator
    password : Locator
    backofficeURL = 'https://backoffice-uat.nida.ac.th/login';



    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        
        this.username = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' });
        this.password = this.page.getByRole('textbox', { name: 'รหัสผ่าน*'});
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoBackOfficeLandingPage(){
        await this.page.goto(this.backofficeURL);
    }

    async fillUsernameAndPasswordInLoginPage(username : string , password : string) {
        await this.username.pressSequentially(username);
        await this.password.pressSequentially(password);
    }


    
}
