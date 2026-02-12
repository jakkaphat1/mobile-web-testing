import { Page, Locator , expect } from '@playwright/test';


export class MobileManageTermAndConditionsPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    chooseWorkTypeDropdown
    chooseVersionDropdown
    chooseStatusDropdown
    searchButton

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        this.chooseWorkTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกระบบงาน$/ }).nth(3)
        this.chooseVersionDropdown = this.page.locator('div').filter({ hasText: /^เลือกเวอร์ชัน$/ }).nth(3)
        this.chooseStatusDropdown = this.page.locator('div').filter({ hasText: /^ใช้งาน$/ }).nth(3)
        this.searchButton = this.page.getByRole('button', { name: 'ค้นหา' })
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */
    async selectWorkType(workType: string){
        await this.chooseWorkTypeDropdown.click();
        await this.page.getByRole('option', { name: workType }).click()
    }
    
    async selectVersion(version: string){
        await this.chooseVersionDropdown.click();
        await this.page.getByRole('option', { name: version }).click()
    }

    async selectStatus(status: string){
        await this.chooseStatusDropdown.click();
        await this.page.getByRole('option', { name: status , exact: true }).click()
    }

    async clickSearchButton(){
        await this.searchButton.click()
    }
}
