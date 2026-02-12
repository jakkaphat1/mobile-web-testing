import { test, expect } from '../fixtures/baseTest';
import path from 'path';

test.describe('NIDA Mobile Module (Admin)', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัครนักศึกษาใหม่ ส่วนงานดำเนินการฝ่ายเจ้าหน้าที่ (NIDA Back office)' , async ({ page, mobileNotificationTemplatePage , commonPage}) => {
        await commonPage.gotoBackOfficeLandingPage();
        await commonPage.fillUsernameAndPasswordInLoginPage('sys_admin1','unext@2022');
    })

    test('TC-02 การเข้าใช้งานเมนูจัดการ เงื่อนไข/การยินยอม เพื่อใช้บริการแอปพลิเคชัน' , async ({ page, mobileNotificationTemplatePage , commonPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileNotificationTemplatePage.clickManageMobileAndNotificationMenu()
        await mobileNotificationTemplatePage.clickWorkingBtn()
        await mobileNotificationTemplatePage.clickManageTermAndConditionsBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/consent');
    })



});