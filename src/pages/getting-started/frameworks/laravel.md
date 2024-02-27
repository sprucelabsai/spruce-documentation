---
title: Laravel
---
<style>
  #language-selector {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  #language-selector button {
    background-color: #1a1a1a;
    color: #fff;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 6px 12px; 
    margin: 0 6px; 
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.7em; 
  }

  #language-selector button:hover, #language-selector button:focus {
    background-color: #0EDDD3;
    border-color: #0EDDD3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  #language-selector button:active {
    transform: translateY(2px);
    box-shadow: none;
  }
  table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>

# Transitioning from Laravel to Spruce

Laravel is a PHP framework designed for web application development that follows the MVC (Model-View-Controller) architectural pattern. Spruce, in contrast, is a TypeScript-based framework that also covers full-stack development but leverages JavaScript's ecosystem. This guide will help you draw parallels between familiar Laravel concepts and Spruce's architecture, offering a clear path to apply your existing Laravel skills to Spruce development.

## Key Differences between Laravel and Spruce Development

| Development Aspect       | Laravel                  | Spruce                   |
|--------------------------|--------------------------|--------------------------|
| **Programming Language**  | PHP                      | TypeScript               |
| **Framework**             | Laravel                  | Spruce Framework         |
| **IDE**                  | PHPStorm, others         | Visual Studio Code       |
| **UI Design**            | Blade Templates          | HTML, CSS, JavaScript/TypeScript |
| **Data Management**      | Eloquent ORM             | Schemas                  |
| **Event Handling**       | Events, Broadcasting     | Centralized Event System |
| **API Integration**      | Laravel API Resources    | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**     | SQL with Eloquent        | Various databases with Stores |
| **Error Handling**       | Exception Handling with `try-catch` | Try-Catch Blocks in TypeScript |
| **Testing**              | PHPUnit, Laravel Dusk    | Jest, Mocha              |
| **User Authentication**  | Built-in Auth, Passport  | Token-Based Methods, Web-Based Authentication |

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