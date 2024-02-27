---
title: Ruby
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

# Transitioning from Ruby on Rails to Spruce

Ruby on Rails is a full-stack framework that uses Ruby, while Spruce is built on TypeScript. This guide will assist you in drawing parallels between Rails development and Spruce's architecture, helping you understand how to apply your existing Rails knowledge in Spruce.

## Key Differences between Ruby on Rails and Spruce Development

| Development Aspect       | Ruby on Rails            | Spruce                   |
|--------------------------|--------------------------|--------------------------|
| **Programming Language**  | Ruby                     | TypeScript               |
| **Framework**             | Rails                    | Spruce Framework         |
| **IDE**                  | RubyMine, Sublime Text, others | Visual Studio Code   |
| **UI Design**            | ERB, Haml, etc.          | HTML, CSS, JavaScript/TypeScript |
| **Data Management**      | Active Record            | Schemas                  |
| **Event Handling**       | Routes, Action Cable     | Centralized Event System |
| **API Integration**      | Rails API Mode           | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**     | SQL-based databases      | Various database support with Stores |
| **Error Handling**       | Exception Handling with `rescue` | Try-Catch Blocks in TypeScript |
| **Testing**              | RSpec, MiniTest          | Jest, Mocha              |
| **User Authentication**  | Devise, OmniAuth         | Token-Based Methods, Web-Based Authentication |

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