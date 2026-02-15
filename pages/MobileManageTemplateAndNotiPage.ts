import { Page, Locator , expect } from '@playwright/test';

export interface TemplateFormData {
    notifyWay?: string;   // เช่น 'Email' หรือ '1'
    campus?: string;      // เช่น 'ส่วนกลาง'
    educationLevel?: string; // เช่น 'ปริญญาโท'
    module?: string;      // เช่น 'ASM - งานประเมิน'
    templateType?: string;// เช่น 'ASM01'
    systemWork?: string;  // เช่น 'ระบบ Mobile Super App'

    senderName? : string;
    category? : string;
    title? : string;
    link? : string;
    messageContent? : string;
    checkboxOption? : boolean
    futureDate? : string
}


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
    createTemplateNotifyButton
    popupSaveButton
    popupConfirmButton
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

        this.createTemplateNotifyButton = this.page.getByRole('button', { name: 'สร้าง Template' })
        this.popupSaveButton = this.page.getByRole('button', { name: 'บันทึก' })
        this.popupConfirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
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
        await this.page.waitForTimeout(2000)
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

    async clickCreateTemplateNotifyButton(){
        await this.createTemplateNotifyButton.click()
    }

    async clickEditButtonByCardName(cardName: string) {
        const card = this.page.locator('.card-container').filter({ hasText: cardName });
        await card.locator('.buttonAction_button:not(.delete-button)').click();
    }

    async clickDeleteButtonByCardName(cardName: string) {
        const card = this.page.locator('.card-container').filter({ hasText: cardName });
        await card.locator('.delete-button').click();
    }


    async fillCreateTemplateForm(data: TemplateFormData){
        if (data.notifyWay) {
            await this.page.locator('div').filter({ hasText: /^เลือกช่องทางการแจ้งเตือน$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.notifyWay }).click();
        }   

        if (data.campus) {
            await this.page.locator('div').filter({ hasText: /^เลือกวิทยาเขต$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.campus }).click();
        }

        if (data.educationLevel) {
            await this.page.locator('div').filter({ hasText: /^เลือกระดับปริญญา$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.educationLevel }).click();
        }

        if (data.module) {
            await this.page.locator('div').filter({ hasText: /^เลือกโมดูล$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.module }).click();
        }

        if (data.templateType) {
            await this.page.locator('div').filter({ hasText: /^เลือกประเภท Template$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.templateType }).click();
        }

        if (data.systemWork) {
            await this.page.locator('div').filter({ hasText: /^เลือกระบบงาน$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.systemWork }).click();
        }

        if (data.senderName) {
        // เปลี่ยนจาก pressSequentially เป็น fill เพื่อความรวดเร็วและรองรับการ Edit
        await this.page.getByRole('textbox', { name: 'ระบุชื่อผู้ส่ง' }).fill(data.senderName);
        }

        if (data.category) {
            await this.page.locator('div').filter({ hasText: /^เลือกหมวดหมู่$/ }).nth(3).click();
            await this.page.getByRole('option', { name: data.category }).click();
        }

        if (data.title) {
            await this.page.getByRole('textbox', { name: 'ระบุหัวข้อ' }).fill(data.title);
        }

        if (data.link) {
            await this.page.getByRole('textbox', { name: 'ระบุลิงก์' }).fill(data.link);
        }

        if (data.messageContent) {
            await this.page.getByRole('textbox', { name: 'ระบุข้อความ' }).fill(data.messageContent);
        }

        if (data.checkboxOption !== undefined) {
            await this.page.getByRole('checkbox').nth(2).setChecked(data.checkboxOption);
        }

        if(data.checkboxOption == true && data.futureDate){
            await this.page.getByRole('textbox', { name: 'ระบุจำนวนวันแจ้งเตือนล่วงหน้า' }).fill(data.futureDate)
        }else{
            console.log('ไม่แจ้งเตือนล่วงหน้า')
        }
    }

    async fillEditTemplateForm(data: TemplateFormData){
        const dropdowns = this.page.locator('.react-select__control');

        // if (data.notifyWay) {
        //     await dropdowns.nth(0).click();
        //     await this.page.locator('div').filter({ hasText: /^เลือกช่องทางการแจ้งเตือน$/ }).nth(3).click();
        //     await this.page.getByRole('option', { name: data.notifyWay }).click();
        // }   

        if (data.campus) {
            await dropdowns.nth(1).click();
            await this.page.getByRole('option', { name: data.campus }).click();
        }

        if (data.educationLevel) {
            await dropdowns.nth(2).click();
            await this.page.getByRole('option', { name: data.educationLevel }).click();
        }

        if (data.module) {
            await dropdowns.nth(3).click();
            await this.page.getByRole('option', { name: data.module }).click();
        }

        if (data.templateType) {
            await dropdowns.nth(4).click();
            await this.page.getByRole('option', { name: data.templateType }).click();
        }

        if (data.systemWork) {
            await dropdowns.nth(5).click();
            await this.page.getByRole('option', { name: data.systemWork }).click();
        }

        if (data.senderName) {
            await this.page.getByRole('textbox', { name: 'ระบุชื่อผู้ส่ง' }).fill(data.senderName);
        }

        if (data.category) {
            await dropdowns.nth(6).click();
            await this.page.getByRole('option', { name: data.category }).click();
        }

        if (data.title) {
            await this.page.getByRole('textbox', { name: 'ระบุหัวข้อ' }).fill(data.title);
        }

        if (data.link) {
            await this.page.getByRole('textbox', { name: 'ระบุลิงก์' }).fill(data.link);
        }

        if (data.messageContent) {
            await this.page.getByRole('textbox', { name: 'ระบุข้อความ' }).fill(data.messageContent);
        }

        if (data.checkboxOption !== undefined) {
            await this.page.getByRole('checkbox').nth(2).setChecked(data.checkboxOption);
        }

        if(data.checkboxOption == true && data.futureDate){
            await this.page.getByRole('textbox', { name: 'ระบุจำนวนวันแจ้งเตือนล่วงหน้า' }).fill(data.futureDate)
        }else{
            console.log('ไม่แจ้งเตือนล่วงหน้า')
        }
    }


    async clickSaveButton(){
        await this.popupSaveButton.click()
    }

    async clickConfirmButton(){
        await this.popupConfirmButton.click()
    }
}