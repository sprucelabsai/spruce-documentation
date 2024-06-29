# Dates & Times

## Important Utilities

<details>
<summary><strong>dateUtil</strong> - A utility that wraps a lot of helpful date related functionality. By default it's not timezone aware, but you can make it timezone aware by using the DateUtilDecorator provided by @sprucelabs/calendar-utils.</summary>


```ts
export interface DateUtil {
    eventDaysOfWeek: {
        sun: string;
        mon: string;
        tue: string;
        wed: string;
        thur: string;
        fri: string;
        sat: string;
    };
    getStartOfDay(timestamp?: number): number;
    getStartOfWeek(timestamp?: number): number;
    getEndOfDay(timestamp?: number): number;
    getEndOfWeek(timestamp: number): number;
    getStartOfMonth(timestamp?: number): number;
    getEndOfMonth(timestamp?: number): number;
    addMinutes(startTimestamp: number, minutes: number): number;
    addMilliseconds(startTimestamp: number, ms: number): number;
    addDays(startTimestamp: number, days: number): number;
    addWeeks(startTimestamp: number, weeks: number): number;
    addMonths(timestamp: number, months: number): number;
    addYears(timestamp: number, years: number): number;
    getDurationMs(timestamp: number, endTimestamp: number): number;
    getDurationMinutes(timestamp: number, endTimestamp: number): number;
    getDurationDays(timestamp: number, endTimestamp: number): number;
    getDayOfWeek(timestamp: number): DayOfWeek;
    getDayOfWeekIndex(timestamp: number): number;
    splitDate(timestamp: number): {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
    setTimeOfDay(timestamp: number, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    getDateNDaysFromStartOfDay(days: number, timestamp?: number): number;
    getDateNMonthsFromStartOfDay(count: number, timestamp?: number): number;
    getDateNMonthsFromStartOfMonth(count: number, timestamp?: number): number;
    date(date?: IDate): number;
    /**
     * Unit_______________Pattern___Results
     *
     * Era________________G..GGG____AD,BC
     *
     * ___________________GGGG______Anno Domini, Before Christ
     *
     * ___________________GGGGG_____A,B
     *
     *
     *
     * Calendar year_______y_________44, 1, 1900, 2017
     *
     * ___________________yo________44th, 1st, 0th, 17th
     *
     * ___________________yy________44, 01, 00, 17
     *
     * ___________________yyy_______044, 001, 1900, 2017
     *
     * ___________________yyyy______0044, 0001, 1900, 2017
     *
     *
     *
     * Local week_________Y_________44, 1, 1900, 2017
     *
     * ___________________Yo________44th, 1st, 1900th, 2017th
     *
     * ___________________YY________44, 01, 00, 17
     *
     * ___________________YYY_______044, 001, 1900, 2017
     *
     * ___________________YYYY______0044, 0001, 1900, 2017
     *
     *
     *
     * ISO week___________R_________-43, 0, 1, 1900, 2017
     *
     * ___________________________RR________-43, 00, 01, 1900, 2017
     *
     * __________________________RRR_______-043, 000, 001, 1900, 2017
     *
     * _________________________RRRR______-0043, 0000, 0001, 1900, 2017
     *
     *
     *
     *
     * Extended year______u_________-43, 0, 1, 1900, 2017
     *
     * ___________________uu________-43, 01, 1900, 2017
     *
     * ___________________uuu_______-043, 001, 1900, 2017
     *
     * ___________________uuuu______-0043, 0001, 1900, 2017
     *
     *
     *
     *
     * Quarter (pretty)_____Q_________1, 2, 3, 4
     *
     * ___________________Qo________1st, 2nd, 3rd, 4th
     *
     * ___________________QQ________01, 02, 03, 04
     *
     * ___________________QQQ_______Q1, Q2, Q3, Q4
     *
     * ___________________QQQQ______1st quarter, 2nd quarter, ...
     *
     * ___________________QQQQQ_____1, 2, 3, 4
     *
     *
     *
     * Quarter____________q_________1, 2, 3, 4
     *
     * ___________________qo________1st, 2nd, 3rd, 4th
     *
     * ___________________qq________01, 02, 03, 04
     *
     * ___________________qqq_______Q1, Q2, Q3, Q4
     *
     * ___________________qqqq______1st quarter, 2nd quarter,...
     *
     * ___________________qqqqq_____1, 2, 3, 4
     *
     *
     *
     * Month (pretty)______M_________1, 2, ..., 12
     *
     * ___________________Mo________1st, 2nd, ..., 12th
     *
     * ___________________MM________01, 02, ..., 12
     *
     * ___________________MMM_______Jan, Feb, ..., Dec
     *
     * ___________________MMMM______January, February, ..., December
     *
     * ___________________MMMMM_____J, F, ..., D
     *
     *
     *
     * Month______________L_________1, 2, ..., 12
     *
     * ___________________Lo________1st, 2nd, ..., 12th
     *
     * ___________________LL________01, 02, ..., 12
     *
     * ___________________LLL_______Jan, Feb, ..., Dec
     *
     * ___________________LLLL______January, February, ..., December
     *
     * ___________________LLLLL_____J, F, ..., D
     *
     *
     *
     * Local Week_________w_________1, 2, ..., 53
     *
     * ___________________wo________1st, 2nd, ..., 53th
     *
     * ___________________ww________01, 02, ..., 53
     *
     *
     *
     * ISO week of year_____I_________1, 2, ..., 53
     *
     * ___________________Io________1st, 2nd, ..., 53th
     *
     * ___________________II________01, 02, ..., 53
     *
     *
     *
     * Day of month_______d_________1, 2, ..., 31
     *
     * ___________________do________1st, 2nd, ..., 31st
     *
     * ___________________dd________01, 02, ..., 31
     *
     *
     *
     * Day of year________D_________1, 2, ..., 365, 366
     *
     * ___________________Do________1st, 2nd, ..., 365th, 366th
     *
     * ___________________DD________01, 02, ..., 365, 366
     *
     * ___________________DDD_______001, 002, ..., 365, 366
     *
     *
     *
     * Day of week________E..EEE____Mon, Tue, Wed, ..., Sun
     *
     * ___________________EEEE______Monday, Tuesday, ..., Sunday
     *
     * ___________________EEEEE_____M, T, W, T, F, S, S
     *
     * ___________________EEEEEE____Mo, Tu, We, Th, Fr, Sa, Su
     *
     *
     *
     * ISO day of week_____i_________1, 2, 3, ..., 7
     *
     * ___________________io________1st, 2nd, ..., 7th
     *
     * ___________________ii________01, 02, ..., 07
     *
     * ___________________iii_______Mon, Tue, Wed, ..., Sun
     *
     * ___________________iiii______Monday, Tuesday, ..., Sunday
     *
     * ___________________iiiii_____M, T, W, T, F, S, S
     *
     * ___________________iiiiii____Mo, Tu, We, Th, Fr, Sa, Su
     *
     *
     *
     * Local day of week_____e_________2, 3, 4, ..., 1
     *
     * ___________________eo________2nd, 3rd, ..., 1st
     *
     * ___________________ee________02, 03, ..., 01
     *
     * ___________________eee_______Mon, Tue, Wed, ..., Sun
     *
     * ___________________eeee______Monday, Tuesday, ..., Sunday
     *
     * ___________________eeeee_____M, T, W, T, F, S, S
     *
     * ___________________eeeeee____Mo, Tu, We, Th, Fr, Sa, Su
     *
     *
     *
     *
     * Day of week_________c_________2, 3, 4, ..., 1
     *
     * ___________________co________2nd, 3rd, ..., 1st
     *
     * ___________________cc________02, 03, ..., 01
     *
     * ___________________ccc_______Mon, Tue, Wed, ..., Sun
     *
     * ___________________cccc______Monday, Tuesday, ..., Sunday
     *
     * ___________________ccccc_____M, T, W, T, F, S, S
     *
     * ___________________cccccc____Mo, Tu, We, Th, Fr, Sa, Su
     *
     *
     *
     * AM,PM_____________a..aa_____AM, PM
     *
     * ___________________aaa_______am, pm
     *
     * ___________________aaaa______a.m., p.m.
     *
     * ___________________aaaaa_____a,p
     *
     *
     * AM, PM, noon, mid_b..bb____AM, PM, noon, midnight
     *
     * _____________________bbb______am, pm, noon, midnight
     *
     * _____________________bbbb_____a.m.,_p.m.,_noon,_midnight
     *
     * _____________________bbbbb____a,_p,_n,_mi
     *
     *
     * Flexible day period_B..BBB___at night, in the morning, ...
     *
     * _____________________BBBB_____at night, in the morning, ...
     *
     * _____________________BBBBB____at night, in the morning, ...
     *
     *
     *
     * Hour [1-12]_________h________1, 2, ..., 11, 12
     *
     * ___________________ho_______1st, 2nd, ..., 11th, 12th
     *
     * ___________________hh_______01,_02,_...,_11,_12
     *
     *
     *
     * Hour [0-23]______________H________0,_1,_2,_...,_23
     *
     * __________________________Ho_______0th,_1st,_2nd,_...,_23rd
     *
     * __________________________HH_______00,_01,_02,_...,_23
     *
     *
     *
     * Hour [0-11]______________K________1,_2,_...,_11,
     *
     * __________________________Ko_______1st,_2nd,_...,_11th,_0th
     *
     * __________________________KK_______01,_02,_...,_11,_00
     *
     *
     *
     * Hour [1-24]______________k________24,_1,_2,_...,_23
     *
     * __________________________ko_______24th,_1st,_2nd,_...,_23rd
     *
     * __________________________kk_______24,_01,_02,_...,_23
     *
     *
     *
     * Minute___________________m__________0,_1,_...,_59
     *
     * ___________________________mo_________0th,_1st,_...,_59th
     *
     * ___________________________mm_________00,_01,_...,_59
     *
     *
     *
     * Second___________________s__________0,_1,_...,_59
     *
     * ___________________________so_________0th,_1st,_...,_59th
     *
     * ___________________________ss_________00,_01,_...,_59
     *
     *
     *
     * Fraction_of_second_______S__________0,_1,_...,
     *
     * ___________________________SS_________00,_01,_...,_99
     *
     * ___________________________SSS________000,_001,_...,_999
     *
     *
     *
     * Timezone_(ISO-8601_w/_Z)_X__________-08,_+0530,_Z
     *
     * ___________________________XX_________-0800,_+0530,_Z
     *
     * ___________________________XXX________-08:00,_+05:30,_Z
     *
     * ___________________________XXXX_______-0800,_+0530,_Z,_+123456
     *
     * ___________________________XXXXX______-08:00,_+05:30,_Z,_+12:34:56
     *
     *
     *
     * Timezone_(ISO-8601_w/o_Z_x__________-08,_+0530,_+00
     *
     * ___________________________xx_________-0800,_+0530,_+0000
     *
     * ___________________________xxx________-08:00,_+05:30,_+00:00
     *
     * ___________________________xxxx_______-0800,_+0530,_+0000,_+123456
     *
     * ___________________________xxxxx______-08:00,_+05:30,_+00:00,_+12:34:56
     *
     *
     * Timezone_(GMT)___________O...OOO____GMT-8,_GMT+5:30,_GMT+0
     *
     * ___________________________OOOO_______GMT-08:00,_GMT+05:30,_GMT+00:00
     *
     *
     * Timezone_(specific_non-l_z...zzz____GMT-8,_GMT+5:30,_GMT+0
     *
     * ___________________________zzzz_______GMT-08:00,_GMT+05:30,_GMT+00:00
     *
     *
     * Seconds_timestamp________t__________512969520
     *
     *
     * Milliseconds_timestamp___T__________512969520900
     *
     *
     * Long localized date______P__________04/29/1453
     *
     * ___________________________PP_________Apr 29, 1453
     *
     * ___________________________PPP________April 29th, 1453
     *
     * ___________________________PPPP_______Friday,_April_29th,_1453
     *
     *
     * Long_localized_time______p__________12:00_AM
     *
     * ___________________________pp_________12:00:00_AM
     *
     * ___________________________ppp________12:00:00_AM_GMT+2
     *
     * ___________________________pppp_______12:00:00_AM_GMT+02:00
     *
     *
     *
     * Date & Time_______________Pp_________04/29/1453,_12:00_AM
     *
     * ___________________________PPpp_______Apr_29,_1453,_12:00:00_AM
     *
     * ___________________________PPPppp_____April_29th,_1453_at_...
     *
     * ___________________________PPPPpppp___Friday,_April_29th,_1453_at_...
     *
     */
    format(timestamp: number, format: string): string;
    formatTime(timestamp: number): string;
    formatDate(timestamp: number): string;
    formatDateTime(timestamp: number): string;
    add(timestamp: number, count: number, unit: DateUnit): any;
    isSameDay(timestamp1: number, timestamp2: number): boolean;
    getTotalDaysInMonth(year: number, month: number): number;
};

```

