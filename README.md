# asar-link - Electron Archive with link management
Directly forked from https://github.com/electron/asar/blob/master/package.json.

This package is done for resolving the discussion https://github.com/electron-userland/electron-builder/issues/675.
We completely agree, we MUST not use npm link for a production package but in our dev environment in order to accelerate build and save disk space, we are used to call npm link and even sometime create junctions.

This version adds the management of link folder.
A new option is now available
* --follow-links

Adding this option, convert symbolic link to real directory in the asar file

