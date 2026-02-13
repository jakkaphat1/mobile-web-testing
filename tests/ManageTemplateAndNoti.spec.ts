import { test, expect } from '../fixtures/baseTest';
import path from 'path';

test.describe('NIDA Mobile Module (Admin)', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัครนักศึกษาใหม่ ส่วนงานดำเนินการฝ่ายเจ้าหน้าที่ (NIDA Back office)' , async ({ page, mobileManageAndNotiPage , commonPage}) => {
        await commonPage.gotoBackOfficeLandingPage();
        await commonPage.fillUsernameAndPasswordInLoginPage('sys_admin1','unext@2022');
    })

    test('TC-02 การเข้าใช้งานเมนูจัดการ Template แจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTemplateNotiBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template');
    })

    test('TC-03 ทดสอบค้นหาข้อมูล Template แจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage , mobileManageTemplateAndNotiPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTemplateNotiBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template');
        await mobileManageTemplateAndNotiPage.fillSearchTemplateNotiBox('แจ้งเตือน')
        await mobileManageTemplateAndNotiPage.chooseWaytoNotifyOption('1') // 1 = Email , 2 = Mobile
        await mobileManageTemplateAndNotiPage.chooseTemplateNotifyStatusOption('1') // 1 = ใช้งาน , 2 = ไม่ใช้งาน
        await mobileManageTemplateAndNotiPage.clickSearchButton()
    })
    
});