</details>

<details>
<summary><strong>DateUtilDecorator</strong> - A decorator that makes the dateUtil timezone aware. This is done automatically for you in your Skill Views.</summary>

Coming soon...
</details>

<details>
<summary><strong>durationUtil</strong> - A utility that helps you render durations (timespans, distances, etc.) in various ways.</summary>

Coming soon...
</details>

## Timezones

### Based on `Location`

Coming Soon...

### Based on `Person`

Coming Soon...

## Rendering time until a date

The `durationUtil` provided by `@sprucelabs/calendar-utils` is useful for rendering time until a date, like "in 2 hours" or "5 days ago" or "today".

### `durationUtil` in the backend

If you need to render a time span from a listener or something invoked from a listener, here is how you would on that.
<details>
<summary><strong>Test 1:</strong> Assert `durationUtil.renderDateTimeUntil(...)` is called</summary>

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

</details>

<details>
<summary><strong>Production 1:</strong> Call `durationUtil.renderDateTimeUntil(...)`</summary>

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

</details>

<details>
<summary><strong>Test 2:</strong> Assert `durationUtil.renderDateTimeUntil(...)` is called with correct params</summary>

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

</details>

<details>
<summary><strong>Production 2:</strong> Call `durationUtil.renderDateTimeUntil(...)` with correct params</summary>

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

