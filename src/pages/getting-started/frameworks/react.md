# Transitioning from React to Spruce

React is a library for building user interfaces, primarily focused on the front-end. Spruce is a full-stack framework that uses TypeScript, expanding on the concepts you're familiar with from React and applying them throughout the entire stack. This guide will help you understand how to transition from React's component-based architecture to Spruce's full-stack development approach.

## Key Differences between React and Spruce Development

|     | React                    | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | JavaScript/TypeScript   | TypeScript               |
| **IDE**                 | VS Code, WebStorm       | Visual Studio Code       |
| **App Lifecycle** | Component Lifecycle, Hooks | SkillViewController lifecycle (optional AppViewController) |
| **UI Design**           | JSX, CSS/Styled Components        | Heartwood, ViewControllers |
| **Event Handling**      | Props, Callbacks, Context        | Mercury                  |
| **Data Persistence**    | State management + backend APIs/Storage | Data Stores              |
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

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### React in VS Code

React developers typically use VS Code with extensions like ES7+ React snippets, Prettier, and ESLint.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

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

{% include_raw "../includes/spruce/app-lifecycle.md" %}

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

{% include_raw "../includes/spruce/ui-design.md" %}

### Event Handling

#### React

React handles events through props and callbacks. For cross-component communication, you use Context, Redux, or prop drilling.

{% raw %}
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
{% endraw %}

#### Spruce

{% include_raw "../includes/spruce/event-handling.md" %}

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

{% include_raw "../includes/spruce/data-persistence.md" %}

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

{% include_raw "../includes/spruce/error-handling.md" %}

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

{% include_raw "../includes/spruce/testing.md" %}

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

{% include_raw "../includes/spruce/user-authentication.md" %}

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

{% include_raw "../includes/spruce/user-permissions.md" %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
