# Dates & Times

Details coming soon...

## Timezones

### Based on `Location`

Coming Soon...

### Based on `Person`

Coming Soon...

## Rendering time until a date

The `durationUtil` provided by `@sprucelabs/calendar-utils` is useful for rendering time until a date, like "in 2 hours" or "5 days ago" or "today".

### `durationUtil` in the backend

If you need to render a time span from a listener or something invoked from a listener, here is how you would on that.

#### Test 1: Ensure `durationUtil.renderDateTimeUntil(...)` is called and used as expected

You are safe to monkey patch the `durationUtil` on the `DurationUtilBuilder` to spy on the `renderDateTimeUntil(...)` method. Make sure to call `DurationBuilder.reset()` in the `beforeEach()` of your test suite to make sure the `durationUtil` is reset to its original state.

```ts
import { DurationUtilBuilder } from '@sprucelabs/calendar-utils'

protected static async beforeEach() {
    await super.beforeEach()
    DurationUtilBuilder.reset()
}

@test()
protected static async myOperationCallsRenderDateTimeUntil() {
    const dateTimeUntil = generateId()

    DurationUtilBuilder.durationUtil.renderDateTimeUntil = () => {
        return dateTimeUntil
    }

    const message = await this.someOperation()

    assert.doesInclude(message, dateTimeUntil)

}
```

#### Production 1: Call `durationUtil.renderDateTimeUntil(...)`

In this first attempt, you're only making sure that the `durationUtil.renderDateTimeUntil(...)` method is called. You're not concerned with the parameters passed to it nor are you concerned with the timezone, just drop in something random to start.

```ts
import { DurationUtilBuilder } from '@sprucelabs/calendar-utils'

public async someOperation() {
    ...
    const durationUtil = await DurationUtilBuilder.getFromTimezone('America/Denver')
    const timeUntil = durationUtil.renderDateTimeUntil(0, 0)
    const message = `Your journey starts in ${timeUntil}!`
    ...
    return message
}
```

#### Test 2: Ensure `durationUtil.renderDateTimeUntil(...)` is called with correct params

Now that you know the `durationUtil.renderDateTimeUntil(...)` method is called, you can spy on the parameters passed to it. You can use `assert.isBetween(...)` to ensure the `beginning` and `end` parameters are within a reasonable range.

```ts
import { DurationUtilBuilder } from '@sprucelabs/calendar-utils'

@test()
protected static async myOperationCallsRenderDateTimeUntil() {
    let passedEnd: number | undefined

    const dateTimeUntil = generateId()
    const expectedEnd = 0 //Some date in the future

    DurationUtilBuilder.durationUtil.renderDateTimeUntil = (end) => {
        passedEnd = end
        return dateTimeUntil
    }

    const message = await this.someOperation()

    assert.doesInclude(message, dateTimeUntil)
    assert.isEqual(passendEnd, expectedEnd)

}
```

#### Production 2: Call `durationUtil.renderDateTimeUntil(...)` with correct params

In a lot of cases, you'll just want to pass `Date.now()` as the `beginning` parameter. That's what I'll show you here.

```ts
import { DurationUtilBuilder } from '@sprucelabs/calendar-utils'

public async someOperation() {
    ...
    const someDateInFuture = 0 //Some date in the future
    const durationUtil = await DurationUtilBuilder.getFromTimezone('America/Denver')
    const timeUntil = durationUtil.renderDateTimeUntil(someDateInFuture)
    const message = `Your journey starts in ${timeUntil}!`
    ...
}
```

#### Test 3: Ensure `durationUtil.renderDateTimeUntil(...)` is called with correct timezone

You can start a new test and use the `dateAssert` utility from `@sprucelabs/calendar-utils` to assert the timezone based on `DurationUtilBuilder.lastBuiltDurationUtil`. Note: You can get the `timezone` off a `Location` or `Person` if you don't want to hardcode it like this example.

