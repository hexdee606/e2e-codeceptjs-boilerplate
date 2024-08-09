const path = require('path');
const envURL = require('./env.conf');

const host_url = envURL[envURL.env].web.host_url;
const downloadDir = path.join(__dirname, '../outputs/Download');

module.exports = {
    url: host_url,
    show: false, // Headless mode
    browser: 'chromium',
    waitForTimeout: 30000, // Consistent timeout for all operations
    smartWait: 10000, // Smart wait for elements to appear
    restart: true,
    windowSize: '1280x1024',
    keepCookies: false,
    keepBrowserState: false,
    waitForNavigation: "networkidle", // Wait until network is idle (all resources loaded)
    viewport: {
        width: 1280,
        height: 1024
    },
    video: true,
    videoOptions: {
        path: '../outputs/videos',
        size: {
            width: 1280,
            height: 1024
        }
    },
    chromium: {
        args: [
            '--no-sandbox',
            '--start-fullscreen',
            '--disable-web-security',
            '--safebrowsing-disable-download-protection',
            '--disable-setuid-sandbox', // Additional argument for headless stability
            '--disable-dev-shm-usage', // Avoid issues with large pages
            '--disable-extensions', // Disable extensions for headless mode
            '--disable-gpu', // Disable GPU for headless mode (optional, Chromium)
        ],
        acceptDownloads: true,
        downloadsPath: downloadDir
    },
    launchOptions: {
        timeout: 60000, // Consistent launch timeout
        viewport: {
            width: 1280,
            height: 1024
        },
        deviceScaleFactor: 1,
    }
};
