# Transitioning from Flask to Spruce

Flask is a Python web framework that provides the tools necessary for building simple web applications quickly. On the other hand, Spruce is a TypeScript-based full-stack framework designed to create scalable web applications with a focus on modern web development practices. This guide will help Flask developers understand how to transition to Spruce.

## Key Differences between Flask and Spruce Development

|     | Flask                    | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Python                  | TypeScript               |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | Managed by Flask        | No Equivalent            |
| **UI Design**           | Jinja2 Templates        | Heartwood, ViewControllers |
| **Event Handling**      | Routes and View Functions | Mercury                  |
| **Data Persistence**    | SQLAlchemy, Flask-SQLAlchemy | Data Stores              |
| **Error Handling**      | Try-Except Blocks, Error Handlers | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Flask Testing, PyTest   | TDD by the 3 laws        |
| **User Authentication** | Flask-Login, Flask-Security | Mercury, Authenticator   |
| **User Permissions**    | Flask-Principal, Custom Decorators | Mercury, Authorizor      |

### Programming Language

#### Flask

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

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>