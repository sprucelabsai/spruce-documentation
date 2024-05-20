# Starting from Scratch

Spruce is a "full-stack platform" that allows for both beautiful UI's and robust back-ends.

## Key Points of Spruce Development

|                          | Spruce                     |
|--------------------------|----------------------------|
| **Programming Language** | TypeScript                 |
| **IDE**                  | Visual Studio Code         |
| **App Lifecycle**        | N/A              |
| **UI Design**            | Heartwood, ViewControllers |
| **Event Handling**       | Mercury |
| **Data Persistence**     | Data Stores                   |
| **Error Handling**       | Try-Catch Blocks, SpruceErrors |
| **Testing**              | TDD by the 3 laws              |
| **User Authentication**  | Mercury, Authenticator |
| **User Permissions**     | Mercury, Authorizor |

### Programming Language

Spruce is built entirely in Typescript. The example below, a `SkillViewController`, will render a full screen view with a `CardViewController` on it with a title and a subtitle. All ViewControllers (and SkillViewControllers) reduce down to a `ViewModel` that return from render(). In Spruce, 100% of the styling is handled by [Heartwood](../../concepts/views/) ([Storybook](https://storybook.spruce.bot)).

```typescript
import {
   AbstractSkillViewController,
   CardViewController,
   ViewControllerOptions,
   buildSkillViewLayout,
   SkillView
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
   public static id = 'root'
   protected cardVc: CardViewController

   public constructor(options: ViewControllerOptions) {
      super(options)

      this.cardVc = this.Controller('card', {
         header: {
         title: 'Hello, World!',
            subtitle: 'This is a card'
         }
      })
   }

   public render(): SkillView {
      return buildSkillViewLayout('grid', {
         cards: [this.cardVc.render()]
      })
   }
}

```

### IDE

Spruce has been fully integrated into Visual Studio Code. It's free, open-source, and has a large community of developers. It's also the most popular IDE for web development (according to Github Copilot).

<img src="../../assets/img/screenshots/vscode.png">

### App Lifecycle

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.
<img src="../../assets/img/diagrams/skill_view_lifecycle.png">

### UI Design

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```bash
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

### Event Handling

In Spruce, your views are rendered on the edge, while your Skill is hosted on a server. So, you have to use the [Mercury event system](../../concepts/mercury/) to communicate between the two. Mercury also allows you to pass information other skills.

```typescript

// inside of Skill View sending message to the Skill with the namespace "eightbitstories"
const client = await this.connectToApi()
await this.client.emitAndFlattenResponses(
  'eightbitstories.submit-feedback::v2023_09_05',
  {
      payload: {
         feedback: 'Help make this better!', 
      },
  }
)

```

### Data Persistence

In Spruce, you'll use the [Stores](../../concepts/stores/) feature to persist data. The stores use [Schemas](../../concepts/schemas/) to define the shape of the data.

```bash
spruce create.store
```

Once you configure your store, you can use it in your skill's event listener like this:

```typescript
export default async (
   event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {
   const { stores } = event
   const cars = await stores.getStore('cars')

   await cars.createOne({
      make: 'Toyota',
      model: 'Camry',
      year: 2022
   })

   return {
      success: true,
   }
}
```

### Error Handling

Spruce provides a much more robust, standardized error handling system. You can use the [SpruceError](../../concepts/errors/) class to create custom errors, you define the Schemas for those errors to give them shape, and then use try-catch blocks to handle them.

```bash
spruce create.error
```

This will create an error builder inside of your skill at `./src/errors/{errorName}.builder.ts`. Inside there is the schema that defines your error.

You can throw an error you have defined like this:

```typescript
throw new SpruceError({
   code: 'MY_ERRORS_NAME_HERE',
   friendlyMessage: 'All errors can provide a friendly error message!',
})
```

### Testing

Everything in Spruce starts with a [Test](../../concepts/tests/). If you want to write a piece of production code, you must start with a failing test.

```bash
spruce create.test
```

Once your test file is created, you are ready to start!

### User Authentication

Because [Mercury](../../concepts/mercury/) handles user authentication (and authorization). You can use the [Authenticator](../../concepts/permissions/) to know if a person is logged in or not. You can also use it to log a person in or out.

```typescript
//inside your Skill View's load lifecycle method
public async load(options: SkillViewControllerLoadOptions) {
   const { authenticator } = options

   this.log.info(authenticator.isLoggedIn())
   this.log.info(authenticator.getPerson())

   // force person to be logged out
   authenticator.clearSession()
}
```

### User Permissions

Mercury also handles all your [Permission](../../concepts/permissions/) needs. To introduce new permissions into the platform, you need to create a Permission Contract in your skill:

```bash
spruce create.permissions
```

Then you can do permission checks in your Skill View like this:

```typescript
//inside your Skill View's load lifecycle method
public async load(options: SkillViewControllerLoadOptions) {
  const { authorizer } = options

  const canGenerateStory = await authorizer.can({
      contractId: 'eightbitstories.eight-bit-stories',
      permissionIds: ['can-generate-story'],
  })

}
```

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">From Scratch</a>
</div>
