# Transitioning from React to Spruce

React is a library for building user interfaces, primarily focused on the front-end. Spruce is a full-stack framework that uses TypeScript, expanding on the concepts you're familiar with from React and applying them throughout the entire stack. This guide will help you understand how to transition from React's component-based architecture to Spruce's full-stack development approach.

## Key Differences between React and Spruce Development

|     | React                    | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | JavaScript/TypeScript   | TypeScript               |
| **IDE**                 | VS Code, WebStorm       | Visual Studio Code       |
| **App Lifecycle**       | Component Lifecycle, Hooks | AppViewController            |
| **UI Design**           | JSX, CSS/Styled Components        | Heartwood, ViewControllers |
| **Event Handling**      | Props, Callbacks, Context        | Mercury                  |
| **Data Persistence**    | State Management (Redux, Zustand) | Data Stores              |
| **Error Handling**      | Error Boundaries, Try-Catch | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Jest, React Testing Library | TDD by the 3 laws        |
| **User Authentication** | Context API, Third-Party (Auth0, Firebase) | Mercury, Authenticator   |
| **User Permissions**    | Custom Logic, Third-Party Libraries | Mercury, Authorizer      |

### Programming Language

#### React

In React, you build UIs using JSX, a syntax extension that combines JavaScript with HTML-like markup. Components are functions that return UI.

```jsx
import React from 'react'

function App() {
  return (
    <div className="app">
      <h1>Hello, World!</h1>
      <p>This is a card</p>
    </div>
  )
}

export default App
```

#### Spruce

This `SkillViewController` will render a full screen view with a `CardViewController` on it with a title and a subtitle. All ViewControllers (and SkillViewControllers) reduce down to a `ViewModel` that return from render(). In Spruce, 100% of the styling is handled by [Heartwood](../../concepts/views/) ([Storybook](https://storybook.spruce.bot)).

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

#### React in VS Code

React developers typically use VS Code with extensions like ES7+ React snippets, Prettier, and ESLint.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

Spruce has been fully integrated into Visual Studio Code with custom extensions, launch configs, and settings.

<img src="../../../assets/img/screenshots/vscode.png">

### App Lifecycle

#### React

React components have a lifecycle managed through hooks like `useEffect`, or class methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
import { useEffect, useState } from 'react'

function MyComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Runs on mount (like componentDidMount)
    fetchData().then(setData)

    return () => {
      // Cleanup on unmount (like componentWillUnmount)
    }
  }, [])

  return <div>{data}</div>
}
```

#### Spruce

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.

<img src="../../../assets/img/concepts/skill_view_lifecycle.png">

### UI Design

#### React

React uses JSX for templating and various styling approaches: CSS modules, styled-components, Tailwind, etc. You have full control over every pixel.

```jsx
import styled from 'styled-components'

const Card = styled.div`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

function MyCard({ title, subtitle }) {
  return (
    <Card>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </Card>
  )
}
```

#### Spruce

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```shell
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

### Event Handling

#### React

React handles events through props and callbacks. For cross-component communication, you use Context, Redux, or prop drilling.

```jsx
import { createContext, useContext } from 'react'

const AppContext = createContext()

function Parent() {
  const handleFeedback = (feedback) => {
    console.log('Feedback:', feedback)
  }

  return (
    <AppContext.Provider value={{ onFeedback: handleFeedback }}>
      <Child />
    </AppContext.Provider>
  )
}

function Child() {
  const { onFeedback } = useContext(AppContext)

  return (
    <button onClick={() => onFeedback('Great app!')}>
      Submit Feedback
    </button>
  )
}
```

#### Spruce

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

#### React

React itself doesn't handle persistence. You typically use state management libraries and API calls, with data stored on a backend.

```jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// With Redux
function CarList() {
  const dispatch = useDispatch()
  const cars = useSelector(state => state.cars)

  const addCar = () => {
    dispatch({
      type: 'ADD_CAR',
      payload: { make: 'Toyota', model: 'Camry', year: 2022 }
    })
  }

  return (
    <div>
      <button onClick={addCar}>Add Car</button>
      {cars.map(car => <div key={car.id}>{car.make}</div>)}
    </div>
  )
}
```

#### Spruce

In Spruce, you'll use the [Stores](../../concepts/stores/) feature to persist data. The stores use [Schemas](../../concepts/schemas/) to define the shape of the data.

```shell
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

#### React

React uses Error Boundaries for component errors and standard try-catch for async operations.

```jsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

#### Spruce

Spruce provides a much more robust, standardized error handling system. You can use the [SpruceError](../../concepts/errors/) class to create custom errors, you define the Schemas for those errors to give them shape, and then use try-catch blocks to handle them.

```shell
spruce create.error
```

This will create an error builder inside of your skill at `./src/errors/{{errorName}}.builder.ts`. Inside there is the schema that defines your error.

You can throw an error you have defined like this:

```typescript
throw new SpruceError({
  code: 'MY_ERRORS_NAME_HERE',
  friendlyMessage: 'All errors can provide a friendly error message!',
})
```

### Testing

#### React

React testing typically uses Jest with React Testing Library for component testing.

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import MyButton from './MyButton'

test('button click updates text', () => {
  render(<MyButton />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(screen.getByText('Clicked!')).toBeInTheDocument()
})
```

#### Spruce

Everything in Spruce starts with a [Test](../../concepts/tests/) If you want to write a piece of production code, you must start with a failing test.

```shell
spruce create.test
```

Once your test file is created, you are ready to start!

### User Authentication

#### React

React doesn't have built-in auth. You typically use libraries like Auth0, Firebase, or custom solutions with Context.

```jsx
import { useAuth0 } from '@auth0/auth0-react'

function Profile() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  if (!isAuthenticated) {
    return <button onClick={loginWithRedirect}>Log In</button>
  }

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  )
}
```

#### Spruce

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

#### React

Permissions in React are typically managed through custom logic, checking user roles/permissions from your auth provider.

```jsx
import { useAuth } from './auth-context'

function AdminPanel() {
  const { user, hasPermission } = useAuth()

  if (!hasPermission('admin:access')) {
    return <div>Access Denied</div>
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin content */}
    </div>
  )
}
```

#### Spruce

Mercury also handles all your [Permission](../../concepts/permissions/) needs. To introduce new permissions into the platform, you need to create a Permission Contract in your skill:

```shell
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

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
