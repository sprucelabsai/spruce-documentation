# Transitioning from Python to Spruce

Python development often involves dynamic scripting and various frameworks like Django or Flask. Spruce, on the other hand, uses TypeScript. This guide will help you connect your Python expertise to Spruce's architecture, showing how to adapt and apply your existing skills in a new environment.

## Key Differences between Python and Spruce Development

|     | Python                   | Spruce                  |
|-----------------------|--------------------------|-------------------------|
| **Programming Language** | Python                  | TypeScript              |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code      |
| **App Lifecycle**       | Framework-dependent (Django, Flask) | AppViewController |
| **UI Design**           | Jinja2 templates, Django templates | Heartwood, ViewControllers |
| **Event Handling**      | Signals (Django), Callbacks | Mercury                 |
| **Data Persistence**    | SQLAlchemy, Django ORM, SQLite | Data Stores             |
| **Error Handling**      | Try-Except Blocks       | Try-Catch Blocks, SpruceErrors |
| **Testing**             | unittest, pytest        | TDD by the 3 laws   |
| **User Authentication** | Django Auth, Flask-Login | Mercury, Authenticator |
| **User Permissions**    | Django permissions, custom logic | Mercury, Authorizer     |

### Programming Language

#### Python

Python uses dynamic typing and indentation-based syntax. Here's a simple Flask app:

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html',
        title='Hello, World!',
        subtitle='This is a card'
    )

if __name__ == '__main__':
    app.run()
```

#### Spruce

This `SkillViewController` will render a full screen view with a `CardViewController` on it with a title and a subtitle. All ViewControllers (and SkillViewControllers) reduce down to a `ViewModel` that return from render(). In Spruce, 100% of the styling is handled by [Heartwood](../../concepts/views/) ([Storybook](https://storybook.spruce.bot)).

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
         subtitle: 'This is a card'
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

#### Python in PyCharm/VS Code

Python developers typically use PyCharm or VS Code with Python extensions for linting, debugging, and IntelliSense.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

Spruce has been fully integrated into Visual Studio Code with custom extensions, launch configs, and settings.

<img src="../../../assets/img/screenshots/vscode.png">

### App Lifecycle

#### Python

Python web frameworks have request/response lifecycles. Flask uses decorators, Django uses middleware and views.

```python
from flask import Flask, g, request

app = Flask(__name__)

@app.before_request
def before_request():
    # Runs before each request
    g.user = get_current_user()

@app.after_request
def after_request(response):
    # Runs after each request
    return response

@app.teardown_request
def teardown_request(exception):
    # Cleanup after request
    pass
```

#### Spruce

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.

<img src="../../../assets/img/concepts/skill_view_lifecycle.png">

### UI Design

#### Python

Python web frameworks typically use template engines like Jinja2 for HTML rendering.

```python
# Flask with Jinja2
from flask import render_template

@app.route('/card')
def card():
    return render_template('card.html',
        title='Hello',
        subtitle='World'
    )
```

```html
<!-- templates/card.html -->
<div class="card">
    <h2>{{ title }}</h2>
    <p>{{ subtitle }}</p>
</div>
```

#### Spruce

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```shell
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

### Event Handling

#### Python

Python uses various patterns for event handling: Django signals, callback functions, or pub/sub patterns.

```python
# Django signals
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    if created:
        print(f'New user created: {instance.username}')

# Custom event system
class EventEmitter:
    def __init__(self):
        self.listeners = {}

    def on(self, event, callback):
        self.listeners.setdefault(event, []).append(callback)

    def emit(self, event, data):
        for callback in self.listeners.get(event, []):
            callback(data)
```

#### Spruce

In Spruce, your views are rendered on the edge, while your Skill is hosted on a server. So, you have to use the [Mercury event system](../../concepts/mercury/) to communicate between the two. Mercury also allows you to pass information other skills.

```typescript

// inside of Skill View sending message to the Skill with the namespace "eightbitstories"

const client = await this.connectToApi()
await this.client.emitAndFlattenResponses(
  'eightbitstories.submit-feedback::v2023_09_05',
  {
    payload: {
      feedback: 'Help make this better!',
    },
  }
)

```

### Data Persistence

#### Python

Python offers many ORMs. SQLAlchemy is popular for Flask, Django has its own ORM.

