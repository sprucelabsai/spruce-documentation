# Transitioning from Python to Spruce

Python development often involves using dynamic scripting languages and various frameworks like Django or Flask. Spruce, on the other hand, uses TypeScript. This guide will help you connect your Python expertise to Spruce’s architecture, showing how to adapt and apply your existing skills in a new environment.

## Key Differences between Python and Spruce Development

|     | Python                   | Spruce                  |
|-----------------------|--------------------------|-------------------------|
| **Programming Language** | Python                  | TypeScript              |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code      |
| **App Lifecycle**       | Depends on the framework or context | No Equivalent |
| **UI Design**           | Tkinter for desktop GUI, Frameworks like Django or Flask for web | Heartwood, ViewControllers |
| **Event Handling**      | Event loops in frameworks, Callbacks | Mercury                 |
| **Data Persistence**    | SQLite, SQLAlchemy, Django ORM | Data Stores             |
| **Error Handling**      | Try-Except Blocks       | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Unittest, PyTest        | Jest, Testing Library   |
| **User Authentication** | Depends on the framework; Flask-Login, Django's auth system | Mercury, Authenticator |
| **User Permissions**    | Framework-specific; Django's permission framework, Flask-Principal | Mercury, Authorizor     |

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
placeholder

```

### App Lifecycle

```
placeholder

```

### UI Design

```
placeholder

```

### Event Handling

```
placeholder

```

### Data Persistence

```
placeholder

```

### Error Handling

```
placeholder

```

### Testing

```
placeholder

```

### User Authentication

```
placeholder

```

### User Permissions

```
placeholder

```
