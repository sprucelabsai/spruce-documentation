# Transitioning from Django to Spruce

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

#### Django

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