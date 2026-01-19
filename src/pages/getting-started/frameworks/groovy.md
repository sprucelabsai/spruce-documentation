# Transitioning from Groovy to Spruce

Groovy is a dynamic language with static-typing and static compilation capabilities, for the Java platform. It integrates smoothly with any Java program and immediately delivers powerful features, including scripting capabilities, Domain-Specific Language authoring, runtime and compile-time meta-programming, and functional programming. Combined with Grails, a powerful web application framework, Groovy provides a productive full-stack development environment. Transitioning to Spruce, a TypeScript-based framework, involves adapting to a new ecosystem centered around JavaScript and TypeScript for full-stack web development.

## Key Differences between Groovy and Spruce Development

|     | Groovy/Grails             | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Groovy                  | TypeScript               |
| **IDE**                 | IntelliJ IDEA, Eclipse  | Visual Studio Code       |
| **App Lifecycle** | Grails Controllers, Services | SkillViewController lifecycle (optional AppViewController) |
| **UI Design**           | GSP Templates, Grails Views | Heartwood, ViewControllers |
| **Event Handling**      | Grails Events, Spring Events | Mercury                  |
| **Data Persistence**    | GORM                    | Data Stores              |
| **Error Handling**      | Try-Catch Blocks        | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Spock, JUnit            | TDD by the 3 laws        |
| **User Authentication** | Spring Security Plugin  | Mercury, Authenticator   |
| **User Permissions**    | Spring Security ACL     | Mercury, Authorizer      |

### Programming Language

#### Groovy

Groovy offers concise syntax, closures, and dynamic typing while maintaining Java compatibility. Classes and methods are simple and expressive.

```groovy
class HelloController {
    def index() {
        def greeting = 'Hello, World!'
        def subtitle = 'This is a card'

        // Groovy closures
        def renderCard = { title, sub ->
            [title: title, subtitle: sub]
        }

        render(view: 'index', model: renderCard(greeting, subtitle))
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### Groovy in IntelliJ IDEA

IntelliJ IDEA provides excellent Groovy and Grails support with features like code completion, refactoring, and integrated Grails commands.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

### App Lifecycle

#### Groovy/Grails

Grails manages the application lifecycle through controllers, services, and interceptors. Controllers handle requests while services contain business logic.

```groovy
// grails-app/controllers/HelloController.groovy
class HelloController {

    // Injected service
    def helloService

    // Interceptor before action
    def beforeInterceptor = {
        log.info "Request received: ${actionName}"
    }

    def index() {
        def message = helloService.getMessage()
        [message: message]
    }

    def afterInterceptor = { model ->
        log.info "Response sent"
    }
}

