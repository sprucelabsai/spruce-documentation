# Transitioning from Groovy to Spruce

Groovy is a dynamic language with static-typing and static compilation capabilities, for the Java platform. It integrates smoothly with any Java program and immediately delivers to your application powerful features, including scripting capabilities, Domain-Specific Language authoring, runtime and compile-time meta-programming and functional programming. Transitioning to Spruce, a TypeScript-based framework, from a Groovy and potentially Grails background involves adapting to a new ecosystem centered around JavaScript and TypeScript for full-stack web development.

## Key Differences between Groovy and Spruce Development

|     | Groovy                   | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Groovy                  | TypeScript               |
| **IDE**                 | IntelliJ IDEA, Eclipse  | Visual Studio Code       |
| **App Lifecycle**       | Controlled by frameworks like Grails | No Equivalent            |
| **UI Design**           | N/A for CLI; Grails for web views | Heartwood, ViewControllers |
| **Event Handling**      | Event listeners in frameworks | Mercury                  |
| **Data Persistence**    | GORM in Grails          | Data Stores              |
| **Error Handling**      | Try-Catch Blocks        | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Spock, JUnit            | TDD by the 3 laws        |
| **User Authentication** | Spring Security (with Grails) | Mercury, Authenticator   |
| **User Permissions**    | Spring Security ACL (with Grails) | Mercury, Authorizor      |

### Programming Language

#### Groovy

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