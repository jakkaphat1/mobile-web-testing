import { test as base } from '@playwright/test';
import { MobileManageAndNotiPage } from '../pages/MobileManageAndNotiPage';
import { CommonPage } from '../pages/CommonPage';
import { MobileManageTermAndConditionsPage } from '../pages/MobileManageTermAndConditionsPage';
import { MobileManageTemplateAndNotiPage } from '../pages/MobileManageTemplateAndNotiPage.ts'

type MyFixtures = {
    mobileManageAndNotiPage: MobileManageAndNotiPage
    commonPage : CommonPage
    mobileManageTermAndConditionsPage : MobileManageTermAndConditionsPage
    mobileManageTemplateAndNotiPage : MobileManageTemplateAndNotiPage
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
    }


});

export { expect } from '@playwright/test';