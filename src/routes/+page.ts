// Import Tauri APIs
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

// Define function to check for updates
export async function _checkForUpdate() {
  // Check if running in a browser environment
  console.log(typeof window !== "undefined")
  if (typeof window !== 'undefined') {
    // Client-side code using Tauri APIs
    const unlisten = await onUpdaterEvent(({ error, status }) => {
      console.log('Updater event', error, status);
    });

    try {
      const { shouldUpdate, manifest } = await checkUpdate();

      if (shouldUpdate) {
        console.log(
          `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
        );

        await installUpdate();

        await relaunch();
      }
    } catch (error) {
      console.error(error);
    }

    unlisten();
  }
}

// Load function to execute on client-side
export async function load() {
  // Call the function to check for updates
  await _checkForUpdate();
}