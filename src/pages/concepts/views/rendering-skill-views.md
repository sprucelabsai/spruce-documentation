## Rendering Skill Views

Skill Views are the equivalent of pages in a "standard" web application. They are accessible via the url in 2 ways.

1. Subdomain: `https://{skillNamespace}.spruce.bot` (will render your `RootSkillViewController`)
2. Hash: `https://spruce.bot/#/views/{skillNamespace}.{viewId}`

### Root Skill View

Let's get started on rendering a `RootSkillView`.

<details>
<summary><strong>Test 1</strong>: Load Your (Root) Skill View</summary>

We'll start with the `RootSkillViewController`. All you have to do to start is try and load your Skill View and the test will fail.

```ts
import {
    AbstractSpruceFixtureTest
} from '@sprucelabs/spruce-test-fixtures'

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async canLoadRootSkillView() {
        this.views.Controller('eightbitstories.root', {}),
    }
}
```

</details>

<details>
<summary><strong>Production 1</strong>: Create Your Root Skill View</summary>

This part is pretty easy! Run this following command and follow the instructions!

```shell
spruce create.view
```

</details>

### Rendering A Different Skill View

Coming soon...

### Redirecting Between Skill Views

Coming soon...