import { Page, Locator , expect } from '@playwright/test';

export class MobileManageTemplateAndNotiPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */    
    searchTemplateNotiBox 
    chooseWaytoNotify
    chooseEmailtoNotify
    chooseMobileAppNotify
    chooseTemplateNotifyStatus
    inuseStatus
    notuseStatus
    searchButton
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor(page: Page){
        this.page = page;
        this.searchTemplateNotiBox = this.page.locator('#search-input-search')
        this.chooseWaytoNotify = this.page.locator('div').filter({ hasText: /^เลือกช่องทางการแจ้งเตือน\*$/ }).nth(4)
        this.chooseEmailtoNotify = this.page.getByRole('option', { name: 'Email' })
        this.chooseMobileAppNotify = this.page.getByRole('option', { name: 'Mobile Application' })
        this.chooseTemplateNotifyStatus = this.page.locator('div').filter({ hasText: /^ใช้งาน$/ }).first()
        this.inuseStatus = this.page.getByRole('option', { name: 'ใช้งาน', exact: true })
        this.notuseStatus = this.page.getByRole('option', { name: 'ไม่ใช้งาน' })
        this.searchButton = this.page.getByRole('button', { name: 'ค้นหา' })

    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */
    async fillSearchTemplateNotiBox(templateName : string){
        await this.searchTemplateNotiBox.pressSequentially(templateName)
    }

    async chooseWaytoNotifyOption(option : "1" | "2"){
        await this.chooseWaytoNotify.click()
        switch (option) {
            case '1':
                console.log('Choose Email Option');
                await this.chooseEmailtoNotify.click();
                break;
            case '2':
                console.log('Choose Mobile Appliocation Option');
                await this.chooseMobileAppNotify.click();
                break;
            default:
                throw new Error(`Invalid operation: ${option}. Please use '1' for Email or '2' for Mobile Application`);
        }
    }

    async chooseTemplateNotifyStatusOption(option : "1" | "2"){
        await this.chooseTemplateNotifyStatus.click()
        switch (option){
            case '1':
                console.log('เลือกใช้งาน')
                await this.inuseStatus.click()
                break;
            case '2':
                console.log('เลือกไม่ใช้งาน')
                await this.notuseStatus.click()
                break;
            default:
                throw new Error(`Invalid operation: ${option}. use '1' for เลือกใช้งาน or '2' for เลือกไม่ใช้งาน`);
        }
    }

    async clickSearchButton(){
        await this.searchButton.click()
    }
}