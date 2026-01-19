# Transitioning from Laravel to Spruce

Laravel is a PHP framework designed for web application development that follows the MVC (Model-View-Controller) architectural pattern. Spruce, in contrast, is a TypeScript-based framework that also covers full-stack development but leverages JavaScript's ecosystem. This guide will help you draw parallels between familiar Laravel concepts and Spruce's architecture, offering a clear path to apply your existing Laravel skills to Spruce development.

## Key Differences between Laravel and Spruce Development

|     | Laravel                  | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | PHP                      | TypeScript               |
| **IDE**                 | PhpStorm, VS Code        | Visual Studio Code       |
| **App Lifecycle**       | Middleware, Service Providers | AppViewController            |
| **UI Design**           | Blade Templates          | Heartwood, ViewControllers |
| **Event Handling**      | Events and Listeners     | Mercury                  |
| **Data Persistence**    | Eloquent ORM             | Data Stores              |
| **Error Handling**      | Try-Catch Blocks, Custom Exceptions | Try-Catch Blocks, SpruceErrors |
| **Testing**             | PHPUnit, Laravel Dusk    | TDD by the 3 laws        |
| **User Authentication** | Built-in Auth, Sanctum, Passport | Mercury, Authenticator   |
| **User Permissions**    | Gates and Policies       | Mercury, Authorizer      |

### Programming Language

#### Laravel

Laravel uses PHP with the MVC pattern. Controllers handle requests and return responses, typically rendering Blade views.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('home', [
            'title' => 'Hello, World!',
            'subtitle' => 'This is a card'
        ]);
    }
}
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

#### Laravel in PhpStorm/VS Code

Laravel developers typically use PhpStorm (with Laravel Idea plugin) or VS Code with extensions like Laravel Extra Intellisense, PHP Intelephense, and Laravel Blade Snippets.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

Spruce has been fully integrated into Visual Studio Code with custom extensions, launch configs, and settings.

<img src="../../../assets/img/screenshots/vscode.png">

### App Lifecycle

#### Laravel

Laravel manages the application lifecycle through service providers, middleware, and the request/response cycle. Middleware can intercept requests before they reach controllers.

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Before the request is handled
        $request->merge(['custom_data' => 'hello']);

        $response = $next($request);

        // After the request is handled
        return $response;
    }
}

// routes/web.php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
```

#### Spruce

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.

<img src="../../../assets/img/concepts/skill_view_lifecycle.png">

### UI Design

#### Laravel

Laravel uses Blade, a powerful templating engine with directives, components, and template inheritance.

```php
<?php
// app/Http/Controllers/CardController.php
namespace App\Http\Controllers;

class CardController extends Controller
{
    public function show()
    {
        return view('card', [
            'title' => 'Hello',
            'subtitle' => 'World'
        ]);
    }
}
```

```html
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html>
<body>
    @yield('content')
</body>
</html>

<!-- resources/views/card.blade.php -->
@extends('layouts.app')

@section('content')
<div class="card">
    <h2>{{ $title }}</h2>
    <p>{{ $subtitle }}</p>
</div>
@endsection
```

#### Spruce

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```shell
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

### Event Handling

#### Laravel

Laravel provides a robust event system with events and listeners for decoupled application logic.

```php
<?php

// app/Events/FeedbackSubmitted.php
namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

class FeedbackSubmitted
{
    use Dispatchable;

    public function __construct(public string $feedback) {}
}

// app/Listeners/HandleFeedback.php
namespace App\Listeners;

use App\Events\FeedbackSubmitted;

class HandleFeedback
{
    public function handle(FeedbackSubmitted $event)
    {
        // Process the feedback
        logger()->info('Feedback received: ' . $event->feedback);
    }
}

// Dispatching the event
FeedbackSubmitted::dispatch('Great app!');

// Or using the event helper
event(new FeedbackSubmitted('Great app!'));
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

#### Laravel

Laravel's Eloquent ORM provides an elegant ActiveRecord implementation for working with databases.

```php
<?php

// app/Models/Car.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ['make', 'model', 'year'];

    protected $casts = [
        'year' => 'integer',
    ];
}

// Usage in a controller
use App\Models\Car;

// Create a new car
Car::create([
    'make' => 'Toyota',
    'model' => 'Camry',
    'year' => 2022
]);

// Query cars
$cars = Car::where('make', 'Toyota')->get();
$car = Car::find(1);
$latestCars = Car::orderBy('year', 'desc')->take(5)->get();
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

#### Laravel

Laravel provides exception handling through the exception handler and custom exception classes.

```php
<?php

// app/Exceptions/CarNotFoundException.php
namespace App\Exceptions;

use Exception;

class CarNotFoundException extends Exception
{
    public function __construct($carId)
    {
        parent::__construct("Car with ID {$carId} not found");
    }

    public function render($request)
    {
        return response()->json([
            'error' => $this->getMessage()
        ], 404);
    }
}

// Usage in a controller
use App\Exceptions\CarNotFoundException;
use App\Models\Car;

public function show($id)
{
    $car = Car::find($id);

    if (!$car) {
        throw new CarNotFoundException($id);
    }

    return view('cars.show', compact('car'));
}
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

#### Laravel

Laravel has built-in testing support using PHPUnit with helpful assertions for HTTP tests, database testing, and more.

```php
<?php

namespace Tests\Feature;

use App\Models\Car;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_car(): void
    {
        $car = Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2022
        ]);

        $this->assertDatabaseHas('cars', [
            'make' => 'Toyota',
            'model' => 'Camry'
        ]);
    }

    public function test_car_index_returns_success(): void
    {
        $response = $this->get('/cars');

        $response->assertStatus(200);
        $response->assertViewIs('cars.index');
    }
}
```

#### Spruce

Everything in Spruce starts with a [Test](../../concepts/tests/) If you want to write a piece of production code, you must start with a failing test.

```shell
spruce create.test
```

Once your test file is created, you are ready to start!

### User Authentication

#### Laravel

Laravel provides multiple authentication options including built-in auth scaffolding, Sanctum for SPAs, and Passport for OAuth.

```php
<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

// In a controller
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('dashboard');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
}

// Using middleware to protect routes
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth');

// Checking authentication status
if (Auth::check()) {
    $user = Auth::user();
}
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

#### Laravel

Laravel provides Gates and Policies for fine-grained authorization control.

```php
<?php

// app/Policies/StoryPolicy.php
namespace App\Policies;

use App\Models\Story;
use App\Models\User;

class StoryPolicy
{
    public function generate(User $user): bool
    {
        return $user->hasPermission('can-generate-story');
    }

    public function update(User $user, Story $story): bool
    {
        return $user->id === $story->user_id;
    }
}

// Defining a Gate in AuthServiceProvider
use Illuminate\Support\Facades\Gate;

Gate::define('generate-story', function (User $user) {
    return $user->hasPermission('can-generate-story');
});

// Using in a controller
public function generate()
{
    $this->authorize('generate-story');
    // Or using Gate facade
    if (Gate::allows('generate-story')) {
        // User can generate story
    }
}

// Using in Blade templates
@can('generate-story')
    <button>Generate Story</button>
@endcan
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
