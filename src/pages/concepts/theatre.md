# Theatre

The `Theatre` is a totally self contained environment that runs all your skills. It also handles operations that span multiple skills, like `boot` or `upgrade`.

In a technical sense, it's a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains all your skills that uses [pm2](https://pm2.keymetrics.io) to runs each skill. It relies on a bunch of bash scripts to do a lot of the heavy lifting.

The `Sprucebot Theatre` you downloaded as part of the onboarding is an [Electron app](https://www.electronjs.org) that points to the local `Theatre` installed at `~/.spruce/theatre-monorepo`.

When you open the `Sprucebot Theatre` app, it actually executes the following commands behind-the-scenes:

```bash
cd ~/.spruce/theatre-monorepo 
yarn boot
```

And when you shutdown the app, it runs:

```bash
cd ~/.spruce/theatre-monorepo
yarn shutdown
```

## Theatre Commands

> **Note:** If you are working with the `Theatre` directly, you use `yarn` to execute scripts. The `SpruceCLI` is used when working with individual `Skills`.

If you are working directly with the `Theatre` in your favorite terminal app, you have the following commands available:

| Command | Description |
| --- | --- |
| `yarn setup.theatre <path/to/blueprint.yml>` | Sets up the `Theatre` with the given `blueprint.yml`. It'll `git clone` all the skills defined in the `blueprint.yml` and then copy in any settings based on `namespace` |
| `yarn boot [namespace]` | If no `namespace` is supplied, it boots the Theatre by running `yarn boot` on all skills. If a `namespace` is supplied, it runs just on that `Skill`. |
| `yarn reboot [namespace]` | Runs `yarn shutdown`, resets boot counts, and then runs `yarn boot` on all skills. If a `namespace` is supplied, it will run those commands on just that `Skill`. |
| `yarn run update [namespace]` | Runs `git pull` on each skill, then runs `yarn` at the root level to ensure the latest dependencies are installed. If a `namespace` is supplied, it'll only `git pull` for that `Skill`. |
| `yarn run upgrade [namespace]` | Runs `git pull` and then `spruce upgrade` on each skill. If a `namespace` is supplied, it'll only run on that skill. |
| `yarn shutdown [namespace]` | Shuts down all skills unless an `namespace` is supplied. In that case, it'll only kill the `Skill` you specify. |
| `yarn commit.push.skills <commit message>` | Runs `git commit -m <message>` and then `git push` on every skill. |
| `yarn repair` | If you ever run into any `pm2` issues where it can't find yarn, this will fix that issue. **Make sure you `yarn shutdown` before running this!** |
| `yarn monitor` | Starts the `pm2` monitor. Which is a good way of seeing the live status of each of your skills |
| `yarn logs <namespace> [--lines=N]` | Tails the logs of the specified skill with an option for how many lines of logs you want to see. |
| `yarn rebuild` | Rebuilds the `Theatre` and all skills by clearing out all `node_modules` and all `build` directories and starting over. |
| `yarn list.running` | Lists all status of all skills, including online/stopped, restart count, cpu usage, and memory usage. |
| `yarn circle.status` | Shows the status of the CircleCI build for each skill. *Requires theatre.CIRCLECLI_TOKEN to be set in your `blueprint.yml` |


> ***Note:** Many commands support `--help` so you can see the options available.
> **Note:** After making any changes to the `blueprint.yml`, you should run `yarn setup.theatre blueprint.yml` again to ensure the changes are propagated.

## Blueprint.yml

Here is an example of a `blueprint.yml` file that you may edit to suit your needs:

```yaml
skills:
  - git@github.com:sprucelabsai/spruce-theme-skill.git

admin:
  - PHONE: "********" # Used to setup the admin person, you should always login using this number when developing

theatre:
  # - LOCK: xxxxx #Provide a url for a yarn.lock file you want to use for this theatre
  # - SHOULD_SERVE_HEARTWOOD: false (default: true) #Should we bundle and serve the Heartwood frontend? Not needed if serving from a CDN
  # - BOOT_STRATEGY: serial | parallel #(default: parallel) How to boot the skills. Only use Serial if you're crushing your CPU.
  # - SERIAL_BOOT_SPACER_SEC: 5 #(default: 5) If using serial boot strategy, how many seconds to wait between skill boots
  # - MERCURY_BOOT_SPACER_SEC: 3 #(default: 3) How many seconds to wait after booting mercury before booting the rest of the skills
  # - BUILD_STRATEGY: serial | parallel #(default: parallel) How to build the skills. Only use Serial if you're crushing your CPU.
  # - BUILD_MAX_MEMORY_MB: 4096 #Optional. Overrides Node's --max_old_space_size during yarn build to avoid OOM issues.
  # - CIRCLECI_TOKEN: xxxxx #Provide a CircleCI token for use with yarn circle.status
  # - POST_BOOT_SCRIPT: | #Run a script after all skills have been booted. This is an example of how to notify a slack channel that the theatre is booted.
    #     curl -X POST -H 'Content-type: application/json' --data '{"text":"Theatre is booted!"}' $SLACK_WEBHOOK_URL
  # - POST_BUNDLE_SCRIPT: | #Run a script after bundling of heartwood is complete. This is example of how to upload the bundled files to an S3 bucket
    #     AWS_ACCESS_KEY_ID=$POLISH_AWS_ACCESS_KEY_ID AWS_REGION=$POLISH_AWS_REGION AWS_SECRET_ACCESS_KEY=$POLISH_AWS_SECRET_ACCESS_KEY \
    #       aws s3 sync \
    #         ./packages/spruce-heartwood-skill/dist/ s3://bucketname.com/  \
    #         --acl public-read \
    #         --cache-control "max-age=1,public" \
    #         --metadata-directive REPLACE \
    #         --delete

env:
  universal: #These are the env vars that are used by all skills, anything here can be overridden in the skill below
    - DB_NAME: "{{namespace}}" #The name of the database dynamically set based on the namespace of the skill
    - DB_CONNECTION_STRING: "mongodb://localhost:27017" #Everything connects to local mongo by default. If you have creds, you set them in the connection string
    - MAXIMUM_LOG_PREFIXES_LENGTH: 1 #The Spruce logger will log the instantiation path of what's being logged. This is helpful when debugging, but usually a length of 1 is all you need
    - HOST: "http://127.0.0.1:8081" #How all skills will connect to Mercury. Make sure the port matche PORT in the mercury section
    # - SHOULD_VIEWS_GENERATE_SOURCE_MAPS: true #Will build views with source maps, which can be helpful for debugging
  mercury:
    - PORT: "8081" #The port mercury will listen on for skills and front-end clients
    - ANONYMOUS_PERSON_PHONE: "555-000-0001" #Mercury needs an anonymous person to use when a person wishes to remain anonymous.
    - DEMO_NUMBERS: "*" #Demo numbers allow you to login with a pin of all zeros. "*" means all numbers are demo numbers. You can also set this to a comma separated list of numbers.
    # - ADMIN_NUMBERS: "" #Any admin numbers that will get the owner role at the platform level. It'll use the admin.PHONE by default, this will let you override that and set your own.
    - SHOULD_ENABLE_LLM: false #By default, the ConversationCoordinate will not use an LLM to respond. This is only useful if you have SHOULD_BOOT_MERCURY_MESSAGE_RECEIVER=true
    #- SHOULD_BOOT_MERCURY_MESSAGE_RECEIVER: true #If you want to run the message receiver to handle incoming messages (sms). You'll need to configure Twilio or Vonage to support this.
    # - SMS_ADAPTER: false # Disables the SMS adapter by default. You can set this to "twilio" or "vonage" if you want to use one of those adapters. Only relevant if SHOULD_BOOT_MERCURY_MESSAGE_RECEIVER=true or SHOULD_BOOT_MERCURY_MESSAGE_SENDER=true
    # - SHOULD_BOOT_MESSAGE_RECEIVER: true #If you want to run the message receiver to handle incoming messages (sms or email). You'll need to configure Twilio, Vonage, SMTP, or Gmail to support this.
    # - SHOULD_BOOT_MESSAGE_SENDER: true #If you want to run the message sender to handle outgoing messages (sms or email). You'll need to configure Twilio, Vonage, SMTP, or Gmail to support this.
    # - MAX_HTTP_BUFFER_SIZE: 10242880 #The maximum size of a message that can be sent to Mercury. Default is 1MB. For large file uploads, see the Concepts -> File Uploads
    # - MESSAGING_GOOGLE_SERVICE_EMAIL: "xxxxx@xxxxxx-email.iam.gserviceaccount.com"
    # - MESSAGING_GOOGLE_PRIVATE_KEY: "xxxx"
    # - MESSAGING_GMAIL_IMPERSONATE_USER: "bot@sprucelabs.ai"
    # - MESSAGING_EMAIL_POLL_INTERVAL_SEC: "5" #The interval in seconds to poll for new email messages. Default is 5 seconds.
  heartwood:
    - WEB_SERVER_PORT: 8080 #The port heartwood will serve on, unless SHOULD_SERVE_HEARTWOOD is set to false
    # - LOCKED_APP_NAMESPACE: "lumena" #locking into a namespace forces your AppController to load everytime, which makes this theatre a single app theatre
    # - PUBLIC_ASSETS_DIR: "/path/to/public/assets" #If you want to serve your own assets, you can set this to a directory that contains your assets and they will be served from http://localhost:{{WEB_SERVER_PORT}}/assets
    # - PUBLIC_URL: "https://myapp.com" #The public URL of your app. This is used to generate links to the heartwood app. If you are using a CDN, this should be the CDN URL.
    # - FOOTER_ICON: "https://myapp.com/favicon.svg" #The icon that will be used in the footer of Skill Views. This should be a URL to an image.
    # - ERROR_PAGE_REDIRECT_DESTINATION: "https://myapp.com" #Where we'll redirect the user if they hit an error page. Falls back to PUBLIC_URL if not set, or https://spruce.bot
    # - ERROR_PAGE_MESSAGE: "Something went wrong. Please try again." #The message that will be displayed under the raw error message on the error page.
    # - IDLE_SESSION_TIMEOUT_MS: 60000 #The amount of time in milliseconds before a session is considered idle and will be auto logged out. No default.
    # - SHOULD_DISABLE_KEYBOARD_SHORTCUTS: true #If you want to disable keyboard shortcuts in the front-end, though some can't be disabled. Defaults to false.
    # - KEYBOARD_SHORTCUT_WHITELIST: "ctrl+shift+f" #If you want to only allow certain keyboard shortcuts, you can set this to a comma separated list of shortcuts.
    
  eightbitstories:
    - OPENAI_API_KEY: "********"


```


Once you get a `blueprint.yml` how you like it, you can run:

```bash
yarn setup.theatre path/to/blueprint.yml
```

Which will leave you with a fully setup `Theatre` with all your skills ready to go!
