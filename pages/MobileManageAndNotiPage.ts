import { Page, Locator , expect } from '@playwright/test';


export class MobileManageAndNotiPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    manageMobileAndNotificationMenu : Locator
    workingButton : Locator
    manageTemplateNotificationButton : Locator
    manageTermAndConditionsButton : Locator


    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        this.manageMobileAndNotificationMenu = this.page.getByRole('listitem', { name: 'จัดการโมบายแอปพลิเคชันและการแจ้งเตือน' });
        this.workingButton = this.page.locator('div:nth-child(19) > div > div > ul > div > li > .text');
        this.manageTemplateNotificationButton = this.page.getByRole('link', { name: 'จัดการ Template แจ้งเตือน' })
        this.manageTermAndConditionsButton = this.page.getByRole('link', { name: 'จัดการ เงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' })
    
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async clickManageMobileAndNotificationMenu() {
        await this.manageMobileAndNotificationMenu.scrollIntoViewIfNeeded();
        await this.manageMobileAndNotificationMenu.click();
    }

    async clickWorkingBtn(){
        await this.workingButton.click()
    }
    
    async clickManageTemplateNotiBtn(){
        await this.manageTemplateNotificationButton.scrollIntoViewIfNeeded()
        await this.manageTemplateNotificationButton.click()
    }

    async clickManageTermAndConditionsBtn(){
        await this.manageTermAndConditionsButton.scrollIntoViewIfNeeded()
        await this.manageTermAndConditionsButton.click()
    }
}
