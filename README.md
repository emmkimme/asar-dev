# asar-dev - Electron Development Archive with link management
Directly forked from https://github.com/electron/asar.

Purpose of this package is to offer a solution to the issue https://github.com/electron-userland/electron-builder/issues/675.  
```Error: /Users/user1/myapp/node_modules/myapp-lib: file links out of the package```

We completely agree, we **MUST** not use npm link for a production package but in our dev environment in order to accelerate build and save disk space, we are used to call npm link and even sometime create symbolic link.  

This version adds the support of 'out of the package' link.
A new option is now available for 'pack' mode
* --follow-links

expand symbolic link pointing out of the package to a directory in the asar file

```
asar-dev pack --follow-links ./build/app ./build/app.asar
```

Do not hesitate to suggest any ideas that could help in a development environment

BTW, this version should be faster on Windows, as current version checks file with a forward-slash and then re-check file with a back-slash. We are now working directly with the right path.sep