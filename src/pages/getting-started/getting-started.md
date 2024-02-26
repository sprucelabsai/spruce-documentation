---
title: Getting Started
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

# Introduction to Getting Started with Spruce
Before you start working with Spruce, it's important to get a feel for how it's different from the programming language or system you're used to. 

In this guide, we'll walk you through what makes Spruce unique compared to other development frameworks. You'll discover how Spruce handles various parts of building an app and find out what you need to know to begin. We've designed this transition section to make your first step into Spruce development as smooth as possible.

## Pre-requisites
Before transitioning to Spruce, you should:
- Have a basic understanding of TypeScript, as this is the core language used in Spruce development.
- Be familiar with full-stack development concepts, including front-end and back-end development processes.

## Choose the Development Platform You're Coming From:

  <div id="language-selector">
    <button data-language="ruby">Ruby</button>
    <button data-language="python">Python</button>
    <button data-language="ios">IOS</button>
    <button data-language="android">Android</button>
    <button data-language="laravel">Laravel</button>
    <button data-language="react">React</button>
    <button data-language="flask">Flask</button>
    <button data-language="django">Django</button>
    <button data-language="spring">Spring</button>
    <button data-language="groovy">Groovy</button>
  </div>

  <div id="content-ruby" class="language-content" style="display:none;">

# Transitioning from Ruby on Rails to Spruce

Ruby on Rails is a full-stack framework that uses Ruby, while Spruce is built on TypeScript. This guide will assist you in drawing parallels between Rails development and Spruce's architecture, helping you understand how to apply your existing Rails knowledge in Spruce.

## Key Differences between Ruby on Rails and Spruce Development

| Ruby on Rails Development | Spruce Development       |
|---------------------------|--------------------------|
| Ruby                      | TypeScript               |
| Rails                     | Visual Studio Code (VS Code) |
| MVC Architecture          | Modular Architecture     |
| Active Record             | Data Stores              |
| Routes and Views          | Events & Mercury Client  |

## Development Essentials Comparison

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

### Front-end

Rails typically uses server-side rendering with embedded Ruby code. Spruce, on the other hand, creates front-end components with HTML, CSS, and TypeScript, utilizing client-side rendering for a dynamic user experience.

### Data Management

Rails developers are familiar with Active Record for data persistence, which uses Ruby classes to represent database tables. In Spruce, you'll use "Schemas" to define your data models in TypeScript, enabling strict type-checking and the use of advanced JavaScript features.

### Event Handling

Rails uses routes to direct HTTP requests to controller actions, and Action Cable for WebSockets. Spruce employs a centralized event system that handles both traditional HTTP requests and real-time operations via events, making it highly interactive and responsive.

### API Integration

In Rails, you might use the API mode to build RESTful APIs, and libraries like Faraday for consuming APIs. Spruce leverages TypeScript to build and consume APIs, offering tight integration between backend services and frontend components.

### Error Handling

Rails has a robust error-handling mechanism with `rescue`. Spruce also provides strong error-handling capabilities with try-catch blocks, which are used to catch exceptions in asynchronous operations.

### Testing

Rails encourages thorough testing with frameworks like RSpec or MiniTest.

### User Authentication and Management

While Rails might use gems like Devise for authentication,

## Building Your First Skill in Spruce

(Link to Chapters)

  </div>
  <div id="content-python" class="language-content" style="display:none;">

# Transitioning from Python to Spruce

Python development often involves using dynamic scripting languages and various frameworks like Django or Flask. Spruce, on the other hand, uses TypeScript. This guide will help you connect your Python expertise to Spruce’s architecture, showing how to adapt and apply your existing skills in a new environment.

## Key Differences between Python and Spruce Development

| Python Development    | Spruce Development      |
|-----------------------|-------------------------|
| Python                | TypeScript              |
| Django/Flask          | Visual Studio Code (VS Code) |
| Models/Views/Templates| ViewController         |
| Django ORM            | Data Stores             |
| Django URLs           | Events & Mercury Client |

## Development Essentials

