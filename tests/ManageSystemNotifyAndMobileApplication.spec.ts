import { test, expect } from '../fixtures/baseTest';
import path from 'path';
import { MobileManageAndNotiPage } from '../pages/MobileManageAndNotiPage';
import { CommonPage } from '../pages/CommonPage';
import { MobileManageTermAndConditionsPage } from '../pages/MobileManageTermAndConditionsPage';
import { MobileManageTemplateAndNotiPage } from '../pages/MobileManageTemplateAndNotiPage.ts'
import { ManageSystemNotifyAndMobileApplicationPage } from '../pages/ManageSystemNotifyAndMobileApplicationPage.ts'

test.describe('NIDA Mobile Module (Admin) | จัดการค่าเริ่มต้นระบบแจ้งเตือน/โมบายแอปพลิเคชัน', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัครนักศึกษาใหม่ ส่วนงานดำเนินการฝ่ายเจ้าหน้าที่ (NIDA Back office)' , async ({ page, commonPage}) => {
        await commonPage.gotoBackOfficeLandingPage();
        await commonPage.fillUsernameAndPasswordInLoginPage('sys_admin1','unext@2022');
    })

    test('TC-02 การเข้าใช้งานเมนูจัดการค่าเริ่มต้นระบบแจ้งเตือน/โมบายแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  
    })

    test('TC-03.1 ทดสอบจัดการธีมหน้า Login' , async ({ page, mobileManageAndNotiPage , commonPage , manageSystemNotifyAndMobileApplicationPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  
        await manageSystemNotifyAndMobileApplicationPage.checkThemeLoginElement()
    })


});