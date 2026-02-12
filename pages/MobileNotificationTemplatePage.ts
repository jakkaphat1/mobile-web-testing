import { Page, Locator , expect } from '@playwright/test';


export class MobileNotificationTemplatePage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    manageMobileAndNotificationMenu : Locator

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        this.manageMobileAndNotificationMenu = this.page.getByRole('listitem', { name: 'จัดการโมบายแอปพลิเคชันและการแจ้งเตือน' });
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async clickManageMobileAndNotificationMenu() {
        await this.manageMobileAndNotificationMenu.click();
    }


    
}