```python
# SQLAlchemy
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Car(Base):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True)
    make = Column(String)
    model = Column(String)
    year = Column(Integer)

# Usage
session.add(Car(make='Toyota', model='Camry', year=2022))
session.commit()

# Django ORM
class Car(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()

Car.objects.create(make='Toyota', model='Camry', year=2022)
```

#### Spruce

In Spruce, you'll use the [Stores](../../concepts/stores/) feature to persist data. The stores use [Schemas](../../concepts/schemas/) to define the shape of the data.

```shell
spruce create.store
```

Once you configure your store, you can use it in your skill's event listener like this:

```typescript
export default async (
  event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {
  const { stores } = event

  const cars = await stores.getStore('cars')
  await cars.createOne({
    make: 'Toyota',
    model: 'Camry',
    year: 2022
  })

  return {
    success: true,
  }
}
```

### Error Handling

#### Python

Python uses try-except blocks with specific exception types.

```python
class CarNotFoundError(Exception):
    def __init__(self, car_id):
        self.car_id = car_id
        super().__init__(f'Car not found: {car_id}')

try:
    car = get_car(car_id)
    if not car:
        raise CarNotFoundError(car_id)
except CarNotFoundError as e:
    print(f'Error: {e}')
except Exception as e:
    print(f'Unexpected error: {e}')
```

#### Spruce

Spruce provides a much more robust, standardized error handling system. You can use the [SpruceError](../../concepts/errors/) class to create custom errors, you define the Schemas for those errors to give them shape, and then use try-catch blocks to handle them.

```shell
spruce create.error
```

This will create an error builder inside of your skill at `./src/errors/{{errorName}}.builder.ts`. Inside there is the schema that defines your error.

You can throw an error you have defined like this:

```typescript
throw new SpruceError({
  code: 'MY_ERRORS_NAME_HERE',
  friendlyMessage: 'All errors can provide a friendly error message!',
})
```

### Testing

#### Python

Python uses unittest or pytest for testing.

```python
import pytest

def test_addition():
    assert 1 + 1 == 2

class TestCar:
    def test_create_car(self):
        car = Car(make='Toyota', model='Camry', year=2022)
        assert car.make == 'Toyota'
        assert car.year == 2022

    def test_car_string(self):
        car = Car(make='Toyota', model='Camry', year=2022)
        assert str(car) == '2022 Toyota Camry'
```

#### Spruce

Everything in Spruce starts with a [Test](../../concepts/tests/) If you want to write a piece of production code, you must start with a failing test.

```shell
spruce create.test
```

Once your test file is created, you are ready to start!

### User Authentication

#### Python

Python frameworks have various auth solutions. Django has built-in auth, Flask uses extensions like Flask-Login.

```python
# Django
from django.contrib.auth import authenticate, login, logout

def login_view(request):
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('home')

# Flask-Login
from flask_login import LoginManager, login_user, logout_user, current_user

@app.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return redirect('/')
```

#### Spruce

Because [Mercury](../../concepts/mercury/) handles user authentication (and authorization). You can use the [Authenticator](../../concepts/permissions/) to know if a person is logged in or not. You can also use it to log a person in or out.

```typescript
//inside your Skill View's load lifecycle method
public async load(options: SkillViewControllerLoadOptions) {
  const { authenticator } = options

  this.log.info(authenticator.isLoggedIn())
  this.log.info(authenticator.getPerson())

  // force person to be logged out
  authenticator.clearSession()

}
```

### User Permissions

#### Python

Django has a built-in permission system. Flask requires custom implementation or extensions.

```python
# Django permissions
from django.contrib.auth.decorators import permission_required

@permission_required('app.can_generate_story')
def generate_story(request):
    # Only users with 'can_generate_story' permission can access
    pass

# Manual check
if request.user.has_perm('app.can_generate_story'):
    # User has permission
    pass
```

#### Spruce

Mercury also handles all your [Permission](../../concepts/permissions/) needs. To introduce new permissions into the platform, you need to create a Permission Contract in your skill:

```shell
spruce create.permissions
```

Then you can do permission checks in your Skill View like this:

```typescript
//inside your Skill View's load lifecycle method
public async load(options: SkillViewControllerLoadOptions) {
  const { authorizer } = options

  const canGenerateStory = await authorizer.can({
    contractId: 'eightbitstories.eight-bit-stories',
    permissionIds: ['can-generate-story'],
  })

}
```

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
