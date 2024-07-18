# Transitioning from Android to Spruce

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

#### Android

```
Coming soon...
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


<a href="https://forms.gle/2ZMtwUxg1egV8sHT8" class="btn">Request Documentation</a>