import { test as base } from '@playwright/test';
import { MobileNotificationTemplatePage } from '../pages/MobileNotificationTemplatePage';
import { CommonPage } from '../pages/CommonPage';

type MyFixtures = {
    mobileNotificationTemplatePage: MobileNotificationTemplatePage
    commonPage : CommonPage
};

export const test = base.extend<MyFixtures>({
    mobileNotificationTemplatePage: async ({ page }, use) => {
        const mobileNotificationTemplatePage = new MobileNotificationTemplatePage(page);
        await use(mobileNotificationTemplatePage)
    },
    commonPage: async ({ page }, use) => {
        const commonPage = new CommonPage(page);
        await use(commonPage)
    }

});

export { expect } from '@playwright/test';