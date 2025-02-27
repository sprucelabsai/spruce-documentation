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
    protected async rendersACard() {
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
    protected formVc: FormViewController<MyFormSchema>

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
    protected async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected async rendersExpectedFields() {
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
    protected async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected async rendersExpectedFields() {
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

> **Note**: If you are following along, you will get a type error because `formVc` is `private`. You can make it `protected` in `MyCardViewController` to get around this.

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
    protected formVc: FormViewController<MyFormSchema>

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
    protected formVc: FormViewController<MyFormSchema>

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

    protected async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
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

### Rendering an Autocomplete Input

The `AutocompleteInputViewController` is a text input that provides suggestions as you type. Well, you gotta supply the suggestions, but it's pretty easy.

It's important to note that the 'AutocompleteInputViewController', like all `InputViewControllers`, has a `renderedValue` and a `value`. The `renderedValue` is what is what is displayed in the input, while the `value` is what is submitted in the form.

With an `AutocompleteInput`, we'll pay attention to changes in the `renderedValue` as the user types, and then update the `value` when the user selects a suggestion.

This series of tests is going to pickup where the tests above left off.

<details>
<summary><strong>Test 1</strong>: Assert that field renders using <em>AutocompleteInput</em></summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert, AutocompleteInputViewController } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard

    protected async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
        formAssert.formRendersFields(this.formVc, ['field1','field2'])
    }

    @test()
    protected async rendersAutocompleteInput() {
        formAssert.fieldRendersUsingInstanceOf(
            this.formVc,
            'field1',
            AutocompleteInputViewController
        )
    }

    protected get formVc() {
        return this.vc.getForm()
    }
}

class SpyMyCard extends MyCardViewController {
    public getForm() {
        return this.formVc
    }
}

```

> **Note**: In addition to the `formAssert.fieldRendersUsingInstanceOf` assertion, we've added a `formVc` getter to cut down on duplication.

</details>

<details>
<summary><strong>Production 1</strong>: Render an <em>AutocompleteInput</em> in your form</summary>

This is another 2 parter:

1. Construct an `AutocompleteInputViewController` and track it on your `ViewController`.
2. Update your `FormSection` to be the "expanded" type, which is an object with `field` and `vc` properties (among others).

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
    AutocompleteInputViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<MyFormSchema>
    private autocompleteInputVc: AutocompleteInputViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.autocompleteInputVc = this.AutocompleteVc()
        this.formVc = FormVc()
        this.cardVc = CardVc()
    }

    private AutocompleteVc(): AutocompleteInputViewController {
        return this.Controller('autocomplete-input', {})
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: [
                            {
                                name: 'field1'
                                vc: this.autocompleteInputVc,
                            }, 
                            'field2'
                        ],
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
<summary><strong>Test 2</strong>: Assert the field's <em>renderAs</em></summary>

We'll use `formAssert.fieldRendersAs` to assert that the field is rendering as an `autocomplete`.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert, AutocompleteInputViewController } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard

    protected async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
        formAssert.formRendersFields(this.formVc, ['field1','field2'])
    }

    @test()
    protected async rendersAutocompleteInput() {
        formAssert.fieldRendersUsingInstanceOf(
            this.formVc,
            'field1',
            AutocompleteInputViewController
        )
    }

    @test()
    protected async rendersAsAutocomplete() {
        formAssert.fieldRendersAs(
            this.formVc,
            'field1',
            'autocomplete'
        )
    }

    protected get formVc() {
        return this.vc.getForm()
    }
}

class SpyMyCard extends MyCardViewController {
    public getForm() {
        return this.formVc
    }
}

```

</details>


<details>
<summary><strong>Production 2</strong>: Set field to render as <em>autocomplete</em></summary>

