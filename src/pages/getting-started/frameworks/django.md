---
title: Transitioning from Django to Spruce
---

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Spruce is a TypeScript-based framework that offers full-stack development capabilities. This guide will help Django developers understand how to transition their skills to work with Spruce.

## Key Differences between Django and Spruce Development

|     | Django                   | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Python                  | TypeScript               |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | Managed by Django       | No Equivalent            |
| **UI Design**           | Django Templates        | Heartwood, ViewControllers |
| **Event Handling**      | Signals                 | Mercury                  |
| **Data Persistence**    | Django ORM              | Data Stores              |
| **Error Handling**      | Try-Except Blocks       | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Django's Test Framework | TDD by the 3 laws        |
| **User Authentication** | Django's Authentication System | Mercury, Authenticator   |
| **User Permissions**    | Django's Permission Framework | Mercury, Authorizor      |

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