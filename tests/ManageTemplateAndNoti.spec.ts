import { test, expect } from '../fixtures/baseTest';
import path from 'path';
import { CommonPage } from '../pages/CommonPage';

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

    test('TC-04 ทดสอบสร้าง Template เเจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage , mobileManageTemplateAndNotiPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTemplateNotiBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template');
        await mobileManageTemplateAndNotiPage.clickCreateTemplateNotifyButton()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template/create');
        const templateData = {
            notifyWay: 'Mobile Application',
            campus: 'ส่วนกลาง',
            educationLevel: 'ปริญญาโท',
            module: 'ASM - งานประเมิน',
            templateType: 'ASM02',
            systemWork: 'ระบบ Mobile Super App',
            senderName : 'John Doe',
            category : 'ส่วนกลาง',
            title : 'แจ้งเตือนการทดสอบสร้าง Template',
            link : 'https://backoffice-uat.nida.ac.th',
            messageContent : 'ทดสอบเพิ่มเนื้อหาจากการทดสอบสร้าง Template แจ้งเตือน',
            checkboxOption : true,
            futureDate : '1'
        };
        await mobileManageTemplateAndNotiPage.fillCreateTemplateForm(templateData);
        await mobileManageTemplateAndNotiPage.clickSaveButton()
        await mobileManageTemplateAndNotiPage.clickConfirmButton()
    })

    test('TC-05 ทดสอบแก้ไข Template เเจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage , mobileManageTemplateAndNotiPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageTemplateNotiBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/template');
        await mobileManageTemplateAndNotiPage.clickExpandFilterButton()
        await mobileManageTemplateAndNotiPage.chooseWaytoNotifyOption('2')
        await mobileManageTemplateAndNotiPage.clickLevelEdicationButton('ปริญญาโท')
        await mobileManageTemplateAndNotiPage.chooseModuleDropdown('ASM - งานประเมิน')
        await mobileManageTemplateAndNotiPage.clickSearchButton()
        await mobileManageTemplateAndNotiPage.clickEditButtonByCardName('ASM02')
        await expect(page).toHaveURL(/\/edit\//);
        const templateData = {
            // notifyWay: 'Mobile Application',
            campus: 'สีคิ้ว',
            educationLevel: 'ปริญญาเอก',
            module: 'ASM - งานประเมิน',
            templateType: 'ASM02',
            systemWork: 'ระบบ Mobile Super App',
            senderName : 'John Smith',
            category : 'ส่วนกลาง',
            title : 'แจ้งเตือนการทดสอบแก้ไข Template',
            link : 'https://backoffice-uat.nida.ac.th',
            messageContent : 'ทดสอบเพิ่มเนื้อหาจากการทดสอบแก้ Template แจ้งเตือน',
            checkboxOption : true,
            futureDate : '1'
        };
        await mobileManageTemplateAndNotiPage.fillEditTemplateForm(templateData);
        await mobileManageTemplateAndNotiPage.clickSaveButton()
        await mobileManageTemplateAndNotiPage.clickConfirmButton()
    })
});