// grails-app/services/HelloService.groovy
class HelloService {
    def getMessage() {
        return 'Hello from service!'
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/app-lifecycle.md" %}

### UI Design

#### Groovy/Grails

Grails uses GSP (Groovy Server Pages) for server-side rendering with tag libraries and layouts.

```html
<!-- grails-app/views/layouts/main.gsp -->
<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="My App"/></title>
    <g:layoutHead/>
</head>
<body>
    <g:layoutBody/>
</body>
</html>

<!-- grails-app/views/hello/index.gsp -->
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
</head>
<body>
    <div class="card">
        <h2>${title}</h2>
        <p>${subtitle}</p>
        <g:if test="${showButton}">
            <g:link action="submit" class="btn">Submit</g:link>
        </g:if>
    </div>
</body>
</html>
```

#### Spruce

{% include_raw "../includes/spruce/ui-design.md" %}

### Event Handling

#### Groovy/Grails

Grails provides event handling through the Events plugin and Spring's event system for decoupled communication.

```groovy
// Publishing events
import grails.events.Events

class FeedbackService implements Events {

    def submitFeedback(String feedback) {
        // Process feedback
        saveFeedback(feedback)

        // Publish event
        notify('feedback.submitted', feedback)
    }
}

// Listening to events
import grails.events.annotation.Subscriber

class NotificationService {

    @Subscriber('feedback.submitted')
    def onFeedbackSubmitted(String feedback) {
        log.info "Feedback received: ${feedback}"
        // Send notification, etc.
    }
}

// Using Spring events
import org.springframework.context.event.EventListener

class FeedbackEvent {
    String feedback
}

@EventListener
void handleFeedback(FeedbackEvent event) {
    println "Handling feedback: ${event.feedback}"
}
```

#### Spruce

{% include_raw "../includes/spruce/event-handling.md" %}

### Data Persistence

#### Groovy/Grails

GORM (Grails Object Relational Mapping) provides a powerful, expressive way to interact with databases using domain classes.

```groovy
// grails-app/domain/Car.groovy
class Car {
    String make
    String model
    Integer year

    static constraints = {
        make blank: false, maxSize: 100
        model blank: false, maxSize: 100
        year min: 1900, max: 2100
    }

    static mapping = {
        table 'cars'
        sort year: 'desc'
    }

    String toString() {
        "${year} ${make} ${model}"
    }
}

// Usage in a service or controller
class CarService {
    def createCar() {
        def car = new Car(make: 'Toyota', model: 'Camry', year: 2022)
        car.save(flush: true)
    }

    def findCars() {
        // Dynamic finders
        def toyotas = Car.findAllByMake('Toyota')

        // Criteria queries
        def recentCars = Car.createCriteria().list {
            ge('year', 2020)
            order('year', 'desc')
        }

        // Where queries
        def camrys = Car.where {
            make == 'Toyota' && model == 'Camry'
        }.list()

        return recentCars
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/data-persistence.md" %}

### Error Handling

#### Groovy/Grails

Groovy uses try-catch blocks and Grails provides exception handling through error controllers and custom exceptions.

```groovy
// Custom exception
class CarNotFoundException extends RuntimeException {
    CarNotFoundException(String message) {
        super(message)
    }
}

// Service with error handling
class CarService {
    def getCar(Long id) {
        try {
            def car = Car.get(id)
            if (!car) {
                throw new CarNotFoundException("Car with id ${id} not found")
            }
            return car
        } catch (CarNotFoundException e) {
            log.error e.message
            throw e
        } catch (Exception e) {
            log.error "Unexpected error: ${e.message}"
            throw new RuntimeException("Failed to retrieve car", e)
        }
    }
}

// Error controller (grails-app/controllers/ErrorController.groovy)
class ErrorController {
    def handle404() {
        render(view: '/errors/notFound')
    }

    def handle500() {
        render(view: '/errors/serverError')
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/error-handling.md" %}

### Testing

#### Groovy/Grails

Spock is the preferred testing framework for Groovy, offering expressive BDD-style tests with powerful mocking capabilities.

```groovy
import spock.lang.Specification

class CarServiceSpec extends Specification {

    def carService = new CarService()

    def "should create a new car"() {
        given: "car details"
        def make = 'Toyota'
        def model = 'Camry'
        def year = 2022

        when: "creating the car"
        def car = carService.createCar(make, model, year)

        then: "car is saved with correct values"
        car.id != null
        car.make == make
        car.model == model
        car.year == year
    }

    def "should throw exception when car not found"() {
        when: "fetching non-existent car"
        carService.getCar(999L)

        then: "exception is thrown"
        thrown(CarNotFoundException)
    }

    def "should find cars by make"() {
        given: "multiple cars exist"
        carService.createCar('Toyota', 'Camry', 2022)
        carService.createCar('Honda', 'Accord', 2022)

        expect: "filtering by make works"
        carService.findByMake('Toyota').size() == 1
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/testing.md" %}

### User Authentication

#### Groovy/Grails

The Spring Security plugin provides comprehensive authentication support for Grails applications.

```groovy
// build.gradle
dependencies {
    implementation 'org.grails.plugins:spring-security-core:5.0.0'
}

// grails-app/domain/User.groovy
class User {
    String username
    String password
    boolean enabled = true

    static constraints = {
        username blank: false, unique: true
        password blank: false
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this)*.role
    }
}

// Controller with security
import grails.plugin.springsecurity.annotation.Secured

class DashboardController {

    def springSecurityService

    @Secured(['ROLE_USER'])
    def index() {
        def currentUser = springSecurityService.currentUser
        [user: currentUser]
    }

    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def publicPage() {
        render 'This is public'
    }
}

// Checking authentication in service
class ProfileService {
    def springSecurityService

    def getCurrentUserProfile() {
        if (springSecurityService.isLoggedIn()) {
            def user = springSecurityService.currentUser
            return Profile.findByUser(user)
        }
        return null
    }

    def logout() {
        springSecurityService.logout()
    }
}
```

#### Spruce

{% include_raw "../includes/spruce/user-authentication.md" %}

### User Permissions

#### Groovy/Grails

Spring Security provides role-based and ACL-based permission systems for fine-grained access control.

```groovy
// Role-based permissions
import grails.plugin.springsecurity.annotation.Secured

class StoryController {

    @Secured(['ROLE_AUTHOR'])
    def create() {
        // Only authors can create stories
    }

    @Secured(['ROLE_ADMIN', 'ROLE_AUTHOR'])
    def edit(Long id) {
        // Admins and authors can edit
    }
}

// Checking permissions programmatically
import grails.plugin.springsecurity.SpringSecurityService

class StoryService {

    SpringSecurityService springSecurityService

    def canGenerateStory() {
        def authorities = springSecurityService.principal?.authorities*.authority
        return authorities?.contains('ROLE_STORY_GENERATOR')
    }

    def generateStory() {
        if (!canGenerateStory()) {
            throw new AccessDeniedException('Permission denied')
        }
        // Generate story logic
    }
}

// Using Spring Security expressions
@PreAuthorize("hasRole('ROLE_ADMIN') or #story.author == authentication.name")
def updateStory(Story story) {
    // Only admin or the story author can update
}
```

#### Spruce

{% include_raw "../includes/spruce/user-permissions.md" %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
