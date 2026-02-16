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

        await manageSystemNotifyAndMobileApplicationPage.fillThemeLoginElement('ยินดีต้อนรับเข้าสู่ NIDA Super App ทดสอบ'
            ,'Welcome to NIDA Super App Test','เวอร์ชั่นเบต้า 0.1 (ทดสอบ UAT20251125 ครั้งที่1)','Beta version 0.1 (Test With UAT20251125 1st)')
        
        await manageSystemNotifyAndMobileApplicationPage.clickSaveButton()
        await page.waitForTimeout(2000)
        await expect(page.getByText('บันทึกการจัดการองค์ประกอบของโมบายแอปพลิเคชัน')).toBeVisible();
        await manageSystemNotifyAndMobileApplicationPage.clickComfirmPopupButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จแล้ว')).toBeVisible();
    })

    test('TC-04.1 ทดสอบจัดการรายการไอคอนของโมบายแอปพลิเคชัน' , async ({ page, mobileManageAndNotiPage , commonPage , manageSystemNotifyAndMobileApplicationPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  
        await manageSystemNotifyAndMobileApplicationPage.clickAddItemButton()
        await manageSystemNotifyAndMobileApplicationPage.fillItemDetailByOrderNumber(9,{
            titleTH: 'สตาร์บัค',
            titleEN: 'Starbuck',
            type: 'Application',
            iconFilePath: './picture-data/starbucks.png',
            iosUrl: 'https://apps.apple.com/th/app/starbucks-thailand/id898062370',
            androidUrl: 'https://play.google.com/store/apps/details?id=com.starbucks.thailand&hl=th',
            isActive: true
        })
        await manageSystemNotifyAndMobileApplicationPage.swapCardByOrder(9,8)
        await manageSystemNotifyAndMobileApplicationPage.clickSaveButtonInManageIconMobile()
        await expect(page.getByText('บันทึกรายการไอคอนของโมบายแอปพลิเคชัน')).toBeVisible();
        await manageSystemNotifyAndMobileApplicationPage.clickComfirmPopupButton()
    })

    test('TC-04.2 ทดสอบลบข้อมูล' , async ({ page, mobileManageAndNotiPage , commonPage , manageSystemNotifyAndMobileApplicationPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  
        await manageSystemNotifyAndMobileApplicationPage.deleteTemDetailByOrderNumber(8)
        // await expect(page.getByText('ยืนยันการลบข้อมูล', {exact : true})).toBeVisible();
        await expect(page.getByRole('heading', { name: 'ยืนยันการลบข้อมูล' })).toBeVisible();
        await manageSystemNotifyAndMobileApplicationPage.clickComfirmPopupButton()
    })

    test('TC-05 ทดสอบกำหนดธีม' , async ({ page, mobileManageAndNotiPage , commonPage , manageSystemNotifyAndMobileApplicationPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  

        // เช็ค
        const systemNameList = [
            'งานสำเร็จการศึกษา',
            'งานลงทะเบียนเรียน',
            'งานวัดผลและประมวลผล',
            'งานหลักสูตร และ มคอ.',
            'งานประเมิน',
            'งานอาจารย์ที่ปรึกษา',
            'งานเทียบโอน'
        ]
        for (const name of systemNameList) {
            await manageSystemNotifyAndMobileApplicationPage.checkSetThemeColor(name);
        }

        //ใส่สี
        const themes = [
            { 
                name: 'งานลงทะเบียนเรียน', 
                primary: '#f27821', 
                secondary: '#FFE0BC'
            },
            { 
                name: 'งานสำเร็จการศึกษา', 
                primary: '#d95c3f', 
                secondary: '#FFEDE7' 
            },
            { 
                name: 'งานวัดผลและประมวลผล', 
                primary: '#37c898', 
                secondary: '#CEF4D5' 
            },
            {
                name : 'งานหลักสูตร และ มคอ.',
                primary: '#8eca4e', 
                secondary: '#e4fbdf' 
            },
            {
                name : 'งานประเมิน',
                primary: '#2d99ff', 
                secondary: '#D1F1FF' 
            },
            {
                name : 'งานอาจารย์ที่ปรึกษา',
                primary: '#9176db', 
                secondary: '#e9b5f7' 
            },
            {
                name : 'งานเทียบโอน',
                primary: '#EAB308', 
                secondary: '#FFF6CD' 
            }
        ];

        // วนลูป fill ทีละชุด
        for (const data of themes) {
            await manageSystemNotifyAndMobileApplicationPage.fillSetThemeColor(
                data.name, 
                data.primary, 
                data.secondary
            );
        }

        await manageSystemNotifyAndMobileApplicationPage.clickSaveButtonInSetTheme()
        await expect(page.getByRole('heading', { name: 'ยืนยันการลบข้อมูล' })).toBeVisible();
        await manageSystemNotifyAndMobileApplicationPage.clickComfirmPopupButton()
    })

    test('TC-06 ทดสอบกำหนดการเปิด/ปิดการทำงานของ API แจ้งเตือน' , async ({ page, mobileManageAndNotiPage , commonPage , manageSystemNotifyAndMobileApplicationPage}) => {
        await commonPage.gotoBackOfficeDashboardPage();
        await mobileManageAndNotiPage.clickManageMobileAndNotificationMenu()
        await mobileManageAndNotiPage.clickWorkingBtn()
        await mobileManageAndNotiPage.clickManageSystemNotifyAndMobileApplicationBtn()
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/admin/notification/transaction/mobile');  
        await manageSystemNotifyAndMobileApplicationPage.checkAPINotifyStatusLabel()
        await manageSystemNotifyAndMobileApplicationPage.setAPINotifyStatus('แจ้งเตือนทาง Mobile แอปพลิเคชัน', false)
        // await manageSystemNotifyAndMobileApplicationPage.setAPINotifyStatus('แจ้งเตือนทาง Email', false)
        // await manageSystemNotifyAndMobileApplicationPage.setAPINotifyStatus('แจ้งเตือนทาง SMS', false)
        await manageSystemNotifyAndMobileApplicationPage.clickSaveButtonInAPINotify()
        await expect(page.getByRole('heading', { name: 'บันทึกการเปิด/ปิดการทำงานของ API แจ้งเตือน' })).toBeVisible();
        await manageSystemNotifyAndMobileApplicationPage.clickComfirmPopupButton()
    })

});