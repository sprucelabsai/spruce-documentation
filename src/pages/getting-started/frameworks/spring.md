# Transitioning from Spring to Spruce

Spring is a framework for creating complex, enterprise-level applications in Java. It provides a wide range of functionalities, from dependency injection to security, and much more. Spruce, on the other hand, is a TypeScript-based framework designed for building scalable web applications. This guide will help Spring developers understand how to transition to Spruce.

## Key Differences between Spring and Spruce Development

|     | Spring                   | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Java                    | TypeScript               |
| **IDE**                 | IntelliJ IDEA, Eclipse, STS | Visual Studio Code       |
| **App Lifecycle**       | Managed by Spring Framework | No Equivalent            |
| **UI Design**           | Thymeleaf, JSP          | Heartwood, ViewControllers |
| **Event Handling**      | Spring Events           | Mercury                  |
| **Data Persistence**    | Spring Data JPA         | Data Stores              |
| **Error Handling**      | Exception Handling in Spring | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Spring Testing, JUnit   | TDD by the 3 laws        |
| **User Authentication** | Spring Security         | Mercury, Authenticator   |
| **User Permissions**    | Spring Security, Method Security | Mercury, Authorizor      |

### Programming Language

#### Spring

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