| Development Aspect       | Python                  | Spruce                   |
|--------------------------|-------------------------|--------------------------|
| **Programming Language**  | Python                  | TypeScript               |
| **IDE**                  | PyCharm, others         | Visual Studio Code       |
| **UI Design**            | Templates (Django/Flask)| HTML, CSS, JavaScript/TypeScript |
| **Data Management**      | Django ORM, SQLAlchemy  | Schemas                  |
| **Event Handling**       | URL Routing             | Centralized Event System |
| **API Integration**      | Django REST Framework, Flask | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**     | SQLite, PostgreSQL, others | Stores                   |
| **Error Handling**       | Try-Except Blocks       | Try-Catch Blocks in TypeScript |
| **Testing**              | unittest, pytest        | Jest, Mocha              |
| **User Authentication**  | Django Authentication System, Flask-Login | Token-Based Methods, Web-Based Authentication |

### Front-end

Python web frameworks often use templating engines to render HTML. In Spruce, you'll craft user interfaces with HTML, CSS, and TypeScript, providing a more interactive and dynamic user experience through modern web technologies.

### Data Management

If you're familiar with Python's ORMs, you'll find Spruce's "Schemas" for data modeling to be a similar concept but with a focus on TypeScript's type safety and the flexibility of JavaScript's ecosystem.

### Event Handling

Python web frameworks handle HTTP requests through URL routing, while Spruce uses a centralized event system that allows different parts of the application to communicate more dynamically.

### API Integration

API creation and consumption are core to both Python and Spruce development. While Python uses frameworks like Django REST Framework, Spruce leverages TypeScript and the Mercury Client for APIs, providing real-time capabilities.

### Data Persistence

Python's ORM systems like Django's models and Flask's SQLAlchemy extensions provide data persistence. Spruce has "Stores," which abstract database interactions and allow for a variety of databases and more flexible data handling.

### Error Handling

Error handling in Python is done with try-except blocks. Spruce uses a similar construct with try-catch blocks in TypeScript, accommodating JavaScript and TypeScript's asynchronous nature.

### Testing

Testing in Python can be performed with frameworks like unittest and pytest. In Spruce, testing is carried out with Jest and Mocha, which are used for full-stack testing across both front-end and back-end.

### User Authentication and Management

Python frameworks often come with built-in user authentication systems. Spruce handles authentication with modern web-based methods like JWT, focusing on token-based strategies suitable for Single Page Applications (SPAs) and other web architectures.

## Building Your First Skill in Spruce

To create a skill in Spruce, you'll follow a similar process to setting up a new Python project but with a focus on TypeScript:

1. **Initialize Your Skill**: Use the Spruce CLI to create a new skill:

   ```bash
   spruce create.skill my-first-skill
   ```

2. **Project Structure**: Get to know how Spruce organizes front-end and back-end code.

3. **Developing Front-end Components**: Build the user interface using web technologies, in contrast to Python's server-side templates.

4. **Implementing Back-end Services**: Write server-side logic to manage data and processes.

By combining these components, you'll develop comprehensive skills within the Spruce ecosystem.

  </div>
  <div id="content-ios" class="language-content" style="display:block;">
    
# Transitioning from iOS to Spruce

Modern iOS development primarily uses Swift, Spruce on the other hand, is a TypeScript-based framework. The following guide will help you draw parallels between familiar iOS concepts and Spruce’s architecture, and provide a clear understanding of how your existing skills can be adapted and applied in Spruce.

## Key Differences between iOS and Spruce Development

|     | iOS                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Swift/Objective-C        | TypeScript               |
| **IDE**                 | Xcode                    | Visual Studio Code       |
| **App Lifecycle**                 | AppDelegate                    | No Equivalent       |
| **UI Design**           | SwiftUI, ViewControllers            | Heartwood, ViewControllers |
| **Event Handling**      | Delegates, NotificationCenter, Target-Action | Mercury |
| **Data Persistence**    | Core Data, UserDefaults  | Data Stores                   |
| **Error Handling**      | NSError, Error Protocol, Try-Catch Blocks | Try-Catch Blocks, SpruceErrors |
| **Testing**             | XCTest                   | TDD by the 3 laws              |
| **User Authentication** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authenticator |
| **User Permissions** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authorizor |

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

### App Lifecycle

### UI Design

### Event Handling

### Data Persistence

### Error Handling

### Testing             

### User Authentication

### User Permissions

    
  </div>
  <div id="content-android" class="language-content" style="display:none;">

