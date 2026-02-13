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
    expandFilterButton
    campusButton
    levelEducationButton
    chooseModule
    chooseTemplateType
    systemWork
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
        this.expandFilterButton = this.page.locator('button.button_collapse');

        this.campusButton = this.page.locator('div').filter({ hasText: /^เลือกวิทยาเขต$/ }).nth(3)
        this.levelEducationButton = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
        this.chooseModule = this.page.locator('div').filter({ hasText: /^เลือกโมดูล$/ }).nth(3)
        this.chooseTemplateType = this.page.locator('div').filter({ hasText: /^เลือกประเภท Template$/ }).nth(3)
        this.systemWork = this.page.locator('div').filter({ hasText: /^เลือกระบบงาน$/ }).nth(3)
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

    async clickExpandFilterButton(){
        await this.expandFilterButton.click()
    }

    async clickCampusDropdown(option : "ส่วนกลาง" | "สีคิ้ว" | "สยาม"){
        await this.campusButton.click()
        switch (option){
            case 'ส่วนกลาง':
                await this.page.getByRole('option', { name: '- ส่วนกลาง' }).click()   
                console.log('เลือกส่วนกลาง')
                break;
            case 'สีคิ้ว':
                await this.page.getByRole('option', { name: '- สีคิ้ว' }).click()   
                console.log('เลือกสีคิ้ว')
                break;
            case 'สยาม':
                await this.page.getByRole('option', { name: '- สยาม' }).click()   
                console.log('เลือกสยาม')
                break;
        }
    }

    async clickLevelEdicationButton(option: "ปริญญาโท" | "ปริญญาเอก"){
        await this.levelEducationButton.click()
        switch (option){
            case "ปริญญาโท":
                await this.page.getByRole('option', { name: 'ปริญญาโท' }).click()
                console.log('เลือกปริญญาโท')
                break;
            case "ปริญญาเอก":
                await this.page.getByRole('option', { name: 'ปริญญาเอก' }).click()
                console.log('เลือกปริญญาเอก')
                break;
        }
    }

    async chooseModuleDropdown(moduleName : string){
        await this.chooseModule.click()
        const dropdownModule = this.page.getByRole('option', { name: moduleName })
        await dropdownModule.click()
    }

    async chooseTemplateTypeButton(moduleName : string){
        await this.chooseTemplateType.click()
        const dropdownTemplateType = this.page.getByRole('option', { name: moduleName })
        await dropdownTemplateType.click()
    }

    async chooseSystemWorklTypeButton(moduleName : string){
        await this.systemWork.click()
        const dropdownSystemWork = this.page.getByRole('option', { name: moduleName })
        await dropdownSystemWork.click()
    }
}