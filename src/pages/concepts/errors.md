# Errors

`Errors` are first-class citizens in Spruce. They allow you to define errors and their context, as well as to chain errors to enhance debugging and error handling.

## Creating a new Error

```bash
spruce create.error
```

### Created/Modified files
1. `errors/{{errorCode}}.builder.ts` (created): this is the schema that defines the shape of the error. 
2. `errors/SpruceError.ts` (updated): The actual error class that extends the base error class. that is strictly typed to support implementing it in production code.
3. `.spruce/errors/errors.types.ts` (created/updated): This file defines the types used for errors, based on the schemas.
4. `.spruce/errors/options.types.ts` (created/update): This actually defines the ErrorOptions type as union type of all the errors you've created. 

### SpruceError Implementation

Here is what a typical `SpruceError.ts` file looks like. Take a look at the comments in the code to gain a better understanding of what is going on.

```typescript
import AbstractSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

//ErrorOptions (declared in .spruce/errors/options.types.ts) 
//is what types `this.options` inside your Error.
export default class SpruceError extends AbstractSpruceError<ErrorOptions> {
    public friendlyMessage(): string {
        const { options } = this
        let message

        // While options is required, treating as optional 
        // keeps us from throwing "calling x on a non-object" 
        // type errors
        switch (options?.code) {
            // A case will be written for each error you create (using spruce create.error)
            case 'NOT_FOUND':
                message = `I couldn't find what you were looking for!`
                break

            case 'UNAUTHORIZED_ACCESS':
                message = `Oh no!! I wanted to help, but you can't ${options.youDontHaveAccessTo}`
                break

            case 'META_NOT_FOUND':
                message = `It looks like you haven't saved your family name and values yet! You gotta do that before I can write a story!`
                break

            default:
                // If no case matches, we can use the default friendly message
                // which can be defined when instantiating the error. if one 
                // is not defined, it'll fallback to error.message (standard error
                // signature)
                message = super.friendlyMessage()
        }

        // Construct the full error message. If there is a 
        // friendly message defined in options, use it.
        const fullMessage = options.friendlyMessage
            ? options.friendlyMessage
            : message

        return fullMessage
    }
}

```

## Throwing an error

```typescript
import SpruceError from '../errors/SpruceError'

throw new SpruceError({
    code: 'UNAUTHORIZED_ACCESS',
    youDontHaveAccessTo: `update this family member!!`,
})
```

## Testing for errors
```typescript
@test()
protected assertASpecificErrorWasThrown() {
    const err = assert.doesThrow(() => this.somethingThatThrows())

    //The first param is the error code and the second are all the options
    //which are defined in the error schema @src/errors/{{errorCode}}.builder.ts
    errorAssert.assertError(err, 'ERROR_CODE', {
        option1: true,
        option2: false
    })
}

@test()
protected async assertASpecificErrorWasThrownAsync() {
    // works exactly the same as before, just with async/await
    const err = await assert.doesThrowAsync(() => this.somethingThatThrowsAsync())

    errorAssert.assertError(err, 'ERROR_CODE', {
        option1: true,
        option2: false
    })
}
```

## Catching an error

We're going to cover two strategies when it comes to typing errors:

1. `any`
2. `unknown`

In Spruce, in the context of catching an error, we prefer `any` as the scope is well-defined (just a catch block) and we want to avoid the additional checks that come with `unknown`.

We do, however, exchange the need for an `instanceof` check for optional chaining, but the trade-off still leans in favor of `any`.

```typescript

// Using any
try {
    somethingThatThrows()
} catch (err: any) { 
    if (err.options?.code === "UNAUTHORIZED_ACCESS") {
        // Handle unauthorized access error
        doSomethingElse()
    }
}

// Using unknown
try {
    somethingThatThrows()
} catch (err: unknown) {
    if (err instanceof SpruceError && err.options.code === "UNAUTHORIZED_ACCESS") {
        doSomethingElse()
    }
}
```

## Error Chaining
Sometimes you need to catch an error and throw another one, especially when you don't want implementation details of a 3rd party dependency to leak out into your app.

```typescript

//using any
try {
    somethingThatThrows()
} catch (err: any) {

    // You can pass the error you just caught to originalError
    throw new SpruceError({
        code: 'META_NOT_FOUND',
        originalError: err,
    })
}


//using unknown
try {
    somethingThatThrows()
} catch (err: unknown) {

    // You can pass the error you just caught to originalError
    throw new SpruceError({
        code: 'META_NOT_FOUND',
        originalError: err as Error,
    })
}


// now, when you catch an error, you can see if there was an original error
try {
    somethingThatThrowsChainedError()
} catch (err: any) {
    // You can access the original error
    console.log(err.options?.originalError)
}


```

## Overridding friendly messages
You can override error the friendly message in errors that are not your own by updating the `blueprint.yml` (or the Skill's `.env`) using the following pattern:

`FRIENDLY_ERROR_MESSAGE_<ERROR_CODE>`


### blueprint.yml
```yml
- mercury:
    - FRIENDLY_ERROR_MESSAGE_TIMEOUT: "The request timed out. Please try again later."
    - FRIENDLY_ERROR_MESSAGE_NOT_AUTHORIZED: "You can't do that!"
- eight-bit-stories:
    - FRIENDLY_ERROR_MESSAGE_FAMILY_NOT_FOUND: "I could not find your family for you!"
```

> *Note*: After you update your `blueprint.yml`, you'll need to run `yarn setup.theatre blueprint.yml` again.

### .env

Each `.env` will sit in it's own Skill`s directory. The syntax is different, but the pattern is the same.

```bash
FRIENDLY_ERROR_MESSAGE_TIMEOUT="The request timed out. Please try again later."
FRIENDLY_ERROR_MESSAGE_NOT_AUTHORIZED="You can't do that!"
```
> *Note*: After updating your `.env`, you'll need to reboot your skill.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>