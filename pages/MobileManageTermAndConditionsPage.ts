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
    clearFilterButton
    AddTermButton
    chooseSystemDropdown
    decreaseVersionLabel
    increaseVersionLabel
    TermAndConditionTHLabel
    TermAndConditionENLabel
    TermAndConditionTHInputBox
    TermAndConditionENInputBox

    PolicyTHLabel
    PolicyENLabel
    PolicyTHInputBox
    PolicyENInputBox
    SaveButton
    ConfirmButton
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;   
        this.chooseWorkTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกระบบงาน$/ }).nth(3)
        this.chooseVersionDropdown = this.page.locator('div').filter({ hasText: /^เลือกเวอร์ชัน$/ }).nth(3)
        this.chooseStatusDropdown = this.page.locator('div').filter({ hasText: /^ใช้งาน$/ }).nth(3)
        this.searchButton = this.page.getByRole('button', { name: 'ค้นหา' })
        this.clearFilterButton = this.page.getByRole('button').nth(3)
        this.AddTermButton = this.page.getByRole('button', { name: 'เพิ่มการจัดการ' })
        this.chooseSystemDropdown = this.page.locator('div').filter({ hasText: /^เลือกระบบงาน$/ }).nth(3)
        this.decreaseVersionLabel = this.page.getByRole('button').nth(3)
        this.increaseVersionLabel = this.page.getByRole('button').nth(4)
        this.TermAndConditionTHLabel = this.page.getByText('กำหนด Terms & Condition (TH)')
        this.TermAndConditionENLabel = this.page.getByText('กำหนด Terms & Condition (EN)')
        this.TermAndConditionTHInputBox = this.page.getByRole('textbox', { name: 'รายละเอียด' }).first()
        this.TermAndConditionENInputBox = this.page.getByRole('textbox', { name: 'รายละเอียด' }).nth(1)
        this.PolicyTHLabel = this.page.getByText('กำหนด Policy (TH)')
        this.PolicyENLabel = this.page.getByText('กำหนด Policy (EN)')
        this.PolicyTHInputBox = this.page.getByRole('textbox', { name: 'รายละเอียด' }).nth(2)
        this.PolicyENInputBox = this.page.getByRole('textbox', { name: 'รายละเอียด' }).nth(3)
        this.SaveButton = this.page.getByRole('button', { name: 'บันทึก' })
        this.ConfirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
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

    async clickClearFilterButton(){
        await this.clearFilterButton.click()
    }

    async clickAddTermButton(){
        await this.AddTermButton.click()
    }

    async selectSystemDropdown(system: string){
        await this.chooseSystemDropdown.click();
        const selectSystemDropdown = this.page.getByRole('option', { name: system })
        await selectSystemDropdown.click()
    }

    async changeVersion(operation: '+' | '-'){
        switch (operation) {
            case '+':
                console.log('Increase Version (+)');
                await this.increaseVersionLabel.click();
                break;
            case '-':
                console.log('Decrease Version (-)');
                await this.decreaseVersionLabel.click();
                break;
            default:
                throw new Error(`Invalid operation: ${operation}. Please use '+' or '-'`);
        }
    }

    async checkAddTermAndConditionPage(){
        await expect(this.TermAndConditionTHLabel).toBeVisible();
        await expect(this.TermAndConditionENLabel).toBeVisible();
        await expect(this.PolicyTHLabel).toBeVisible();
        await expect(this.PolicyENLabel).toBeVisible();
    }

    async fillTermAndConditionTH(termAndConditionTH: string){
        await this.TermAndConditionTHInputBox.fill(termAndConditionTH)
    }

    async fillTermAndConditionEN(termAndConditionEN: string){
        await this.TermAndConditionENInputBox.fill(termAndConditionEN)
    }

    async fillPolicyTH(policyTH: string){
        await this.PolicyTHInputBox.fill(policyTH)
    }

    async fillPolicyEN(policyEN: string){
        await this.PolicyENInputBox.fill(policyEN)
    }

    async clickSaveButton(){
        await this.SaveButton.click()
    }

    async clickConfirmButton(){
        await this.ConfirmButton.click()
    }

    async clickEditButton(SystemAndVersion: string){
        const card = this.page.locator('.card-container').filter({ hasText: SystemAndVersion });
        await card.locator('.buttonAction_list button').first().click();
    }

    async clickDeleteButton(SystemAndVersion: string){
        const card = this.page.locator('.card-container').filter({ hasText: SystemAndVersion });
        await card.locator('.delete-button').click();
    }

    async clearInputField(){
        await this.TermAndConditionTHInputBox.clear()
        await this.TermAndConditionENInputBox.clear()
        await this.PolicyTHInputBox.clear()
        await this.PolicyENInputBox.clear()
    }
}
