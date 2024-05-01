---
title: Transitioning from Android to Spruce
---

Android development typically involves Java or Kotlin, while Spruce is a TypeScript-based platform. 

While Android focuses on front-end and does support directly implementing some backend type functionality, most times an Android app is communicating with a remote API to do it's work. Spruce, on the other hand, is a "full-stack platform" that allows for both beautiful UI's and robust back-ends.

This guide will help you connect your knowledge of Android development to Spruce's architecture, showing you how to adapt your existing skills to the Spruce environment.

## Key Differences between Android and Spruce Development

|     | Android                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Java/Kotlin        | TypeScript               |
| **IDE**                 | Android Studio                    | Visual Studio Code       |
| **App Lifecycle**                 | Application Class, Activities, Services, etc.                    | No Equivalent       |
| **UI Design**           | Activities, Fragments            | Heartwood, ViewControllers |
| **Event Handling**      | Broadcast Receivers, LocalBroadcastManager | Mercury |
| **Data Persistence**    | Core Data, UserDefaults  | Data Stores                   |
| **Error Handling**      | NSError, Error Protocol, Try-Catch Blocks | Try-Catch Blocks, SpruceErrors |
| **Testing**             | XCTest                   | TDD by the 3 laws              |
| **User Authentication** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authenticator |
| **User Permissions** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authorizor |

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