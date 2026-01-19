# Transitioning from Django to Spruce

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Spruce is a TypeScript-based framework that offers full-stack development capabilities. This guide will help Django developers understand how to transition their skills to work with Spruce.

## Key Differences between Django and Spruce Development

|     | Django                   | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Python                  | TypeScript               |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code       |
| **App Lifecycle** | Request/Response, Middleware | SkillViewController lifecycle (optional AppViewController) |
| **UI Design**           | Django Templates        | Heartwood, ViewControllers |
| **Event Handling**      | Signals                 | Mercury                  |
| **Data Persistence**    | Django ORM              | Data Stores              |
| **Error Handling**      | Try-Except Blocks       | Try-Catch Blocks, SpruceErrors |
| **Testing**             | Django TestCase | TDD by the 3 laws        |
| **User Authentication** | Django Auth | Mercury, Authenticator   |
| **User Permissions**    | Django Permissions | Mercury, Authorizer      |

### Programming Language

#### Django

Django uses Python with a Model-View-Template (MVT) architecture. Views handle requests and return responses.

```python
# views.py
from django.shortcuts import render

def home(request):
    context = {
        'title': 'Hello, World!',
        'subtitle': 'This is a card'
    }
    return render(request, 'home.html', context)
```

#### Spruce

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### Django in PyCharm/VS Code

Django developers typically use PyCharm Professional (with Django support) or VS Code with Python extensions.


#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

### App Lifecycle

#### Django

Django manages the request/response cycle through middleware, views, and URL routing.

```python
# middleware.py
class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Before view
        request.custom_data = 'hello'

        response = self.get_response(request)

        # After view
        return response

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]
```

#### Spruce

{% include_raw "../includes/spruce/app-lifecycle.md" %}

### UI Design

#### Django

Django uses its own template language for rendering HTML, with template inheritance and tags.

```python
# views.py
def card_view(request):
    return render(request, 'card.html', {
        'title': 'Hello',
        'subtitle': 'World'
    })
```

{% raw %}
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- templates/card.html -->
{% extends 'base.html' %}
{% block content %}
<div class="card">
    <h2>{{ title }}</h2>
    <p>{{ subtitle }}</p>
</div>
{% endblock %}
```
{% endraw %}

#### Spruce

{% include_raw "../includes/spruce/ui-design.md" %}

### Event Handling

#### Django

Django uses signals for decoupled event handling between components.

```python
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver, Signal

# Built-in signals
@receiver(post_save, sender=User)
def user_saved(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Custom signals
feedback_submitted = Signal()

@receiver(feedback_submitted)
def handle_feedback(sender, feedback, **kwargs):
    print(f'Feedback received: {feedback}')

# Emit custom signal
feedback_submitted.send(sender=self.__class__, feedback='Great app!')
```

#### Spruce

{% include_raw "../includes/spruce/event-handling.md" %}

### Data Persistence

#### Django

Django's ORM is one of its most powerful features, providing an abstraction layer over SQL databases.

```python
# models.py
from django.db import models

class Car(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f'{self.year} {self.make} {self.model}'

# Usage in views
Car.objects.create(make='Toyota', model='Camry', year=2022)
cars = Car.objects.filter(make='Toyota')
car = Car.objects.get(pk=1)
```

#### Spruce

{% include_raw "../includes/spruce/data-persistence.md" %}

### Error Handling

#### Django

Django provides exception handling and custom exception classes.

```python
from django.http import Http404
from django.core.exceptions import PermissionDenied

class CarNotFoundError(Exception):
    pass

def get_car(request, car_id):
    try:
        car = Car.objects.get(pk=car_id)
    except Car.DoesNotExist:
        raise Http404('Car not found')
    return render(request, 'car.html', {'car': car})
```

#### Spruce

{% include_raw "../includes/spruce/error-handling.md" %}

### Testing

#### Django

Django has a built-in test framework extending Python's unittest.

```python
from django.test import TestCase, Client

class CarTestCase(TestCase):
    def setUp(self):
        Car.objects.create(make='Toyota', model='Camry', year=2022)

    def test_car_string(self):
        car = Car.objects.get(make='Toyota')
        self.assertEqual(str(car), '2022 Toyota Camry')

    def test_car_view(self):
        client = Client()
        response = client.get('/cars/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Toyota')
```

#### Spruce

{% include_raw "../includes/spruce/testing.md" %}

### User Authentication

#### Django

Django has a comprehensive built-in authentication system.

```python
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
    return render(request, 'login.html')

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')
```

#### Spruce

{% include_raw "../includes/spruce/user-authentication.md" %}

### User Permissions

#### Django

Django has a robust permission system built into its auth framework.

```python
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin

# Function-based view
@permission_required('stories.can_generate_story', raise_exception=True)
def generate_story(request):
    # Only users with permission can access
    pass

# Class-based view
class StoryCreateView(PermissionRequiredMixin, CreateView):
    permission_required = 'stories.can_generate_story'
    model = Story
    fields = ['title', 'content']

# Manual check
if request.user.has_perm('stories.can_generate_story'):
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
