import package_json from '../package.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

export default {
  "manifest_version": 3,
  "name": process.env.TITLE,
  "description": process.env.DESC,
  "version": package_json.version,
  "icons": {
    "16": "logo/logo-16.png",
    "48": "logo/logo-48.png",
    "128": "logo/logo-128.png"
  },
  "action": {
    "default_title": process.env.TITLE,
    "default_popup": "popup.html"
  },
  "permissions": [
    "storage",
    "alarms",
    "tabs",
    "scripting",
    "background",
    "nativeMessaging",
    "contextMenus",
    "sidePanel"
  ],
  "host_permissions": [
    "*://*/*"
  ],
  "background": {
    "service_worker": "service-worker.js",
    "type": "module"
  },
  "side_panel": {
    "default_path": "popup.html"
  }
};