A quick, easy add. Simple set the `renderAs` property to `autocomplete` in field.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
    AutocompleteInputViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<MyFormSchema>
    protected autocompleteInputVc: AutocompleteInputViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.autocompleteInputVc = this.AutocompleteVc()
        this.formVc = FormVc()
        this.cardVc = CardVc()
    }

    private AutocompleteVc(): AutocompleteInputViewController {
        return this.Controller('autocomplete-input', {
            onChangeRenderedValue: () =>
                this.autocompleteInputVc.showSuggestions([]),
        })
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: [
                            {
                                name: 'field1'
                                vc: this.autocompleteInputVc,
                                renderAs: 'autocomplete',
                            }, 
                            'field2'
                        ],
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
<summary><strong>Test 3</strong>: Assert that the <em>AutocompleteInput</em> shows suggestions</summary>

The next steps are:

1. Use the `autocompleteAssert` utility to assert that the `AutocompleteInputViewController` shows suggestions when the `renderedValue` is changed.
2. Update your `Spy` to expose the `AutocompleteInputViewController` with `getAutocompleteVc()`.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import {
    autocompleteAssert,
    AutocompleteInputViewController,
    formAssert,
} from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard

    protected async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
        formAssert.formRendersFields(this.formVc, ['field1','field2'])
    }

    @test()
    protected async rendersAutocompleteInput() {
        formAssert.fieldRendersUsingInstanceOf(
            this.formVc,
            'field1',
            AutocompleteInputViewController
        )
    }

    @test()
    protected async rendersAsAutocomplete() {
        formAssert.fieldRendersAs(
            this.formVc,
            'field1',
            'autocomplete'
        )
    }

    @test()
    protected async changingDestinationsRendersSuggestions() {
        await autocompleteAssert.actionShowsSuggestions(
            this.vc.getAutocompleteVc(),
            () => this.vc.getAutocompleteVc().setRenderedValue('test')
        )
    }

    protected get formVc() {
        return this.vc.getForm()
    }
}

class SpyMyCard extends MyCardViewController {
    public getAutocompleteVc() {
        return this.autocompleteInputVc
    }

    public getForm() {
        return this.formVc
    }
}

```

> **Note**: You're going to get an type error because `autocompleteInputVc` is 'private'. You can make it 'protected' in `MyCardViewController` to get around this.

</details>

<details>
<summary><strong>Production 3</strong>: Render suggestions in your <em>AutocompleteInput</em></summary>

Notice how we added a `onChangeRenderedValue` callback to the `AutocompleteInputViewController` to show suggestions when the `renderedValue` changes and just pass an empty array for now.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
    AutocompleteInputViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<MyFormSchema>
    protected autocompleteInputVc: AutocompleteInputViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.autocompleteInputVc = this.AutocompleteVc()
        this.formVc = FormVc()
        this.cardVc = CardVc()
    }

    private AutocompleteVc(): AutocompleteInputViewController {
        return this.Controller('autocomplete-input', {
            onChangeRenderedValue: () =>
                this.autocompleteInputVc.showSuggestions([]),
        })
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: [
                            {
                                name: 'field1'
                                vc: this.autocompleteInputVc,
                            }, 
                            'field2'
                        ],
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
<summary><strong>Test 4</strong>: Assert changing the <em>renderedValue</em> emits an event.</summary>

```ts
import { AbstractSpruceFixtureTest, eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import {
    autocompleteAssert,
    AutocompleteInputViewController,
    formAssert,
} from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard

    protected async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
        formAssert.formRendersFields(this.formVc, ['field1','field2'])
    }

    @test()
    protected async rendersAutocompleteInput() {
        formAssert.fieldRendersUsingInstanceOf(
            this.formVc,
            'field1',
            AutocompleteInputViewController
        )
    }

    @test()
    protected async changingDestinationsRendersSuggestions() {
        await autocompleteAssert.actionShowsSuggestions(
            this.autocompleteInputVc,
            () => this.typeIntoField1('test')
        )
    }

    @test()
    protected async typeingIntoField1EmitsEvent() {
        let wasHit = false
        await eventFaker.on('eightbitstories.autocomplete-event::v2020_01_01', () => {
            wasHit = true
            return []
        })

        await this.typeIntoField1('hello world')
        
        assert.isTrue(wasHit)
    }

    protected get autocompleteVc() {
        return this.vc.getAutocompleteVc()
    }

    protected async typeIntoField1(value: string) {
       return this.autocompleteVc.setRenderedValue(value)
    }

    protected get formVc() {
        return this.vc.getForm()
    }
}

