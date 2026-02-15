import { test as base } from '@playwright/test';
import { MobileManageAndNotiPage } from '../pages/MobileManageAndNotiPage';
import { CommonPage } from '../pages/CommonPage';
import { MobileManageTermAndConditionsPage } from '../pages/MobileManageTermAndConditionsPage';
import { MobileManageTemplateAndNotiPage } from '../pages/MobileManageTemplateAndNotiPage.ts'
import { ManageSystemNotifyAndMobileApplicationPage } from '../pages/ManageSystemNotifyAndMobileApplicationPage.ts'

type MyFixtures = {
    mobileManageAndNotiPage: MobileManageAndNotiPage
    commonPage : CommonPage
    mobileManageTermAndConditionsPage : MobileManageTermAndConditionsPage
    mobileManageTemplateAndNotiPage : MobileManageTemplateAndNotiPage
    manageSystemNotifyAndMobileApplicationPage : ManageSystemNotifyAndMobileApplicationPage
};

export const test = base.extend<MyFixtures>({
    mobileManageAndNotiPage: async ({ page }, use) => {
        const mobileManageAndNotiPage = new MobileManageAndNotiPage(page);
        await use(mobileManageAndNotiPage)
    },
    commonPage: async ({ page }, use) => {
        const commonPage = new CommonPage(page);
        await use(commonPage)
    },
    mobileManageTermAndConditionsPage:async ({ page } , use) => {
        const mobileManageTermAndConditionsPage = new MobileManageTermAndConditionsPage(page);
        await use(mobileManageTermAndConditionsPage)
    },
    mobileManageTemplateAndNotiPage:async ({ page } , use) => {
        const mobileManageTemplateAndNotiPage = new MobileManageTemplateAndNotiPage(page);
        await use(mobileManageTemplateAndNotiPage)
    },
    manageSystemNotifyAndMobileApplicationPage:async ({ page } , use) => {
        const manageSystemNotifyAndMobileApplicationPage = new ManageSystemNotifyAndMobileApplicationPage(page);
        await use(manageSystemNotifyAndMobileApplicationPage)
    }


});

export { expect } from '@playwright/test';