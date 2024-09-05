# Theatre

The `Theatre` is a totally self contained runtime that runs all your skills. It also handles operations that span multiple skills, like `boot` or `upgrade`.

The `Sprucebot Theatre` you downloaded as part of the onboarding is an [Electron app](https://www.electronjs.org) that points to the local `Theatre` installed at `~/.spruce/theatre-monorepo`.

When you open the `Sprucebot Theatre` app, it actuall runs the following code:

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

If you are working directly with the `Theatre` in your favorite terminal app, you have the following commands available:

| Command | Description |
| --- | --- |
| `yarn setup.theatre <path/to/blueprint.yml>` | Sets up the Theatre with the given `blueprint.yml`. It'll `git clone` all the skills defined in the `blueprint.yml` and then copy in any settings based on `namespace` |
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



## Blueprint.yml

Here is an example of a `blueprint.yml` file that you may edit to suit your needs:

```yaml
skills:
  - git@github.com:sprucelabsai-community/spruce-adventure-skill.git
  - git@github.com:sprucelabsai-community/spruce-eightbitstories-skill.git
  - git@github.com:sprucelabsai/spruce-appointments-skill.git
  - git@github.com:sprucelabsai/spruce-calendar-skill.git
  - git@github.com:sprucelabsai/spruce-demo-skill.git
  - git@github.com:sprucelabsai/spruce-developer-skill.git
  - git@github.com:sprucelabsai/spruce-esm-skill.git
  - git@github.com:sprucelabsai/spruce-feed-skill.git
  - git@github.com:sprucelabsai/spruce-feedback-skill.git
  - git@github.com:sprucelabsai/spruce-files-skill.git
  - git@github.com:sprucelabsai/spruce-forms-skill.git
  - git@github.com:sprucelabsai/spruce-groups-skill.git
  - git@github.com:sprucelabsai/spruce-heartwood-skill.git
  - git@github.com:sprucelabsai/spruce-help-skill.git
  - git@github.com:sprucelabsai/spruce-images-skill.git
  - git@github.com:sprucelabsai/spruce-invites-skill.git
  - git@github.com:sprucelabsai/spruce-lbb-skill.git
  - git@github.com:sprucelabsai/spruce-locations-skill.git
  - git@github.com:sprucelabsai/spruce-madrix-skill.git
  - git@github.com:sprucelabsai/spruce-mercury-api.git
  - git@github.com:sprucelabsai/spruce-organization-skill.git
  - git@github.com:sprucelabsai/spruce-people-skill.git
  - git@github.com:sprucelabsai/spruce-permissions-skill.git
  - git@github.com:sprucelabsai/spruce-profile-skill.git
  - git@github.com:sprucelabsai/spruce-reminders-skill.git
  - git@github.com:sprucelabsai/spruce-roles-skill.git
  - git@github.com:sprucelabsai/spruce-shifts-skill.git
  - git@github.com:sprucelabsai/spruce-skills-skill.git
  - git@github.com:sprucelabsai/spruce-theatre-skill.git
  - git@github.com:sprucelabsai/spruce-theme-skill.git
  - git@github.com:sprucelabsai/spruce-waivers-skill.git
  - git@github.com:sprucelabsai/spruce-wifi-skill.git
  - git@github.com:sprucelabsai/spruce-xa-skill.git
  - git@github.com:sprucelabsai/spruce-crud-views-skill.git

admin:
  - phone: "********"

env:
  universal:
    - DB_NAME: "{{namespace}}"
    - DB_CONNECTION_STRING: "mongodb://localhost:27017"
    - MAXIMUM_LOG_PREFIXES_LENGTH: 1
    - HOST: "http://127.0.0.1:8081"
  mercury:
    - PORT: "8081"
    - ANONYMOUS_PERSON_PHONE: "555-000-0001"
    - DEMO_NUMBERS: "*"
    - ADMIN_NUMBERS: ""
    - SHOULD_ENABLE_LLM: "false"
  heartwood:
    - ANIMATION_DURATION: "500"
    - WEB_SERVER_PORT: 8080
  madrix:
    - MADRIX_ENDPOINT: "http://10.106.6.181:8082"
  eightbitstories:
    - OPENAI_API_KEY: "********"


```


Once you get a `blueprint.yml` how you like it, you can run:

```bash
yarn setup.theatre path/to/blueprint.yml
```

Which will leave you with a fully setup `Theatre` with all your skills ready to go!