class SpyMyCard extends MyCardViewController {
    public getAutocompleteVc() {
        return this.autocompleteInputVc
    }

    public getForm() {
        return this.formVc
    }
}

```

</details>

<details>
<summary><strong>Production 4</strong>: Emit an event when the <em>renderedValue</em> changes</summary>

Time to change the `onChangeRenderedValue` handler to emit an event when the `renderedValue` changes.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
    AutocompleteInputViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<MyFormSchema>
    protected autocompleteInputVc: AutocompleteInputViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.autocompleteInputVc = this.AutocompleteVc()
        this.formVc = FormVc()
        this.cardVc = CardVc()
    }

    private AutocompleteVc(): AutocompleteInputViewController {
        return this.Controller('autocomplete-input', {
            onChangeRenderedValue: (value) =>
                this.handleAutocompleteChange(value),
        })
    }

    private async handleAutocompleteChange(_value: string) {
        this.autocompleteInputVc.showSuggestions([])
        const client = await this.connectToApi()
        await client.emitAndFlattenResponses(
            'eightbitstories.autocomplete-event::v2020_01_01'
        )
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [
                    {
                        fields: [
                            {
                                name: 'field1'
                                vc: this.autocompleteInputVc,
                            }, 
                            'field2'
                        ],
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

> **Note**: We still show an empty array of suggestions to keep the past test working.

> **Note**: You should be getting an error that a listener for `eightbitstories.autocomplete-event::v2020_01_01` doesn't exist for the last test, we'll refactor our test next to make it work.

> **Note**: To avoid an unused variable warning, you can prepend the variable name with an underscore (`_value`).

</details>

<details>
<summary><strong>Test 5a</strong>: Fix the previous test + <em>EventFaker</em></summary>

We're going to take a short detour now to create an `EventFaker` class to keep our tests DRY.

```ts
import { AbstractSpruceFixtureTest, eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import {
    autocompleteAssert,
    AutocompleteInputViewController,
    formAssert,
} from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyMyCard
    private static eventFaker: EventFaker

    protected async beforeEach() {
        await super.beforeEach()

        this.views.setController('eightbitstories.my-card', SpyMyCard)

        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
        this.eventFaker = new EventFaker()
        
        await this.eventFaker.fakeAutocompleteEvent()
    }

    @test()
    protected async rendersACard() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected async rendersExpectedFields() {
        formAssert.formRendersFields(this.formVc, ['field1','field2'])
    }

    @test()
    protected async rendersAutocompleteInput() {
        formAssert.fieldRendersUsingInstanceOf(
            this.formVc,
            'field1',
            AutocompleteInputViewController
        )
    }

    @test()
    protected async changingDestinationsRendersSuggestions() {
        await autocompleteAssert.actionShowsSuggestions(
            this.autocompleteInputVc,
            () => this.typeIntoField1('test')
        )
    }

    @test()
    protected async typeingIntoField1EmitsEvent() {
        let wasHit = false
        await this.eventFaker.fakeAutocompleteEvent(() => {
            wasHit = true
            return []
        })

        await this.typeIntoField1('hello world')
        
        assert.isTrue(wasHit)
    }

    protected get autocompleteVc() {
        return this.vc.getAutocompleteVc()
    }

    protected async typeIntoField1(value: string) {
       return this.autocompleteVc.setRenderedValue(value)
    }

    protected get formVc() {
        return this.vc.getForm()
    }
}

class SpyMyCard extends MyCardViewController {
    public getAutocompleteVc() {
        return this.autocompleteInputVc
    }

    public getForm() {
        return this.formVc
    }
}

class EventFaker {
    public async fakeAutocompleteEvent(cb?: () => void) {
        return this.fakeEvent('eightbitstories.autocomplete-event::v2020_01_01', () => {
            return {
                results: [],
            }
        })
    }
}

```

> **Note**: By adding the `EventFaker` class and faking the event in `beforeEach`, we can be sure that no test fails because of a missing listener.

</details>

<details>
<summary><strong>Test 5b</strong>: Assert the expected target & payload</summary>

</details>

