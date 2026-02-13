import { test, expect } from '../fixtures/baseTest';
import path from 'path';

test.describe('NIDA Mobile Module (Admin) | จัดการเงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัครนักศึกษาใหม่ ส่วนงานดำเนินการฝ่ายเจ้าหน้าที่ (NIDA Back office)' , async ({ page, mobileManageAndNotiPage , commonPage}) => {
        await commonPage.gotoBackOfficeLandingPage();
        await commonPage.fillUsernameAndPasswordInLoginPage('sys_admin1','unext@2022');
    })

    test('TC-02 การเข้าใช้งานเมนูจัดการ เงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
    })

    test('TC-03 ทดสอบค้นหาข้อมูลเงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage ,mobileManageTermAndConditionsPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
        await mobileManageTermAndConditionsPage.selectWorkType('SUPER_APP - ระบบ Mobile Super'); //SUPER_APP - ระบบ Mobile Super หรือ REGISTER
        await mobileManageTermAndConditionsPage.selectVersion('1.x');
        await mobileManageTermAndConditionsPage.selectStatus('ใช้งาน'); //หรือ ไม่ใช้งาน
        await mobileManageTermAndConditionsPage.clickSearchButton()
        await page.waitForTimeout(1000);
        await mobileManageTermAndConditionsPage.clickClearFilterButton()
        await page.waitForTimeout(1000);
    })

    test('TC-04 ทดสอบเพิ่มเงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage ,mobileManageTermAndConditionsPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
        await mobileManageTermAndConditionsPage.clickAddTermButton()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent/create');
        await mobileManageTermAndConditionsPage.selectSystemDropdown('ระบบดำเนินการฝ่ายเจ้าหน้าที่')    
        await mobileManageTermAndConditionsPage.checkAddTermAndConditionPage()
        await mobileManageTermAndConditionsPage.changeVersion('+')
        await mobileManageTermAndConditionsPage.fillTermAndConditionTH('ทดสอบเพิ่มเงื่อนไข ภาษาไทย')
        await mobileManageTermAndConditionsPage.fillTermAndConditionEN('ทดสอบเพิ่มเงื่อนไข ภาษาอังกฤษ')
        await mobileManageTermAndConditionsPage.fillPolicyTH('ทดสอบเพิ่มนโยบาย ภาษาไทย')
        await mobileManageTermAndConditionsPage.fillPolicyEN('ทดสอบเพิ่มนโยบาย ภาษาอังกฤษ')
        await mobileManageTermAndConditionsPage.clickSaveButton()
        await mobileManageTermAndConditionsPage.clickConfirmButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    })

    test('TC-05 ทดสอบเพิ่มเงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage ,mobileManageTermAndConditionsPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
        await mobileManageTermAndConditionsPage.clickEditButton('REGISTER - 1.6')
        await expect(page).toHaveURL(/.*\/consent\/edit\/.*/);
        await mobileManageTermAndConditionsPage.checkAddTermAndConditionPage()
        await mobileManageTermAndConditionsPage.clearInputField()
        await mobileManageTermAndConditionsPage.fillTermAndConditionTH('ทดสอบเพิ่มเงื่อนไข ภาษาไทย (ใหม่)')
        await mobileManageTermAndConditionsPage.fillTermAndConditionEN('ทดสอบเพิ่มเงื่อนไข ภาษาอังกฤษ(ใหม่)')
        await mobileManageTermAndConditionsPage.fillPolicyTH('ทดสอบเพิ่มนโยบาย ภาษาไทย(ใหม่)')
        await mobileManageTermAndConditionsPage.fillPolicyEN('ทดสอบเพิ่มนโยบาย ภาษาอังกฤษ(ใหม่)')
        await mobileManageTermAndConditionsPage.clickSaveButton()
        await mobileManageTermAndConditionsPage.clickConfirmButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    })

    test('TC-06 ทดสอบลบเงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage ,mobileManageTermAndConditionsPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
        await mobileManageTermAndConditionsPage.clickDeleteButton('REGISTER - 1.6')
        await mobileManageTermAndConditionsPage.clickConfirmButton()
        await expect(page.getByText('ทำรายการสำเร็จแล้ว')).toBeVisible();
    })
});