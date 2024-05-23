# Transitioning from Ruby on Rails to Spruce

Ruby on Rails is a full-stack framework that uses Ruby, while Spruce is built on TypeScript. This guide will assist you in drawing parallels between Rails development and Spruce's architecture, helping you understand how to apply your existing Rails knowledge in Spruce.

## Key Differences between Ruby on Rails and Spruce Development

|     | Ruby                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Ruby                     | TypeScript               |
| **IDE**                 | RubyMine, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | No direct equivalent; controlled by frameworks like Rails | No Equivalent            |
| **UI Design**           | N/A for CLI; Rails for web views | Heartwood, ViewControllers |
| **Event Handling**      | Observer pattern, Callbacks in Rails | Mercury                  |
| **Data Persistence**    | ActiveRecord in Rails    | Data Stores              |
| **Error Handling**      | Begin-Rescue             | Try-Catch Blocks, SpruceErrors |
| **Testing**             | RSpec, Minitest          | TDD by the 3 laws        |
| **User Authentication** | Devise (Rails)           | Mercury, Authenticator   |
| **User Permissions**    | Pundit, Cancancan (Rails) | Mercury, Authorizor      |

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
