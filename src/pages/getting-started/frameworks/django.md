# Transitioning from Django to Spruce

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Spruce is a TypeScript-based framework that offers full-stack development capabilities. This guide will help Django developers understand how to transition their skills to work with Spruce.

## Key Differences between Django and Spruce Development

|     | Django                   | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Python                  | TypeScript               |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | Request/Response, Middleware | AppViewController            |
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

#### Django in PyCharm/VS Code

Django developers typically use PyCharm Professional (with Django support) or VS Code with Python extensions.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

Spruce has been fully integrated into Visual Studio Code with custom extensions, launch configs, and settings.

<img src="../../../assets/img/screenshots/vscode.png">

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

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.

<img src="../../../assets/img/concepts/skill_view_lifecycle.png">

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

#### Spruce

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```shell
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

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

Everything in Spruce starts with a [Test](../../concepts/tests/) If you want to write a piece of production code, you must start with a failing test.

```shell
spruce create.test
```

Once your test file is created, you are ready to start!

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