# Transitioning from Android to Spruce

Android development typically involves Java or Kotlin, while Spruce is a TypeScript-based framework. This guide will help you connect your knowledge of Android development to Spruce's architecture, showing you how to adapt your existing skills to the Spruce environment.

## Key Differences between Android and Spruce Development

| Android Development   | Spruce Development       |
|-----------------------|--------------------------|
| Java/Kotlin           | TypeScript               |
| Android Studio        | Visual Studio Code (VS Code) |
| Activities/Fragments  | ViewController          |
| SQLite/Room           | Data Stores              |
| Intents               | Events & Mercury Client  |

## Development Essentials

| Development Aspect     | Android                  | Spruce                   |
|------------------------|--------------------------|--------------------------|
| **Programming Language** | Java/Kotlin              | TypeScript               |
| **IDE**                  | Android Studio           | Visual Studio Code       |
| **UI Design**            | XML Layouts              | HTML, CSS, JavaScript/TypeScript |
| **Data Management**      | SQLite/Room              | Schemas                  |
| **Event Handling**       | Intents                  | Centralized Event System |
| **API Integration**      | Retrofit/OkHttp          | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**     | SharedPreferences        | Stores                   |
| **Error Handling**       | Try-Catch Blocks         | Try-Catch Blocks in TypeScript |
| **Testing**              | JUnit, Espresso          | Jest, Mocha              |
| **User Authentication**  | OAuth, Firebase Auth     | Token-Based Methods, Web-Based Authentication |

### Front-end

In Android, you create user interfaces using XML layouts. In Spruce, you use HTML, CSS, and TypeScript to build web interfaces. These web technologies enable you to craft responsive and interactive user experiences.

### Data Management

As an Android developer, you may have used SQLite or Room for data management. Spruce uses "Schemas" to define data models, offering a flexible way to manage data that is typical in web development.

### Event Handling

Where Android uses Intents for navigating and communicating between app components, Spruce employs a centralized event system. This approach supports a modular structure and facilitates the flow of real-time data.

### API Integration

While Android developers might use libraries like Retrofit for API integration, Spruce developers work with APIs using TypeScript, making HTTP requests and managing real-time connections with the Mercury Client.

### Data Persistence

Instead of SharedPreferences or a database like SQLite, Spruce uses "Stores" to manage data persistence. This method suits the nature of web applications, allowing for more adaptable data storage solutions.

### Error Handling

Android's error handling mechanisms are somewhat mirrored in Spruce, where try-catch blocks in TypeScript are employed to manage errors, especially within asynchronous operations.

### Testing

Testing in Android might involve frameworks like JUnit or Espresso. In Spruce, you'll use Jest or Mocha for testing. These frameworks are designed for JavaScript/TypeScript and are used to test both front-end and back-end code.

### User Authentication and Management

Android might use various methods for authentication, including OAuth and Firebase. Spruce handles authentication with token-based methods like JWT, aligning with practices common in web development.

## Building Your First Skill in Spruce

Creating your first Spruce skill involves:

1. **Initializing Your Skill**: Use the Spruce CLI to create a new skill, similar to starting a new Android project:

   ```bash
   spruce create.skill my-first-skill
   ```

2. **Project Structure**: Understand how Spruce separates concerns into front-end and back-end.

3. **Developing Front-end Components**: Craft the user interface with HTML, CSS, and TypeScript.

4. **Implementing Back-end Services**: Develop server-side logic to handle data and processes.

By integrating these components, you'll develop comprehensive skills in the Spruce ecosystem.

  </div>
  <div id="content-laravel" class="language-content" style="display:none;">

# Transitioning from Laravel to Spruce

Laravel is a PHP framework designed for web application development that follows the MVC (Model-View-Controller) architectural pattern. Spruce, in contrast, is a TypeScript-based framework that also covers full-stack development but leverages JavaScript's ecosystem. This guide will help you draw parallels between familiar Laravel concepts and Spruce's architecture, offering a clear path to apply your existing Laravel skills to Spruce development.

## Key Differences between Laravel and Spruce Development

