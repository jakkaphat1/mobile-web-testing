import { Page, Locator , expect } from '@playwright/test'; 

export interface IconItemData {
    titleTH?: string;      
    titleEN?: string;
    iconFilePath?: string; 
    type?: string;         
    iosUrl?: string;
    androidUrl?: string;
    isActive?: boolean;
}


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
    backgroundPreviewLabel
    saveButton
    comfirmPopupButton

    addListButton
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
        this.backgroundPreviewLabel = this.page.getByRole('img', { name: 'preview' }).first()

        this.saveButton = this.page.getByRole('button', { name: 'บันทึก' }).first()
        this.comfirmPopupButton = this.page.getByRole('button', { name: 'ยืนยัน' })

        this.addListButton = this.page.getByRole('button', { name: 'เพิ่มรายการ' })
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
        await expect(this.backgroundPreviewLabel).toBeVisible();
    }

    async checkManageIconMobileApplicationElement(){
        await expect(this.addListButton).toBeVisible()
        await expect(this.titleLabelEN).toBeVisible();
        await expect(this.descriptionLabelTH).toBeVisible();
        await expect(this.descriptionLabelEN).toBeVisible();
        await expect(this.backgroundDropbox).toBeVisible();
        await expect(this.backgroundPreviewLabel).toBeVisible();
    }

    async fillThemeLoginElement(titleTH? : string , titleEN? : string , describeTH? : string, describeEN? : string){   
        if(titleTH){
            const titleTHtextbox = this.page.getByRole('textbox', { name: 'ระบุหัวข้อ (ไทย)' })
            await titleTHtextbox.fill(titleTH)
        }

        if(titleEN){
            const titleENtextbox = this.page.getByRole('textbox', { name: 'ระบุหัวข้อ(อังกฤษ)' })
            await titleENtextbox.fill(titleEN)
        }

        if(describeTH){
            const titleENtextbox = this.page.getByRole('textbox', { name: 'ระบุคำอธิบาย (ไทย)' })
            await titleENtextbox.fill(describeTH)
        }

        if(describeEN){
            const titleENtextbox = this.page.getByRole('textbox', { name: 'ระบุคำอธิบาย (อังกฤษ)' })
            await titleENtextbox.fill(describeEN)
        }
    }
    
    async clickSaveButton(){
        await this.saveButton.click()
    }

    async clickComfirmPopupButton(){
        await this.comfirmPopupButton.click()
    }

    async clickAddItemButton() {
        await this.addListButton.click();
    }

    async fillItemDetailByOrderNumber(orderNumber: number, data: IconItemData) {
        const row = this.page.locator('tbody tr').nth(orderNumber - 1);
        await expect(row).toBeVisible();

        if (data.titleTH) {
            const inputTH = row.locator('td:nth-child(3) input[type="text"]').first();
            await inputTH.fill(data.titleTH);
        }

        if (data.titleEN) {
            const inputEN = row.locator('td:nth-child(3) .formLayout_container > div:nth-child(2) input[type="text"]');
            await inputEN.fill(data.titleEN);
        }

        if (data.iconFilePath) {

            const fileInput = row.locator('td:nth-child(4) input[type="file"]');
            await fileInput.setInputFiles(data.iconFilePath);
        }

        if (data.type) {
            const dropdown = row.locator('td:nth-child(5) .react-select__control');
            await dropdown.click();

            await this.page.locator('.react-select__menu').waitFor({ state: 'visible' });
            
            const option = this.page.locator('.react-select__option').filter({ hasText: data.type }).first();
            await option.click();
        }

        if (data.iosUrl) {
            const inputiOS = row.locator('td:nth-child(6) input[type="text"]').first();
            await inputiOS.fill(data.iosUrl);
        }

        if (data.androidUrl) {
            const inputAndroid = row.locator('td:nth-child(6) .formLayout_container > div:nth-child(2) input[type="text"]');
            await inputAndroid.fill(data.androidUrl);
        }

        if (data.isActive !== undefined) {
            const switchContainer = row.locator('td:nth-child(7) .switch_container');
            const checkbox = switchContainer.locator('input[type="checkbox"]');
            
            const isChecked = await checkbox.isChecked();
            if (isChecked !== data.isActive) {
                await switchContainer.locator('label').click();
            }
        }
    }

    async deleteTemDetailByOrderNumber(orderNumber: number){
        const row = this.page.locator('tbody tr').nth(orderNumber - 1);
        await expect(row).toBeVisible();

        if(orderNumber){
            console.log(`ลบการ์ดที่ ${orderNumber}`)
            const deleteBtn = row.locator('td:nth-child(8) .delete-button').first();
            // const deleteBtn = row.locator('.delete-button"]').first();
            await this.page.waitForTimeout(2000)
            await deleteBtn.click();
        }
    }

    async swapCardByOrder(fromOrder : number , toOrder : number){
        console.log(`ย้ายรายการจากลำดับที่ ${fromOrder} ไปยัง ${toOrder}`);

        const hambergerMenu = 'div[aria-roledescription="sortable"]'

        const sourceHandle = this.page.locator(hambergerMenu).nth(fromOrder - 1)
        const targetHandle = this.page.locator(hambergerMenu).nth(toOrder - 1)

        await expect(sourceHandle).toBeVisible();
        await expect(targetHandle).toBeVisible();

        await sourceHandle.dragTo(targetHandle, { steps: 10 });

        await this.page.waitForTimeout(500);
    }

    async clickSaveButtonInManageIconMobile(){
        
        const container = this.page.locator('.contentFrame_container');

        await container.getByRole('button', { name: 'บันทึก' }).nth(1).click();
    }

    async checkSetThemeColor(systemName : string){
        // const graduateThemeInput =  this.page.getByRole('textbox', { name: 'ระบุรหัสสี' }).first()
        // const graduateSecondThemeInput = this.page.getByRole('textbox', { name: 'ระบุรหัสสี' }).nth(1)
        // await expect(graduateThemeInput).toBeVisible()
        // await expect(graduateSecondThemeInput).toBeVisible()

        const card = this.page.locator('.space-y-3')
                              .filter({ has: this.page.locator('.tag_box', { hasText: systemName }) });

        const primaryInput = card.getByPlaceholder('ระบุรหัสสี').first();
        await primaryInput.scrollIntoViewIfNeeded()
        const secondaryInput = card.getByPlaceholder('ระบุรหัสสี').nth(1);
        await secondaryInput.scrollIntoViewIfNeeded()

        await expect(primaryInput).toBeVisible();
        await expect(secondaryInput).toBeVisible();
    }

    async fillSetThemeColor(systemName : string , primaryColor: string, secondaryColor: string){
        const card = this.page.locator('.space-y-3')
                              .filter({ has: this.page.locator('.tag_box', { hasText: systemName } ) });

        const primaryInput = card.getByPlaceholder('ระบุรหัสสี').first();
        await primaryInput.scrollIntoViewIfNeeded()
        const secondaryInput = card.getByPlaceholder('ระบุรหัสสี').nth(1);

        await primaryInput.fill(primaryColor);
        await secondaryInput.fill(secondaryColor);

        // await expect(primaryInput).toHaveValue(primaryColor);
        // await expect(secondaryInput).toHaveValue(secondaryColor);
    }

    async clickSaveButtonInSetTheme(){
        
        const container = this.page.locator('.contentFrame_container');

        await container.getByRole('button', { name: 'บันทึก' }).nth(2).click();
    }

    async checkAPINotifyStatusLabel() {
            const mobileNotifyLabel = this.page.getByText('แจ้งเตือนทาง Mobile')
            await expect(mobileNotifyLabel).toBeVisible()
            await mobileNotifyLabel.scrollIntoViewIfNeeded()

            const emailNotifyLabel = this.page.getByText('แจ้งเตือนทาง Email')
            await expect(emailNotifyLabel).toBeVisible()
            await emailNotifyLabel.scrollIntoViewIfNeeded()

            const smsNotifyLabel = this.page.getByText('แจ้งเตือนทาง SMS')
            await expect(smsNotifyLabel).toBeVisible()
            await smsNotifyLabel.scrollIntoViewIfNeeded()
    }

    async setAPINotifyStatus(labelName: string, enable: boolean) {
        const row = this.page.locator('.formItem_vertical').filter({ hasText: labelName });

        const switchButton = row.locator('.switch'); 
        const statusLabel = row.locator('.switch .label');

        const currentText = await statusLabel.innerText();
        const isCurrentlyOn = currentText.includes('เปิด');

        if (isCurrentlyOn !== enable) {
            await switchButton.click();
            const expectedText = enable ? 'เปิด' : 'ปิด';
            await expect(statusLabel).toHaveText(expectedText);
        } 
    }
    
    async clickSaveButtonInAPINotify(){
        
        const container = this.page.locator('.contentFrame_container');

        await container.getByRole('button', { name: 'บันทึก' }).nth(3).click();
    }
}
