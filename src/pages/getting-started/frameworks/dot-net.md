# Transitioning from .NET to Spruce

Coming soon...

## Key Differences between .NET and Spruce Development

|     | Python                   | Spruce                  |
|-----------------------|--------------------------|-------------------------|
| **Programming Language** | ***                  | TypeScript              |
| **IDE**                 | ***        | Visual Studio Code      |
| **App Lifecycle**       | *** | No Equivalent |
| **UI Design**           | ***| Heartwood, ViewControllers |
| **Event Handling**      | *** | Mercury                 |
| **Data Persistence**    | *** | Data Stores             |
| **Error Handling**      | ***      | Try-Catch Blocks, SpruceErrors |
| **Testing**             | ***        | Jest, Testing Library   |
| **User Authentication** | *** | Mercury, Authenticator |
| **User Permissions**    | *** | Mercury, Authorizor     |

### Programming Language

#### .NET

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