| Laravel Development      | Spruce Development      |
|--------------------------|-------------------------|
| PHP                      | TypeScript              |
| Laravel (PHP framework)  | Visual Studio Code (VS Code) |
| MVC Architecture         | Modular Architecture    |
| Eloquent ORM             | Data Stores             |
| Blade Templates          | Component-Based Views   |
| Artisan CLI              | Spruce CLI              |
| RESTful Controllers      | Events & Mercury Client |

## Development Essentials

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

### Front-end

In Laravel, you use Blade templates for server-side HTML rendering. In Spruce, you'll create interactive user interfaces using HTML, CSS, and TypeScript, embracing the reactive programming model for client-side rendering.

### Data Management

Laravel's Eloquent ORM allows for active record style database interaction, using PHP models to represent database tables. Spruce uses "Schemas" to define data structures within a TypeScript context, providing type safety and leveraging JavaScript's flexible data handling capabilities.

### Event Handling

Laravel uses a combination of routes and event broadcasting for server-side event handling. Spruce introduces a centralized event system that orchestrates interactions across the application, allowing for more dynamic client-server communication.

### API Integration

Building APIs in Laravel often involves using API resources for RESTful controllers. Spruce, through TypeScript, offers robust options for both creating and consuming APIs, enabling real-time data exchange with the Mercury Client.

### Error Handling

Exception handling in Laravel is managed globally and can be customized for different exception types. In Spruce, error handling is performed using try-catch blocks in TypeScript, which is particularly useful for handling asynchronous code patterns.

### Testing

Laravel provides a feature-rich testing environment with PHPUnit and Laravel Dusk for browser tests. Spruce also places a strong emphasis on testing, employing frameworks like Jest for unit testing and Mocha for end-to-end tests, covering both the frontend and backend.

### User Authentication and Management

Laravel's built-in authentication features and packages like Passport provide a robust system for managing user sessions and authenticating requests. Spruce opts for a token-based authentication approach, common in modern web applications, which aligns with single-page application (SPA) patterns.

## Building Your First Skill in Spruce
    
  </div>
  <div id="content-react" class="language-content" style="display:none;">

# Transitioning from React to Spruce

React is a library for building user interfaces, primarily focused on the front-end. Spruce is a full-stack framework that uses TypeScript, expanding on the concepts you're familiar with from React and applying them throughout the entire stack. This guide will help you understand how to transition from React's component-based architecture to Spruce's full-stack development approach.

## Key Differences between React and Spruce Development

| React Development        | Spruce Development      |
|--------------------------|-------------------------|
| JavaScript/TypeScript    | TypeScript              |
| React (UI library)       | Spruce (Full-stack framework) |
| Component State & Redux  | Stores                  |
| React Router             | Events & Mercury Client |
| Context API              | Full-Stack Context      |

## Development Essentials

| Development Aspect        | React                    | Spruce                   |
|---------------------------|--------------------------|--------------------------|
| **Programming Language**   | JavaScript/TypeScript    | TypeScript               |
| **Library/Framework**      | React.js                 | Spruce Framework         |
| **State Management**       | Component State, Redux   | Stores with Schemas      |
| **Routing**               | React Router             | Centralized Event System |
| **API Integration**       | Fetch API, Axios         | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**      | Local State, Context API | Data Stores              |
| **Error Handling**        | Error Boundaries         | Try-Catch Blocks in TypeScript |
| **Testing**               | Jest, React Testing Library | Jest, Mocha             |
| **User Authentication**   | Context API, Auth0       | Token-Based Authentication |

### Front-end

React developers are used to creating components for their UI, managing state internally or with state management libraries like Redux. In Spruce, while the concept of components remains, it is extended with "Skills" that include both front-end and back-end logic, all within TypeScript's statically-typed environment.

### Data Persistence

In React, data is often fetched from an API and stored within component state or global state. Spruce introduces "Stores," which manage data persistence in a more integrated way, connecting directly to the backend and providing a seamless data management experience.

### Event Handling

React apps typically handle user interactions and component communication through a combination of state and props. Spruce uses a centralized event system, allowing for more complex and scalable interactions across the full-stack application.

### API Integration

Making API calls in React usually involves the Fetch API or libraries like Axios. Spruce also relies on API calls for server-client communication, but these are handled through Spruce's backend services and the Mercury Client for real-time capabilities.

### Error Handling

