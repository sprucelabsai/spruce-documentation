# Transitioning from React to Spruce

React is a library for building user interfaces, primarily focused on the front-end. Spruce is a full-stack framework that uses TypeScript, expanding on the concepts you're familiar with from React and applying them throughout the entire stack. This guide will help you understand how to transition from React's component-based architecture to Spruce's full-stack development approach.

## Key Differences between React and Spruce Development

|     | React                    | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | JavaScript/TypeScript   | TypeScript               |
| **IDE**                 | VS Code, WebStorm       | Visual Studio Code       |
| **App Lifecycle**       | Component Lifecycle, Hooks | No Equivalent            |
| **UI Design**           | JSX, CSS Modules        | Heartwood, ViewControllers |
| **Event Handling**      | Synthetic Events        | Mercury                  |
| **Data Persistence**    | State Management (Redux, Context API) | Data Stores              |
| **Error Handling**      | Error Boundaries, Try-Catch in Async Code | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Jest, React Testing Library | TDD by the 3 laws        |
| **User Authentication** | Context API for State Management, Third-Party Services (Auth0, Firebase) | Mercury, Authenticator   |
| **User Permissions**    | Custom Logic, Third-Party Libraries | Mercury, Authorizor      |

### Programming Language

#### iOS

```swift
//
//  ContentView.swift
//  ChatPrototype
//
import SwiftUI


struct ContentView: View {
    var body: some View {
        VStack {
            Text("Knock, knock!")
                .padding()
                .background(Color.teal, in: RoundedRectangle(cornerRadius: 8))
            Text("Who's there?")
                .padding()
                .background(Color.yellow, in: RoundedRectangle(cornerRadius: 8))
        }
        .padding()
    }
}


#Preview {
    ContentView()
}
```

#### Spruce

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

```
Coming soon...

```

### App Lifecycle

```
Coming soon...

```

### UI Design

```
Coming soon...

```

### Event Handling

```
Coming soon...

```

### Data Persistence

```
Coming soon...

```

### Error Handling

```
Coming soon...

```

### Testing

```
Coming soon...

```

### User Authentication

```
Coming soon...

```

### User Permissions

```
Coming soon...

```

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
