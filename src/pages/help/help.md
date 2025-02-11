# Help ⁉️

## Common Issues

<details>
<summary><strong>"Well shoot! You don't have access to emit `example-example-example::v202x_xx_xx`" when booting a `Skill`</strong></summary>

**Reason**  
This is happening because your `Skill` is not properly authenticated with `Mercury`.

**Solution**  
You need to make sure the `SKILL_ID` and `SKILL_API_KEY` in your `Skill's` `.env` matches what is in Mongo. If you have never registered your skill, `cd` to your `Skill` and try [`spruce register`](/concepts/spruce-cli/#working-with-skills).  
If you have already registered your skill, but lost the `.env`, `cd` to your `Skill` and try [`spruce login.skill`](/concepts/spruce-cli/#working-with-skills).  
If you are in a [`Theatre`](/concepts/theatre) and your skill is part of the [`Theatre`](/concepts/theatre), you can rerun `yarn setup.theater blueprint.yml` and it will try both [`spruce register`](/concepts/spruce-cli/#working-with-skills) and [`spruce login.skill`](/concepts/spruce-cli/#working-with-skills) for each skill for you.
</details>

---

<details>
<summary><strong>"MercurySocketIoClient :: Failed to connect to Mercury I couldn't connect to http://127.0.0.1:8081. The code I got back was 503."</strong></summary>

**Reason**  
`Mercury` is not running!

**Solution**  
Make sure your [`Theatre`](/concepts/theatre) is booted. `cd` to your [`Theatre`](/concepts/theatre) and run `yarn boot`. Or, if you set up the [`Development Theatre`](/getting-started/developmen-theatre), just open it.
</details>

---

<details>
<summary><strong>$ node build/index
node:internal/modules/cjs/loader:1146
  throw err;
  ^
Error: Cannot find module '#spruce/skill'</strong></summary>

**Reason**
This can happen if building fails.

**Solution**
Make sure you have run `yarn build` in your `Theatre` or directly in your `Skill` or module and that it completes without errors.
</details>

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>