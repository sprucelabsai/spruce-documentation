# Transitioning from Laravel to Spruce

Laravel is a PHP framework designed for web application development that follows the MVC (Model-View-Controller) architectural pattern. Spruce, in contrast, is a TypeScript-based framework that also covers full-stack development but leverages JavaScript's ecosystem. This guide will help you draw parallels between familiar Laravel concepts and Spruce's architecture, offering a clear path to apply your existing Laravel skills to Spruce development.

## Key Differences between Laravel and Spruce Development

|     | Laravel                  | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | PHP                      | TypeScript               |
| **IDE**                 | PhpStorm, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | Lifecycle managed by Laravel | No Equivalent            |
| **UI Design**           | Blade Templates          | Heartwood, ViewControllers |
| **Event Handling**      | Events and Listeners     | Mercury                  |
| **Data Persistence**    | Eloquent ORM             | Data Stores              |
| **Error Handling**      | Try-Catch Blocks, Error Handling Mechanisms in Laravel | Try-Catch Blocks, SpruceErrors |
| **Testing**             | PHPUnit, Laravel Dusk    | TDD by the 3 laws        |
| **User Authentication** | Built-in Auth, Sanctum, Passport | Mercury, Authenticator   |
| **User Permissions**    | Gates and Policies       | Mercury, Authorizor      |

### Programming Language

#### Laravel

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