</details>

<details>
<summary><strong>Test 3</strong>: Assert `durationUtil.renderDateTimeUntil(...)` is called with correct timezone</summary>

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

</details>

<details>
<summary><strong>Production 3</strong>: Call `durationUtil.renderDateTimeUntil(...)` with correct timezone</summary>

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

</details>

### `durationUtil` in views

If you want to render the time until an event in a View Controller, you go about it slightly differently, but it's pretty easy!

<details>
<summary><strong>Test 1:</strong> Assert `durationUtil` is configured correctly</summary>

```ts
import { vcDurationAssert } from '@sprucelabs/heartwood-view-controllers'

@test()
protected static async myViewHasDurationUtilConfigured() {
    const vc = this.views.Controller('eightbitstories.root', {})
    vcDurationAssert.durationUtilIsConfiguredForVc(vc)
}
```

</details>

<details>
<summary><strong>Test 1a:</strong> Ensure `vcDurationAssert` is configured correctly</summary>

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

</details>

<details>
<summary><strong>Production 1:</strong> Configure `durationUtil` in the View Controller</summary>

Your View Controller will come with a fully timezone aware `dateUtil` accessibly via `this.dates`. Your job is to set the `durationUtil.dates` to `this.dates` in the constructor of your View Controller to make sure the `durationUtil` is timezone aware.

