import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

    const unlisten = await onUpdaterEvent(({ error, status }) => {
            console.log('Updater event', error, status);
        });
        try {
            const { shouldUpdate, manifest } = await checkUpdate()

            console.log(shouldUpdate, manifest)

            if (shouldUpdate) {
              // You could show a dialog asking the user if they want to install the update here.
              console.log(
                `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
              )
          
              // Install the update. This will also restart the app on Windows!
              await installUpdate()
          
              // On macOS and Linux you will need to restart the app manually.
              // You could use this step to display another confirmation dialog.
              await relaunch()
            }
        }
        catch (error) {
            console.error(error)
        }
        unlisten();
    