```ts
import { DurationUtilBuilder, dateAssert } from '@sprucelabs/calendar-utils'

@test()
protected static async myOperationCalledWithTheExpectedTimezone() {
    await this.someOperation()

    dateAssert.currentTimezoneEquals(
        DurationUtilBuilder.lastBuiltDurationUtil,
        'Africa/Johannesburg'
    )
}

```

#### Production 3: Call `durationUtil.renderDateTimeUntil(...)` with correct timezone

Finally! You can bring it home by calling the `DurationUtilBuilder.getFromTimezone()` method with the correct timezone! You could obviously do this first, it's totally up to you!

```ts
import { DurationUtilBuilder } from '@sprucelabs/calendar-utils'

public async someOperation() {
    ...
    const someDateInFuture = 0 //Some date in the future
    const durationUtil = await DurationUtilBuilder.getFromTimezone('Africa/Johannesburg')
    const timeUntil = durationUtil.renderDateTimeUntil(someDateInFuture)
    const message = `Your journey starts in ${timeUntil}!`
    ...
}
```

### `durationUtil` in views

If you want to render the time until an event in a View Controller, you go about it slightly differently, but it's pretty easy!

#### Test 1: Ensure `durationUtil` is configured correctly

```ts
import { vcDurationAssert } from '@sprucelabs/heartwood-view-controllers'

@test()
protected static async myViewHasDurationUtilConfigured() {
    const vc = this.views.Controller('eightbitstories.root', {})
    vcDurationAssert.durationUtilIsConfiguredForVc(vc)
}
```


#### Test 1a: Ensure `vcDurationAssert` is configured correctly

You should have gotten an error telling you to call `vcDurationAssert.beforeEach(this.views)` to get the assertion library to work correctly. Lets do that now.

```ts
import { vcDurationAssert } from '@sprucelabs/heartwood-view-controllers'

protected static async beforeEach() {
    await super.beforeEach()
    vcDurationAssert.beforeEach(this.views)
}

@test()
protected static async myViewHasDurationUtilConfigured() {
    const vc = this.views.Controller('eightbitstories.root', {})
    vcDurationAssert.durationUtilIsConfiguredForVc(vc)
}
```

#### Production 1: Configure `durationUtil` in the View Controller

Your View Controller will come with a fully timezone aware `dateUtil` accessibly via `this.dates`. Your job is to set the `durationUtil.dates` to `this.dates` in the constructor of your View Controller to make sure the `durationUtil` is timezone aware.

```ts
class RootSkillView extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)
        durationUtil.dates = this.dates
    }
}
```

### `durationUtil` in messages

Sending a message that renders the time until is a bit different than the other two examples. You actually don't need to use the `durationUtil` at all because it's handled by [Mercury](../mercury/) for you using [Message Context](../messages)!

#### Test 1: Ensure a message is sent

```ts
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'

@test()
protected static async messageIsSent() {
    let wasHit = false

    await eventFaker.on('send-message::v2020_12_25', () => {
        wasHit = true

        return {
            message: {
                body: generateId(),
                classification: 'transactional' as const,
                id: generateId(),
                dateCreated: Date.now(),
                source: {},
                target: {
                    personId: generateId(),
                },
            },
        }
    })

    await this.someOperationThatSendsAMessage()

    assert.isTrue(wasHit, `Message was not sent!`)
}
```

#### Production 1: Send a message
Follow the process for [sending messages](../messages) to work your way through testing sending a message. We'll only pay attention to the parts relevant to rendering the time until a date.

```ts
private async someOperationThatSendsAMessage() {
    await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {},
        payload: {},
    }
}
```

#### Test 2: Ensure the message is sent with expected placeholder
Now we'll check the body to see if it contains the `{{formatDateTimeUntil dateTimeMs}}` placeholder. Also, we can remove the `didHit` assertion because it's redundant. Lastly, I'm not gonna show the full response because it's not relevant to this example.

