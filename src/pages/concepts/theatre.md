# Theatre

The `Theatre` is a totally self-contained environment that runs all your skills. It also handles operations that span multiple skills, like `boot` or `upgrade`.

In a technical sense, it's a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains all your skills and uses [`pm2`](https://pm2.keymetrics.io) to run each skill. It relies on a bunch of bash scripts to do a lot of the heavy lifting.

The `Sprucebot Theatre` you downloaded as part of the onboarding is an [`Electron`](https://www.electronjs.org) app that points to the local `Theatre` installed at `~/.spruce/theatre-monorepo`.

When you open the `Sprucebot Theatre` app, it actually executes the following commands behind the scenes:

```bash
cd ~/.spruce/theatre-monorepo 
yarn boot
```

And when you shut down the app, it runs:

```bash
cd ~/.spruce/theatre-monorepo
yarn shutdown
```

## Theatre Commands

> **Note:** If you are working with the `Theatre` directly, you use `yarn` to execute scripts. The `SpruceCLI` is used when working with individual `Skills`.

If you are working directly with the `Theatre` in your favorite terminal app, you have the following commands available:

### Setup & Configuration

| Command | Description |
| --- | --- |
| `yarn setup.theatre <path/to/blueprint.yml>` | Sets up the `Theatre` with the given `blueprint.yml`. It'll `git clone` all the skills defined in the `blueprint.yml` and then copy in any settings based on `namespace`. |
| `yarn import.blueprint <path> [PARAM=value...]` | Imports a blueprint file, replacing any `$PARAM` placeholders with provided values. Useful for CI/CD pipelines. |
| `yarn fill.out.blueprint` | Interactive prompt that walks you through filling out any `<<placeholder>>` values in your `blueprint.yml`. |
| `yarn register.skills [--shouldForceRegister=true]` | Registers or logs in all skills with Mercury. Use `--shouldForceRegister=true` to re-register already registered skills. |

### Running & Monitoring

| Command | Description |
| --- | --- |
| `yarn boot [namespace]` | If no `namespace` is supplied, it boots the Theatre by running `yarn boot` on all skills. If a `namespace` is supplied, it runs just on that `Skill`. |
| `yarn reboot [namespace]` | Runs `yarn shutdown`, resets boot counts, and then runs `yarn boot` on all skills. If a `namespace` is supplied, it will run those commands on just that `Skill`. |
| `yarn shutdown [namespace]` | Shuts down all skills unless a `namespace` is supplied. In that case, it'll only kill the `Skill` you specify. |
| `yarn monitor` | Starts the `pm2` monitor. A good way of seeing the live status of each of your skills. |
| `yarn list.running` | Lists the status of all skills, including online/stopped, restart count, CPU usage, and memory usage. |
| `yarn logs [namespace] [--lines=N]` | Tails logs for all skills or a specific skill. Defaults to 15 lines. |

### Building & Bundling

| Command | Description |
| --- | --- |
| `yarn build [namespace]` | Builds all skills or a specific skill. Uses `BUILD_STRATEGY` from blueprint (parallel/serial). Also bundles Heartwood. |
| `yarn build.prod` | Builds skills for production environment. |
| `yarn rebuild` | Rebuilds the `Theatre` and all skills by clearing out all `node_modules` and all `build` directories and starting over. |
| `yarn clean` | Cleans all packages using lerna (removes build artifacts). |
| `yarn bundle.heartwood` | Bundles Heartwood for CDN deployment. Runs `POST_BUNDLE_SCRIPT` if configured. |
| `yarn serve.heartwood` | Starts a Caddy server to serve the bundled Heartwood frontend locally. |
| `yarn stop.serving.heartwood` | Stops the Heartwood server. |
| `yarn bundle.serve.heartwood` | Bundles and then serves Heartwood in one command. |

### Updating & Upgrading

| Command | Description |
| --- | --- |
| `yarn update [namespace]` | Runs `git pull` on each skill, then runs `yarn` at the root level to ensure the latest dependencies are installed. If a `namespace` is supplied, it'll only `git pull` for that `Skill`. |
| `yarn upgrade [namespace]` | Runs `git pull` and then `spruce upgrade` on each skill. If a `namespace` is supplied, it'll only run on that skill. |
| `yarn sync.events` | Runs `spruce sync.events` on all skills to sync event contracts. |

### Git & Version Control

| Command | Description |
| --- | --- |
| `yarn checkout <branch> [options]` | Checks out a branch for all skills. Options: `--hard` (clobber local changes), `--shouldUpdateDependencies=false`, `--shouldBuild=false`. |
| `yarn commit.push.skills <commit message>` | Runs `git commit -m <message>` and then `git push` on every skill. |
| `yarn pull.latest.from <branch>` | Pulls the latest code from the specified branch for all skills that have that branch. |
| `yarn push.to <branch>` | Creates/resets a branch and force pushes all skills to it. |
| `yarn push.latest.to <branch>` | Creates/resets a branch with the latest code from each skill's default branch and pushes. |
| `yarn circle.status` | Shows the status of the CircleCI build for each skill. Requires `theatre.CIRCLECI_TOKEN` to be set in your `blueprint.yml`. |

### Database

| Command | Description |
| --- | --- |
| `yarn dump.core.database --dumpPath=<path>` | Dumps all MongoDB databases to the specified path using `mongodump`. |
| `yarn reset.core.database [options]` | Drops all MongoDB databases and optionally restores from a dump. Options: `--dumpDir=<path>`, `--mongoConnectionString=<uri>`, `--shouldUsePin=false`. |

### Export & Import

| Command | Description |
| --- | --- |
| `yarn export.theatre.zip [--backup] [--release]` | Exports the Theatre to a zip file in `./snapshots/`. Excludes `.env` files, logs, and `blueprint.yml`. |
| `yarn import.theatre.zip <path>` | Imports a Theatre from a zip file, replacing `packages/` and `node_modules/`. |
| `yarn generate.hash` | Generates an MD5 checksum of all build artifacts and `yarn.lock`. Useful for verifying builds. |
| `yarn verify.hash <hash>` | Verifies the current Theatre build matches the expected hash. |

### Utilities

| Command | Description |
| --- | --- |
| `yarn repair` | If you ever run into any `pm2` issues where it can't find yarn, this will fix that issue. **Make sure you `yarn shutdown` before running this!** |
| `yarn reset` | Full reset: removes `node_modules/`, `package-lock.json`, `.pm2/`, and all packages. You'll need to run `setup.theatre` again after this. |
| `yarn code <pattern>` | Opens all packages matching the pattern in VS Code. Example: `yarn code mercury` opens mercury-related packages. |
| `yarn fix.lint` | Runs the linter fix across all packages. |
| `yarn prepare.for.production` | Prunes dev dependencies and removes `src/` directories to prepare for production deployment. |

> **Note:** Many commands support `--help` so you can see the options available.
> **Note:** After making any changes to the `blueprint.yml`, you should run `yarn setup.theatre blueprint.yml` again to ensure the changes are propagated.

## Blueprint.yml

Here is an example of a `blueprint.yml` file that you may edit to suit your needs:

```yaml
skills:
  - git@github.com:sprucelabsai/spruce-theme-skill.git
  - git@github.com:sprucelabsai/spruce-calendar-skill.git -> calendar-skill #Clone into a custom directory name
  # For private repos, place a deploy key at deploy_keys/<repo-name> (e.g., deploy_keys/spruce-theme-skill)

admin:
  - PHONE: "********" # Used to setup the admin person, you should always login using this number when developing

theatre:
  - LOCK: xxxxx #Provide a url for a yarn.lock file you want to use for this theatre
  - SHOULD_SERVE_HEARTWOOD: false (default: true) #Should we bundle and serve the Heartwood frontend? Not needed if serving from a CDN
  - SHOULD_VALIDATE_SKILL_DEPENDENCIES: true #(default: true) Validate skill-to-skill dependencies during setup. Set false to skip validation.
  - BOOT_STRATEGY: serial | parallel #(default: parallel) How to boot the skills. Only use Serial if you're crushing your CPU.
  - SERIAL_BOOT_SPACER_SEC: 5 #(default: 5) If using serial boot strategy, how many seconds to wait between skill boots
  - MERCURY_BOOT_SPACER_SEC: 3 #(default: 3) How many seconds to wait after booting mercury before booting the rest of the skills
  - BUILD_STRATEGY: serial | parallel #(default: parallel) How to build the skills. Only use Serial if you're crushing your CPU.
  - BUILD_MAX_MEMORY_MB: 4096 #Optional. Overrides Node's --max_old_space_size during yarn build to avoid OOM issues.
  - CIRCLECI_TOKEN: xxxxx #Provide a CircleCI token for use with yarn circle.status
  - POST_BUILD_SCRIPT: | #Run a script after all skills have been built. Examples:
    #     # Notify Slack that the build is complete
    #     curl -X POST -H 'Content-type: application/json' --data '{"text":"Build complete!"}' $SLACK_WEBHOOK_URL
    #
    #     # Run custom validation or tests
    #     yarn test --coverage
    #
    #     # Generate build artifacts report
    #     echo "Build completed at $(date)" >> build-history.log
  - POST_BOOT_SCRIPT: | #Run a script after all skills have been booted. This is an example of how to notify a slack channel that the theatre is booted.
    #     curl -X POST -H 'Content-type: application/json' --data '{"text":"Theatre is booted!"}' $SLACK_WEBHOOK_URL
  - POST_BUNDLE_SCRIPT: | #Run a script after bundling of heartwood is complete. This is example of how to upload the bundled files to an S3 bucket
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
    - HOST: "http://127.0.0.1:8081" #How all skills will connect to Mercury. Make sure the port matches `PORT` in the mercury section
    - IS_PHONE_LOGIN_ENABLED: "true" #Enables phone login for all skills that support it. Default is true
    - IS_EMAIL_LOGIN_ENABLED: "true" #Enables email login for all skills that support it. Default is false
    - SHOULD_VIEWS_GENERATE_SOURCE_MAPS: true #Will build views with source maps, which can be helpful for debugging
  mercury:
    # Core server
    - PORT: "8081" #The port mercury will listen on for skills and front-end clients
    - SSL_CRT: "/path/to/cert.pem" #Optional. Requires SSL_KEY if set.
    - SSL_KEY: "/path/to/key.pem" #Optional. Requires SSL_CRT if set.
    - MAX_HTTP_BUFFER_SIZE: 10242880 #The maximum size of a message that can be sent to Mercury. Default is 1MB. For large file uploads, see the Concepts -> File Uploads
    - DEMO_NUMBERS: "*" #Demo numbers allow you to login with a pin of all zeros. "*" means all numbers are demo numbers. You can also set this to a comma separated list of numbers.
    - ADMIN_NUMBERS: "" #Any admin numbers that will get the owner role at the platform level. It'll use the admin.PHONE by default, this will let you override that and set your own.
    - ANONYMOUS_PERSON_PHONE: "555-000-0001" #Mercury needs an anonymous person to use when a person wishes to remain anonymous.
    - SHOULD_SEND_MESSAGES_TO_DEMO_NUMBERS: false #Allows outgoing messages to demo numbers.
    - SHOULD_SEND_JOIN_ORG_OR_LOC_MESSAGES: true #Set false to suppress join org/location messages.
    - UPDATE_PROFILE_URL: "https://myapp.com/profile" #Optional link used in profile update workflows.
    - SHOULD_RENDER_STACK_TRACES_ON_ERRORS: false #Set true to include stack traces in error responses.
    - SLACK_ERROR_LOG_WEBHOOK_URL: "https://hooks.slack.com/services/xxx/yyy/zzz" #Optional error logging hook.

    # LLM
    - SHOULD_ENABLE_LLM: false #By default, the ConversationCoordinate will not use an LLM to respond. This is only useful if you have SHOULD_BOOT_MESSAGE_RECEIVER=true
    - OPEN_AI_API_KEY: "xxxx" #Your OpenAI API key, required if using LLM features
    - OPEN_AI_MODEL: "gpt-5" #The OpenAI model to use for LLM features. Default is gpt-4

    # Messaging boot controls
    - SMS_ADAPTER: false #Disables the SMS adapter by default. Values: false, "twilio", "vonage", "simpletexting".
    - DEFAULT_SENDER_DELIVERY_MECHANISM: "sms" #Default delivery mechanism ("sms", "email", "push").
    - SHOULD_BOOT_MESSAGE_RECEIVER: true #If you want to run the message receiver to handle incoming messages (sms or email). You'll need to configure Twilio, Vonage, SMTP, or Gmail to support this.
    - SHOULD_BOOT_MESSAGE_SENDER: true #If you want to run the message sender to handle outgoing messages (sms, email, or push notifications). You'll need to configure Twilio, Vonage, SMTP, Gmail, or APNs to support this.
    - SHOULD_BOOT_RECEIVERS: true #Used when booting message.receiver; set false to skip webhook servers.
    - SHOULD_RETURN_IMMEDIATELY: false #Used for tests; returns after booting receivers.
    - SHOULD_BOOTSTRAP_MESSAGE_SENDER: true #Set false to skip sender bootstrap.
    - SHOULD_POLL_FOR_NEW_MESSAGES: true #Set false to disable polling loop for outgoing messages.
    - SHOULD_HANDLE_CORE_EVENTS: true #Set false to queue core events instead of handling immediately.

    # Email (Gmail)
    - MESSAGING_GOOGLE_SERVICE_EMAIL: "xxxxx@xxxxxx-email.iam.gserviceaccount.com"
    - MESSAGING_GOOGLE_PRIVATE_KEY: "xxxx"
    - MESSAGING_GMAIL_IMPERSONATE_USER: "bot@sprucelabs.ai"
    - MESSAGING_EMAIL_POLL_INTERVAL_SEC: "5" #The interval in seconds to poll for new email messages. Default is 5 seconds.

    # Email (SMTP)
    - SMTP_HOST: "smtp.example.com"
    - SMTP_USERNAME: "smtp-user"
    - SMTP_PASSWORD: "smtp-password"
    - SMTP_FROM_EMAIL: "no-reply@myapp.com"

    # SMS (Twilio)
    - TWILIO_SID: "xxxx"
    - TWILIO_TOKEN: "xxxx"
    - TWILIO_SERVICE_SID: "xxxx"
    - TWILIO_FROM_PHONE: "+15551234567"
    - TWILIO_WEBHOOK_PORT: "8080"
    - TWILIO_WEBHOOK_PATH: "/twilio"

    # SMS (Vonage)
    - VONAGE_API_KEY: "xxxx"
    - VONAGE_API_SECRET: "xxxx"
    - VONAGE_FROM_PHONE: "xxxx"
    - VONAGE_WEBHOOK_PORT: "8080"
    - VONAGE_WEBHOOK_PATH: "/vonage"

    # SMS (SimpleTexting)
    - SIMPLETEXTING_API_KEY: "xxxx"
    - SIMPLETEXTING_FROM_PHONE: "xxxx"
    - SIMPLETEXTING_WEBHOOK_DOMAIN: "https://myapp.com"
    - SIMPLETEXTING_WEBHOOK_PATH: "/simpletexting"
    - SIMPLETEXTING_WEBHOOK_PORT: "8080"

    # Push (APNs + Firebase)
    - APN_TOKEN: "-----BEGIN PRIVATE KEY-----"
    - APN_KEY_ID: "xxxx"
    - APN_TEAM_ID: "xxxx"
    - APN_TOPIC: "ai.sprucelabs.sprucebot"
    - FIREBASE_PROJECT_ID: "xxxx"
    - FIREBASE_CLIENT_EMAIL: "xxxx"
    - FIREBASE_PRIVATE_KEY: "xxxx"

    # Internal flags (usually set by scripts/CLI)
    - ACTION: "server" #Set to "message.sender" or "message.receiver" when booting those modes.
    - IS_CLI: false #Set by the CLI to format errors for terminal output.
  heartwood:
    # Core app
    - HOST: "http://127.0.0.1:8081" #Mercury host Heartwood connects to for events.
    - WEB_SERVER_PORT: 8080 #The port heartwood will serve on, unless SHOULD_SERVE_HEARTWOOD is set to false
    - PUBLIC_URL: "https://myapp.com" #The public URL of your app. This is used to generate links to the heartwood app. If you are using a CDN, this should be the CDN URL.
    - ROOT_SVC: "my-skill.root" #Optional default Skill View controller id to route to on load.
    - AGENT_NAME: "Sprucebot" #Used for titles and user-facing copy in the UI.
    - LOCKED_APP_NAMESPACE: "lumena" #locking into a namespace forces your AppController to load every time, which makes this theatre a single app theatre
    - LOCKED_LOCATION_ID: "loc_123" #Optional location id to lock the scope into.

    # Login and auth
    - IS_PHONE_LOGIN_ENABLED: "true" #Enables phone login for Heartwood. Default is true.
    - IS_EMAIL_LOGIN_ENABLED: "true" #Enables email login for Heartwood. Default is false.
    - SMS_DISCLAIMER: "By texting, you agree..." #Optional disclaimer shown on SMS login.
    - SHOULD_REQUIRE_SMS_CHECKBOX: false #Require an opt-in checkbox for SMS login.

    # Error page
    - ERROR_PAGE_TITLE: "Uh oh!" #Optional override for the error card title.
    - ERROR_PAGE_MESSAGE: "Something went wrong. Please try again." #The message that will be displayed under the raw error message on the error page.
    - ERROR_PAGE_REDIRECT_DESTINATION: "https://myapp.com" #Where we'll redirect the user if they hit an error page. Falls back to PUBLIC_URL if not set, or https://spruce.bot
    - ERROR_PAGE_SHOULD_RENDER_TALKING_SPRUCEBOT: true #Set false to hide the TalkingSprucebot on the error page.

    # Uploads and assets
    - MAX_UPLOAD_SIZE_KB: "10240" #Max upload size in kilobytes.
    - PUBLIC_ASSETS_DIR: "/path/to/public/assets" #If you want to serve your own assets, you can set this to a directory that contains your assets and they will be served from http://localhost:{{WEB_SERVER_PORT}}/assets
    - FOOTER_ICON: "https://myapp.com/favicon.svg" #The icon that will be used in the footer of Skill Views. This should be a URL to an image.
    - S3_BUCKET: "my-bucket" #Optional CDN bucket for publishing skill view assets.
    - S3_REGION: "us-east-1"
    - S3_KEY_ID: "xxxx"
    - S3_SECRET_ACCESS_KEY: "xxxx"

    # Session and keyboard
    - IDLE_SESSION_TIMEOUT_MS: 60000 #The amount of time in milliseconds before a session is considered idle and will be auto logged out. No default.
    - SHOULD_DISABLE_KEYBOARD_SHORTCUTS: true #If you want to disable keyboard shortcuts in the front-end, though some can't be disabled. Defaults to false.
    - KEYBOARD_SHORTCUT_WHITELIST: "ctrl+shift+f" #If you want to only allow certain keyboard shortcuts, you can set this to a comma separated list of shortcuts.

    # Sandbox and registration
    - SANDBOX_DEMO_NUMBER: "555-000-0001" #Demo number used to re-register Heartwood in sandbox environments.
    - SKILL_NAME: "Heartwood" #Used when registering the skill in sandbox mode.
    - SKILL_SLUG: "heartwood" #Skill namespace used for sandbox registration.
    - SKILL_ID: "skill_123" #Set during registration.
    - SKILL_API_KEY: "xxxx" #Set during registration.

    # Internal flags
    - SLACK_ERROR_LOG_WEBHOOK_URL: "https://hooks.slack.com/services/xxx/yyy/zzz" #Optional error logging hook.
    - IS_CLI: false #Set by the CLI to format errors for terminal output.
  eightbitstories:
    - OPENAI_API_KEY: "********"


```


Once you get a `blueprint.yml` how you like it, you can run:

```bash
yarn setup.theatre path/to/blueprint.yml
```

Which will leave you with a fully setup `Theatre` with all your skills ready to go!
