---
title: Flask
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

# Transitioning from Flask to Spruce

Flask is a Python web framework that provides the tools necessary for building simple web applications quickly. On the other hand, Spruce is a TypeScript-based full-stack framework designed to create scalable web applications with a focus on modern web development practices. This guide will help Flask developers understand how to transition to Spruce.

## Key Differences between Flask and Spruce Development

| Development Aspect        | Flask                    | Spruce                   |
|---------------------------|--------------------------|--------------------------|
| **Programming Language**   | Python                   | TypeScript               |
| **Framework**              | Flask                    | Spruce Framework         |
| **Template Engine**        | Jinja2                   | HTML, CSS, JavaScript/TypeScript |
| **State Management**       | Flask Global, Flask-Login| Stores with Schemas      |
| **Routing**                | Flask Routing            | Centralized Event System |
| **API Integration**        | Flask RESTful            | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**       | Flask-SQLAlchemy         | Data Stores              |
| **Error Handling**         | Try-Except Blocks        | Try-Catch Blocks in TypeScript |
| **Testing**                | unittest, pytest         | Jest, Mocha              |
| **User Authentication**    | Flask-Login, Flask-JWT   | Token-Based Authentication |

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