```ts
class RootSkillView extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)
        durationUtil.dates = this.dates
    }
}
```

</details>

### `durationUtil` in messages

Sending a message that renders the time until is a bit different than the other two examples. You actually don't need to use the `durationUtil` at all because it's handled by [Mercury](../mercury/) for you using [Message Context](../messages)!

<details>
<summary><strong>Test 1:</strong> Assert a message is sent</summary>

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

</details>

<details>
<summary><strong>Production 1:</strong> Send a message</summary>
Follow the process for [sending messages](../messages) to work your way through testing sending a message. We'll only pay attention to the parts relevant to rendering the time until a date.

```ts
private async someOperationThatSendsAMessage() {
    await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {},
        payload: {},
    }
}
```

</details>

<details>
<summary><strong>Test 2:</strong> Assert the message is sent with expected placeholder</summary>
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

</details>

<details>
<summary><strong>Production 2:</strong> Send a message with the placeholder</summary>

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

</details>

<details>
<summary><strong>Test 3:</strong> Assert the message has the correct context</summary>
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

</details>

<details>
<summary><strong>Production 3:</strong> Send a message with the context</summary>

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

</details>

<details>

<summary><strong>Test 4:</strong> Parameterize the timezone</summary>

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

</details>

<details>

<summary><strong>Production 4:</strong> Send a message with the timezone</summary>

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

</details>