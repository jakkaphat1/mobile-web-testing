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

    test('TC-03.1 ทดสอบค้นหาข้อมูล Template แจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage , mobileManageTemplateAndNotiPage}) => {
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
    
    test('TC-03.2 ทดสอบค้นหาข้อมูล Template แจ้งเตือน กรณีระบุเงื่อนไขในการค้นหาเพิ่มเติม' , async ({ page, mobileManageAndNotiPage , commonPage , mobileManageTemplateAndNotiPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTemplateNotiBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template');
        await mobileManageTemplateAndNotiPage.clickExpandFilterButton()
        // await mobileManageTemplateAndNotiPage.fillSearchTemplateNotiBox('แจ้งเตือน')
        await mobileManageTemplateAndNotiPage.chooseWaytoNotifyOption('1') // 1 = Email , 2 = Mobile
        await mobileManageTemplateAndNotiPage.chooseTemplateNotifyStatusOption('1') // 1 = ใช้งาน , 2 = ไม่ใช้งาน
        await mobileManageTemplateAndNotiPage.clickCampusDropdown('ส่วนกลาง')
        await mobileManageTemplateAndNotiPage.clickLevelEdicationButton('ปริญญาโท')
        await mobileManageTemplateAndNotiPage.chooseModuleDropdown('ASM - งานประเมิน')
        await mobileManageTemplateAndNotiPage.chooseTemplateTypeButton('ASM01')
        await mobileManageTemplateAndNotiPage.chooseSystemWorklTypeButton('ระบบ Mobile Super App')
        await mobileManageTemplateAndNotiPage.clickSearchButton()
    })
});