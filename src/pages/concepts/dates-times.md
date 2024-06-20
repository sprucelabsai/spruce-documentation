# Dates & Times

More coming soon...

## Rendering time spans

The `durationUtil` provided by `@sprucelabs/calendar-utils` is useful for rendering time spans like "2 hours" or "5 days" or "today".

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
    let passedBeginning: number | undefined
    let passedEnd: number | undefined

    const dateTimeUntil = generateId()

    const expectedEnd = 0 //Some date in the future

    DurationUtilBuilder.durationUtil.renderDateTimeUntil = (beginning, end) => {
        passedBeginning = beginning
        passedEnd = end
        
        return dateTimeUntil
    }

    const floor = Date.now()
    const message = await this.someOperation()
    const ceiling = Date.now()

    assert.doesInclude(message, dateTimeUntil)
    assert.isBetween(passedBeginning, floor, ceiling)
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
    const timeUntil = durationUtil.renderDateTimeUntil(Date.now(), someDateInFuture)
    const message = `Your journey starts in ${timeUntil}!`
    ...
}
```

#### Test 3: Ensure `durationUtil.renderDateTimeUntil(...)` is called with correct timezone

You can start a new test and use the `dateAssert` utility from `@sprucelabs/calendar-utils` to assert the timezone based on the last built duration util available on the `DateUtilBuilder`. Note: You can get the `timezone` off a `Location` or `Person` if you don't want to hardcode it like this example.

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
    const timeUntil = durationUtil.renderDateTimeUntil(Date.now(), someDateInFuture)
    const message = `Your journey starts in ${timeUntil}!`
    ...
}
```

### `durationUtil` in views
