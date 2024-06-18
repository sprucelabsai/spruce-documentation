# Views

Diagrams and details here coming soon...

## View Controller Plugins

You can globally enhance View Controller functionality by using View Controller Plugins. Here are some plugins that are already available:

1. [AutoLogoutPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-heartwood-utils): Automatically logs out a person after a certain period of inactivity. You can set the timeout in seconds and also disable it where desired.
2. [AdjustMmpVcPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-mmp-vc-plugin): Used to communicate with the MMP (Mobile Media Partners) Adjust. Others like AppsFlyer may come later. It currently only works inside the Spruce native iOS app.

### Implementing a View Controller Plugin

#### Test 1: Is the plugin installed?

```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { AutoLogoutPlugin } from '@sprucelabs/spruce-heartwood-utils'

@test()
protected static async autoLogoutPluginInstalled() {
    vcPluginAssert.pluginIsInstalled(
        this.views.Controller('eightbitstories.root', {}),
        'autoLogout',
        AutoLogoutPlugin
    )
}
```

Note: If you are planning on using your own plugin (one that is not built yet), type it instead of `AutoLogoutPlugin` as if it exists and then begin with the productions steps below.

#### Production 1: Install the plugin

1. Install the module that holds the plugin: `yarn add {packageName}`
2. Create the plugin: `spruce create.view.plugin`
3. Implement the plugin into `./src/viewPlugins/{pluginName}.ts`

If you using a prebuild plugin, you would implement it like this:

```ts
export { AutoLogoutPlugin as default } from '@sprucelabs/spruce-heartwood-utils'
```

If you are building your own plugin, it may look like this:

```ts
import { ViewControllerPlugin } from '@sprucelabs/heartwood-view-controllers'

export default class MyViewPlugin implements ViewControllerPlugin {
    public async doSomething() {
        ...
    }
}

```

If you are creating your own plugin, you will need to import it into your test now.
