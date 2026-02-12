import { test, expect } from '../fixtures/baseTest';
import path from 'path';

test.describe('NIDA Mobile Module (Admin)', () => {
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
        await mobileManageTermAndConditionsPage.selectWorkType('REGISTER'); //SUPER_APP - ระบบ Mobile Super
        await mobileManageTermAndConditionsPage.selectVersion('1.x');
        await mobileManageTermAndConditionsPage.selectStatus('ใช้งาน'); //หรือ ไม่ใช้งาน
        await mobileManageTermAndConditionsPage.clickSearchButton()
        
    })

});