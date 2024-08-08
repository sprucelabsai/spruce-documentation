## Rendering Forms

`Forms`, like all other components, are render in the `CardSection` of your `Card`. You will rely heavily on the `formAssert` utility for testing. Before getting too deep, it'll be helpful to understand some [`Schema`](../schemas) basics.

### Rendering a Form

<details>
<summary><strong>Test 1</strong>: Assert form is rendered in your card</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Render an empty form in your card</summary>

This is a big first step, but pay attention to a few things:

1. You construct your form using the `buildForm` utility for better typing.
2. The `FormViewController` interface is a generic, so it'll take the type of your `Schema` to enable advanced typing.
3. You render your `Form` into the `form` property of your `CardSection`.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    private formVc: FormViewController<MyFormSchema>

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.formVc = this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [],
            })
        )
        this.cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}

const myFormSchema = buildSchema({
    id: 'myForm',
    fields: {},
})

type MyFormSchema = typeof myFormSchema

```

> **Note**: You will rely on `buildForm` to get better typing while constructing your form.

</details>

<details>
<summary><strong>Test 2a</strong>: Asserting desired fields are rendered</summary>

Our goal is to check that a desired field is being rendered, but first we'll get blocked by needing to expose our `formVc`. We'll do that using a test double.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected static async rendersExpectedFields() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.formRendersFields(vc.getForm(), ['destination'])
    }
}

```

> **Note**: You should see an error that `getForm()` doesn't exist. We'll create a `Spy` to fix that.

</details>

<details>
<summary><strong>Test 2b</strong>: Create a <em>Spy</em> for <em>MyCardViewController</em></summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected static async rendersExpectedFields() {
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        const vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
        formAssert.formRendersFields(vc.getForm(), ['field1','field2'])
    }
}

class SpyMyCard extends MyCardViewController {
    public getForm() {
        return this.formVc
    }
}

```

> **Note**: If you are following along, you will get a type error because `formVc` is 'private'. You can make it 'protected' in `MyCardViewController` to get around this.

> **Note**: Now you should get an error that your form is not rendering the expected fields. It's time to implement the fields in your form.

</details>

<details>
<summary><strong>Production 2a</strong>: Render the expected fields in your form</summary>

Getting your fields to render is a 2-step process:

1. Add the fields to your `Schema`.
2. Add the fields as a `Section` to your `Form`.

This separation allows you to have "source of truth" in your `Schema` and then render the fields you actually want in your form.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    private formVc: FormViewController<MyFormSchema>

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.formVc = this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: ['field1', 'field2'],
                    }
                ],
            })
        )
        this.cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}

const myFormSchema = buildSchema({
    id: 'myForm',
    fields: {
        field1: {
            type: 'text',
            label: 'Field 1',
        },
        field2: {
            type: 'text',
            label: 'Field 2',
        },
    },
})

type MyFormSchema = typeof myFormSchema

```

</details>

<details>
<summary><strong>Production 2b</strong>: Cleanup your <em>ViewController</em></summary>

Let's take a sec to cleanup our `ViewController's` constructor to make it more readable.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    private formVc: FormViewController<MyFormSchema>

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.formVc = FormVc()
        this.cardVc = CardVc()
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: ['field1', 'field2'],
                    }
                ],
            })
        )
    }

    private CardVc() {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}

const myFormSchema = buildSchema({
    id: 'myForm',
    fields: {
        field1: {
            type: 'text',
            label: 'Field 1',
        },
        field2: {
            type: 'text',
            label: 'Field 2',
        },
    },
})

type MyFormSchema = typeof myFormSchema

```

</details>

<details>
<summary><strong>Test 3</strong>: Dry your tests</summary>

Once again, we're going to utilize our Test Class's static state to cut down on duplication.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard

    protected static async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected static async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected static async rendersExpectedFields() {
        formAssert.formRendersFields(this.vc.getForm(), ['field1','field2'])
    }
}

class SpyMyCard extends MyCardViewController {
    public getForm() {
        return this.formVc
    }
}

```
</details>