```ts
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'

@test()
protected static async messageIsSent() {
    let passedBody: string | undefined

    await eventFaker.on('send-message::v2020_12_25', ( { payload }) => {
        passedBody = payload.message.body

        return {
            message: {
                ...
            },
        }
    })

    await this.someOperationThatSendsAMessage()

    assert.doesInclude(passedBody, '{{formatDateTimeUntil eventDateMs}}')
}
```

#### Production 2: Send a message with the placeholder

```ts
private async someOperationThatSendsAMessage() {
    await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {},
        payload: {
            message: {
                ...,
                body: `Your journey starts in {{formatDateTimeUntil eventDateMs}}!`,
            }
        },
    }
}
```
#### Test 3: Ensure the message has the correct context
The `formatDateTimeUntil` placeholder is a plugin that accepts a variable that is named after anything in the [Message Context](../messages). In this case, we're using `eventDateMs` as the variable name. We need to make sure that the `eventDateMs` is in the context of the message. This variable could be called anything as long as it's a key in the context. Also, the `formatDateTimeUntil` plugin will default to the target's timezone. Meaning, if you target a location, it'll use that location's timezone. Or, if you target a person, it'll use that person's timezone. In this example, we want to target a timezone manuall, just to show you how to do it.

```ts
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'

@test()
protected static async messageIsSent() {
    let passedBody: string | undefined
    let passedContext: Record<string, any> | undefined

    const expectedEventDateMs = 0 //some date in the future or past

    await eventFaker.on('send-message::v2020_12_25', ( { payload }) => {
        passedBody = payload.message.body
        passedContext = payload.message.context

        return {
            message: {
                ...
            },
        }
    })

    await this.someOperationThatSendsAMessage()

    assert.doesInclude(passedBody, '{{formatDateTimeUntil eventDateMs}}')
    assert.isEqualDeep(passedContext, { timezone: 'Africa/Johannesburg', eventDateMs: expectedEventDateMs })
}
```

#### Production 3: Send a message with the context

```ts
private async someOperationThatSendsAMessage() {
    await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {},
        payload: {
            message: {
                ...,
                body: `Your journey starts in {{formatDateTimeUntil eventDateMs}}!`,
                context: {
                    eventDateMs: 0 //some date in the future or past,
                    timezone: 'Africa/Johannesburg'
                }
            }
        },
    }
}
```

#### Test 4: Parameterize the timezone

Lastly, lets parameterize this test to let us test different timezones.

```ts
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { TimezoneName } from '@sprucelabs/calendar-utils'

@test('message is sent with timezone Africa/Johannesburg')
@test('message is sent with timezone America/Denver')
protected static async messageIsSent(timezone: TimezoneName) {
    let passedBody: string | undefined
    let passedContext: Record<string, any> | undefined

    const expectedEventDateMs = 0 //some date in the future or past
    this.timezoneLoaderTestDouble.setTimezone(timezone) //use some test double that can be accessed in the production code

    await eventFaker.on('send-message::v2020_12_25', ( { payload }) => {
        passedBody = payload.message.body
        passedContext = payload.message.context

        return {
            message: {
                ...
            },
        }
    })

    await this.someOperationThatSendsAMessage()

    assert.doesInclude(passedBody, '{{formatDateTimeUntil eventDateMs}}')
    assert.isEqualDeep(passedContext, { timezone, eventDateMs: expectedEventDateMs })
}
```

#### Production 4: Send a message with the timezone

 ```ts
private async someOperationThatSendsAMessage() {
    const timezone = this.someDataSource.getSomeTimezone() //some method that returns a timezone that is test doubled
    await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {},
        payload: {
            message: {
                ...,
                body: `Your journey starts in {{formatDateTimeUntil eventDateMs}}!`,
                context: {
                    eventDateMs: 0 //some date in the future or past,
                    timezone,
                }
            }
        },
    }
}
```