React has mechanisms like error boundaries to handle errors gracefully. Spruce uses try-catch blocks to manage errors, which is a familiar pattern for JavaScript developers but applied across both client and server sides.

### Testing

Testing in React is often done with tools like Jest and the React Testing Library. Spruce uses similar tools, such as Jest, but the testing scope is expanded to include backend services in addition to front-end components.

### User Authentication and Management

Authentication in React might use context for state management or libraries like Auth0 for handling user authentication. Spruce employs a token-based authentication system, a common approach for full-stack applications that manage user sessions and security across both server and client.

## Building Your First Skill in Spruce

  </div>
  <div id="content-flask" class="language-content" style="display:none;">

# Transitioning from Flask to Spruce

Flask is a Python web framework that provides the tools necessary for building simple web applications quickly. On the other hand, Spruce is a TypeScript-based full-stack framework designed to create scalable web applications with a focus on modern web development practices. This guide will help Flask developers understand how to transition to Spruce.

## Key Differences between Flask and Spruce Development

| Flask Development        | Spruce Development      |
|--------------------------|-------------------------|
| Python                   | TypeScript              |
| Flask (Python framework) | Visual Studio Code (VS Code) |
| Minimalistic Framework   | Full-Stack Framework    |
| Jinja Templates          | Component-Based Views   |
| Flask CLI                | Spruce CLI              |
| Flask Routing            | Events & Mercury Client |

## Development Essentials

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

### Front-end

In Flask, you might use Jinja templates for server-side HTML rendering. In Spruce, you'll create interactive user interfaces using HTML, CSS, and TypeScript, embracing the reactive programming model for client-side rendering.

### Data Persistence

Flask developers may use Flask-SQLAlchemy for ORM-based data handling. In Spruce, "Stores" and "Schemas" provide a structured and type-safe approach to data modeling and persistence, integrating seamlessly with the backend.

### Event Handling

Flask uses URL routing to map HTTP requests to Python functions. Spruce introduces a centralized event system that facilitates communication across different parts of the application, allowing for more interactive and scalable interactions.

### API Integration

While Flask might include extensions for creating RESTful APIs, Spruce leverages TypeScript to build and consume APIs, extending both the server and client-side capabilities for a full-stack development experience.

### Error Handling

Error handling in Flask is achieved through Python's try-except blocks. Spruce uses a similar pattern with try-catch blocks in TypeScript, catering to both synchronous and asynchronous code patterns.

### Testing

Testing in Flask can be done with Python's unittest or pytest libraries. Spruce uses Jest and Mocha for testing, aligning with JavaScript's testing ecosystem, and covers testing for both frontend and backend logic.

### User Authentication and Management

Flask's approach to user authentication may involve extensions like Flask-Login or Flask-JWT. In Spruce, authentication is handled using token-based methods, which is a common strategy for modern web applications that manage user sessions and security across both server and client sides.

## Building Your First Skill in Spruce

  </div>
  <div id="content-django" class="language-content" style="display:none;">

# Transitioning from Django to Spruce

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Spruce is a TypeScript-based framework that offers full-stack development capabilities. This guide will help Django developers understand how to transition their skills to work with Spruce.

## Key Differences between Django and Spruce Development

| Django Development        | Spruce Development      |
|---------------------------|-------------------------|
| Python                    | TypeScript              |
| Django (Python framework) | Visual Studio Code (VS Code) |
| Django ORM                | Data Stores             |
| Django Templates          | Component-Based Views   |
| Django URLs and Views     | Events & Mercury Client |

## Development Essentials

| Development Aspect        | Django                   | Spruce                   |
|---------------------------|--------------------------|--------------------------|
| **Programming Language**   | Python                   | TypeScript               |
| **Framework**              | Django                   | Spruce Framework         |
| **Template Engine**        | Django Templates         | HTML, CSS, JavaScript/TypeScript |
| **ORM**                    | Django ORM               | Data Stores with Schemas |
| **Routing**                | Django URL Dispatcher    | Centralized Event System |
| **API Integration**        | Django REST Framework    | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**       | SQL Databases with ORM   | Flexible Data Stores     |
| **Error Handling**         | Exception Handling       | Try-Catch Blocks in TypeScript |
| **Testing**                | Django Test Suite        | Jest, Mocha              |
| **User Authentication**    | Django Authentication    | Token-Based Authentication |

