import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    headless: false,  // ← เก็บไว้
    // viewport: { width: 1280, height: 720 },
    viewport: null,
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
    
    launchOptions: {
      headless: false,  // ← เพิ่มตรงนี้ด้วย
      slowMo: 500,      // ← ชะลอให้เห็นชัดขึ้น (optional)
      args: ['--start-maximized','--disable-blink-features=AutomationControlled',]
    }
  },

  projects: [

    // เพิ่ม path ตัว setup สำหรับการ authenticate
    {
      name: 'setup',
      testMatch: /backoffice\.auth\.setup\.ts/,
    },

    {
      name: 'chromium-ui',
      testMatch: ['**/*.spec.ts'],
      use: { 
        // ...devices['Desktop Chrome'],
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json', // ชี้ไปที่ไฟล์ที่จะเซฟ
        viewport: null,
      },
      // dependencies: ['setup'],
    },
  ],
});