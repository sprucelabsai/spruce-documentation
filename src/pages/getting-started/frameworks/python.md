# Transitioning from Python to Spruce

Python development often involves dynamic scripting and various frameworks like Django or Flask. Spruce, on the other hand, uses TypeScript. This guide will help you connect your Python expertise to Spruce's architecture, showing how to adapt and apply your existing skills in a new environment.

## Key Differences between Python and Spruce Development

|     | Python                   | Spruce                  |
|-----------------------|--------------------------|-------------------------|
| **Programming Language** | Python                  | TypeScript              |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code      |
| **App Lifecycle** | Framework-dependent (Django, Flask) | SkillViewController lifecycle (optional AppViewController) |
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

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### Python in PyCharm/VS Code

Python developers typically use PyCharm or VS Code with Python extensions for linting, debugging, and IntelliSense.


#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

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

{% include_raw "../includes/spruce/app-lifecycle.md" %}

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

{% include_raw "../includes/spruce/ui-design.md" %}

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

{% include_raw "../includes/spruce/event-handling.md" %}

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

{% include_raw "../includes/spruce/data-persistence.md" %}

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

{% include_raw "../includes/spruce/error-handling.md" %}

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

{% include_raw "../includes/spruce/testing.md" %}

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

{% include_raw "../includes/spruce/user-authentication.md" %}

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

{% include_raw "../includes/spruce/user-permissions.md" %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
