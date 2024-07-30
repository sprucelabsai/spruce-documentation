# Tests

Coming soon...

## Polish

The `Polish` system is built to facilitate front-end automated testing. It is a simple, yet powerful, system that allows you to write "Polish Scripts" quickly and easily.

### Creating your first Polish Script

Assuming you are already in a `Skill` or module, you can create a new Polish Script by running the following command:

```bash 
spruce setup.polish
```

### Examples

<details>
<summary>Logging In</summary>

```ts
import { PolishStep } from '@sprucelabs/heartwood-polish'

const script: PolishStep[] = [
    {
        click: {
            target: [['Field', 'phone']],
            text: '555-000-0018',
        },
    },
    {
        typeText: {
            target: [['Field', 'pin']],
            value: '0000'
        }
    }
]

export default script
```
</details>

<details>
<summary>Clicking Buttons</summary>

When you are clicking buttons, you can click by the following:

1. `primary`
2. `descructive`
3. Index (zero based)

```ts
import { PolishStep } from '@sprucelabs/heartwood-polish'

const script: PolishStep[] = [
    {
        click: {
            target: [['button', 'primary']],
        },
    },
    {
        click: {
            target: [['button', 'destructive']],
        },
    },
    {
        click: {
            target: [['button', 0]],
        },
    },
    {
        click: {
            target: [['button', 1]],
        },
    },
]

export default script
```
</details>

<details>
<summary>Clicking Buttons in Dialogs</summary>

```ts
import { PolishStep } from '@sprucelabs/heartwood-polish'

const script: PolishStep[] = [
    {
        click: {
            target: ['Dialog', ['Button','primary']]
        }
    }
]

export default script
```

</details>

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>