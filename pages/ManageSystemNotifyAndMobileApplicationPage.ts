import { Page, Locator , expect } from '@playwright/test'; 

export class ManageSystemNotifyAndMobileApplicationPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    titleLabelTH
    titleLabelEN
    descriptionLabelTH
    descriptionLabelEN
    backgroundDropbox
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        this.titleLabelTH =  this.page.locator('div').filter({ hasText: /^หัวข้อ \(ไทย\)\*$/ }).nth(1)
        this.titleLabelEN =  this.page.locator('div').filter({ hasText: /^หัวข้อ \(อังกฤษ\)$/ }).nth(1)
        this.descriptionLabelTH = this.page.locator('div').filter({ hasText: /^คำอธิบาย \(ไทย\)\*$/ }).nth(1)
        this.descriptionLabelEN = this.page.locator('div').filter({ hasText: /^คำอธิบาย \(อังกฤษ\)$/ }).nth(1)
        this.backgroundDropbox = this.page.locator('.drop-file-box')
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async checkThemeLoginElement(){
        await expect(this.titleLabelTH).toBeVisible()
        await expect(this.titleLabelEN).toBeVisible();
        await expect(this.descriptionLabelTH).toBeVisible();
        await expect(this.descriptionLabelEN).toBeVisible();
        await expect(this.backgroundDropbox).toBeVisible();
    }

    
}
