# Help ⁉️

## Common Issues

| The Issue  | The Reason  | The Solution |
|--------|-----------|----------|
| "Well shoot! You don't have access to emit `example-example-example::v202x_xx_xx`" when booting a `Skill`.       | This is happening because your `Skill` is not properly authenticated with `Mercury`. | You need to make sure the `SKILL_ID` and `SKILL_API_KEY` in your `Skill's` `.env` matches what is in Mongo. If you have never registered your skill, `cd` to your `Skill` and try [`spruce register`](/concepts/spruce-cli/#working-with-skills). If you have already registered your skill, but lost the `.env`, `cd` to your `Skill` and try [`spruce login.skill`](/concepts/spruce-cli/#working-with-skills). If you are in a [`Theatre`](/concepts/theatre) and your skill is part of the [`Theatre`](/concepts/theatre), you can rerun `yarn setup.theater blueprint.yml` and it will try both [`spruce register`](/concepts/spruce-cli/#working-with-skills) and [`spruce login.skill`](/concepts/spruce-cli/#working-with-skills) for each skill for you. |
| "MercurySocketIoClient :: Failed to connect to Mercury I couldn't connect to http://127.0.0.1:8081. The code I got back was 503." | `Mercury` is not running! | Make sure your [`Theatre`](/concepts/theatre) is booted. `cd` to your [`Theatre`](/concepts/theatre) and run `yarn boot`. Or, if you setup the [`Development Theatre`](/getting-started/developmen-theatre), just open it. |
|        |           |          |

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>