### Front-end

Django employs server-side rendering with templates for creating the user interface. In Spruce, you'll be working with TypeScript to create components that render on the client side, providing an interactive and dynamic user experience.

### Data Persistence

The Django ORM allows developers to interact with databases using Python code. Spruce uses "Stores" to manage application data, which provide a similar level of abstraction but use TypeScript for a more type-safe development experience.

### Event Handling

Django relies on its URL dispatcher to map requests to view functions. Spruce, however, uses an event-driven architecture that allows for more flexible communication between different parts of the application.

### API Integration

Django REST Framework is often used to build APIs in Django. Spruce also integrates API functionality but extends it to a full-stack context, using TypeScript for both server-side and client-side interactions.

### Error Handling

Django handles errors through middleware and custom exception classes. Spruce adopts a similar strategy with try-catch blocks in TypeScript, suitable for handling both synchronous and asynchronous errors.

### Testing

Testing in Django is conducted using its built-in test framework, with a focus on server-side testing. Spruce tests both the frontend and backend using JavaScript testing frameworks like Jest and Mocha.

### User Authentication and Management

Django has a robust authentication system that manages users and sessions. Spruce approaches authentication with token-based methods, which are often used in modern web development to manage sessions and user state.

## Building Your First Skill in Spruce

  </div>
  <div id="content-spring" class="language-content" style="display:none;">

# Transitioning from Spring to Spruce

Spring is a framework for creating complex, enterprise-level applications in Java. It provides a wide range of functionalities, from dependency injection to security, and much more. Spruce, on the other hand, is a TypeScript-based framework designed for building scalable web applications. This guide will help Spring developers understand how to transition to Spruce.

## Key Differences between Spring and Spruce Development

| Spring Development        | Spruce Development      |
|---------------------------|-------------------------|
| Java                      | TypeScript              |
| Spring Framework          | Visual Studio Code (VS Code) |
| Spring MVC                | Modular Architecture    |
| Spring Data JPA           | Data Stores             |
| Spring Security           | Token-Based Authentication |
| Spring Boot CLI           | Spruce CLI              |

## Development Essentials

| Development Aspect        | Spring                   | Spruce                   |
|---------------------------|--------------------------|--------------------------|
| **Programming Language**   | Java                     | TypeScript               |
| **Framework**              | Spring Framework         | Spruce Framework         |
| **ORM**                    | Hibernate, JPA           | Data Stores with Schemas |
| **MVC Architecture**       | Spring MVC               | Component-Based Views    |
| **Security**               | Spring Security          | Token-Based Authentication |
| **API Integration**        | REST Controllers         | HTTP Requests, Sockets via Mercury Client |
| **Error Handling**         | Global Exception Handling | Try-Catch Blocks in TypeScript |
| **Testing**                | JUnit, Mockito           | Jest, Mocha              |
| **Routing**                | Spring MVC Routing       | Centralized Event System |

### Front-end

Spring MVC is used for server-side rendering, typically with JSPs or Thymeleaf. In contrast, Spruce focuses on client-side rendering with TypeScript, leveraging modern web technologies for a dynamic user experience.

### Data Persistence

Spring Data JPA provides a rich set of features for ORM-based data access. Spruce uses "Stores" to manage data, which abstracts database interactions in a more flexible manner, allowing for both SQL and NoSQL databases.

### MVC and Architecture

Spring follows the MVC pattern, separating the application into models, views, and controllers. Spruce introduces a modular architecture with "Skills," which are self-contained units of functionality that can include both front-end and back-end logic.

### Security

Spring Security offers comprehensive security features. Spruce handles security through token-based authentication, commonly using JWTs, aligning with modern web application practices.

### Routing and Event Handling

Spring MVC provides powerful routing capabilities. Spruce, however, uses an event-driven model to facilitate communication between different parts of the application, offering a flexible approach to building interactive web apps.

### API Integration

Creating RESTful APIs in Spring is straightforward with Spring REST Controllers. Spruce also supports API integration, focusing on full-stack development and enabling seamless communication between the backend and frontend.

### Error Handling

Spring has a sophisticated mechanism for handling exceptions globally. In Spruce, error handling is achieved with try-catch blocks, accommodating synchronous and asynchronous JavaScript/TypeScript code.

### Testing

Testing in Spring is supported by JUnit and Mockito for unit and integration tests. Spruce utilizes Jest and Mocha for testing, covering both the frontend and backend parts of the application.

### User Authentication and Session Management

Spring Security provides session-based authentication and authorization. Spruce moves towards a token-based authentication model, which is more suited to single-page applications (SPAs) and APIs.

## Building Your First Skill in Spruce

  </div>
  <div id="content-groovy" class="language-content" style="display:none;">

# Transitioning from Groovy to Spruce

Groovy is a dynamic language with static-typing and static compilation capabilities, for the Java platform. It integrates smoothly with any Java program and immediately delivers to your application powerful features, including scripting capabilities, Domain-Specific Language authoring, runtime and compile-time meta-programming and functional programming. Transitioning to Spruce, a TypeScript-based framework, from a Groovy and potentially Grails background involves adapting to a new ecosystem centered around JavaScript and TypeScript for full-stack web development.

## Key Differences between Groovy and Spruce Development

| Groovy Development        | Spruce Development      |
|---------------------------|-------------------------|
| Groovy/Java               | TypeScript              |
| Grails (Groovy framework) | Visual Studio Code (VS Code) |
| GORM for ORM              | Data Stores             |
| Groovy Server Pages (GSP) | Component-Based Views   |
| Grails Controllers        | Events & Mercury Client |

## Development Essentials

| Development Aspect        | Groovy                   | Spruce                   |
|---------------------------|--------------------------|--------------------------|
| **Programming Language**   | Groovy/Java              | TypeScript               |
| **Framework**              | Grails                   | Spruce Framework         |
| **ORM**                    | GORM                     | Data Stores with Schemas |
| **MVC Architecture**       | Grails MVC               | Modular Architecture     |
| **Template Engine**        | GSP                      | HTML, CSS, JavaScript/TypeScript |
| **API Integration**        | Grails REST Controllers  | HTTP Requests, Sockets via Mercury Client |
| **Data Persistence**       | SQL/NoSQL with GORM      | Flexible Data Stores     |
| **Error Handling**         | Exception Handling       | Try-Catch Blocks in TypeScript |
| **Testing**                | Spock, JUnit             | Jest, Mocha              |
| **Routing**                | URLMappings              | Centralized Event System |

### Front-end

In Grails, you might have used GSP for server-side rendering. Spruce, however, focuses on client-side rendering with TypeScript, leveraging modern web technologies to create dynamic and interactive user interfaces.

### Data Persistence

GORM in Grails provides a robust ORM layer for data access. Spruce introduces "Stores" for data management, offering a structured approach with TypeScript schemas for defining data models, accommodating both SQL and NoSQL databases.

### MVC and Architecture

Grails follows the MVC pattern, organizing code into models, views, and controllers. Spruce employs a modular architecture where functionalities are encapsulated into "Skills," combining both front-end and back-end logic, and moving beyond traditional MVC structures.

### API Integration

While Grails facilitates building RESTful APIs with its controllers, Spruce extends API integration to the full-stack, utilizing TypeScript for defining APIs that serve both the client and server sides.

### Error Handling

Error management in Grails might involve exception handling mechanisms provided by the framework. In Spruce, error handling is achieved through try-catch blocks in TypeScript, including handling errors in asynchronous operations.

### Testing

Testing frameworks like Spock are popular in the Groovy ecosystem for their expressive syntax. Transitioning to Spruce involves adopting JavaScript testing frameworks like Jest and Mocha, focusing on testing across both the front-end and back-end.

### Routing and Event Handling

Grails uses a convention-over-configuration approach to route HTTP requests to controllers. Spruce, however, leverages an event-driven model, using events to facilitate interactions between different parts of the application, providing a more decoupled and scalable architecture.

### User Authentication and Session Management

In Grails, plugins like Spring Security provide comprehensive security features, including authentication and authorization. Spruce approaches security with a modern web perspective, utilizing token-based authentication (e.g., JWT) and focusing on integrating authentication flows across both the front-end and back-end.

## Building Your First Skill in Spruce

</div>