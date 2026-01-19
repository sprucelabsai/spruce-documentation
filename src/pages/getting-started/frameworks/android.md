# Transitioning from Android to Spruce

Android development typically involves Java or Kotlin, while Spruce is a TypeScript-based platform.

While Android focuses on front-end and does support directly implementing some backend type functionality, most times an Android app is communicating with a remote API to do it's work. Spruce, on the other hand, is a "full-stack platform" that allows for both beautiful UI's and robust back-ends.

This guide will help you connect your knowledge of Android development to Spruce's architecture, showing you how to adapt your existing skills to the Spruce environment.

## Key Differences between Android and Spruce Development

|     | Android                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Java/Kotlin        | TypeScript               |
| **IDE**                 | Android Studio                    | Visual Studio Code       |
| **App Lifecycle**                 | Application, Activities, Fragments                    | AppViewController       |
| **UI Design**           | XML Layouts, Jetpack Compose            | Heartwood, ViewControllers |
| **Event Handling**      | Intents, BroadcastReceivers, LiveData | Mercury |
| **Data Persistence**    | Room, SharedPreferences, SQLite  | Data Stores                   |
| **Error Handling**      | Try-Catch Blocks, Exceptions | Try-Catch Blocks, SpruceErrors |
| **Testing**             | JUnit, Espresso                   | TDD by the 3 laws              |
| **User Authentication** | Firebase Auth, Custom Solutions | Mercury, Authenticator |
| **User Permissions** | Runtime Permissions, Custom Logic | Mercury, Authorizer |

### Programming Language

#### Android

In Android, you can use Kotlin with Jetpack Compose to build declarative UIs. Activities and Fragments manage the lifecycle and UI.

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.*
import androidx.compose.runtime.Composable

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@Composable
fun MyApp() {
    Column {
        Text("Knock, knock!")
        Text("Who's there?")
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

#### Android in Android Studio

<img src="../../../assets/img/screenshots/android-studio.png">

#### Spruce in Visual Studio Code

<img src="../../../assets/img/screenshots/vscode.png">

### App Lifecycle

#### Android

Android apps have a complex lifecycle managed through Activities and Fragments. Each has lifecycle methods like `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, and `onDestroy()`.

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Initialize UI
    }

    override fun onResume() {
        super.onResume()
        // App is visible and active
    }

    override fun onPause() {
        super.onPause()
        // App is partially visible
    }
}
```

#### Spruce

When a browser or native app loads your Skill, it will start by hitting it's `RootSkillViewController`. You can execute code at each stage by implementing a method by the name of the stage.

<img src="../../../assets/img/concepts/skill_view_lifecycle.png">

### UI Design

#### Android

You can build UIs using XML layouts or Jetpack Compose. Compose is the modern declarative approach.

```kotlin
@Composable
fun Greeting(name: String) {
    Card(
        modifier = Modifier.padding(16.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = "Hello, $name!", style = MaterialTheme.typography.headlineMedium)
            Text(text = "Welcome to the app")
        }
    }
}
```

#### Spruce

[Heartwood](../../concepts/views/) handles the rendering of all front end components. It adopts the philosphy of "Everything Beautiful". While you are constrained to the views that Heartwood provides, you can customize their look by running the following in your skill:

```shell
spruce create.theme
```

This will create a `skill.theme.ts` file you can customize. If you want to apply a theme to your organization (vs just your skill), you can utilize the [Theme Skill](https://spruce.bot/#views/theme.root).

### Event Handling

#### Android

Android uses Intents for inter-component communication, BroadcastReceivers for system-wide events, and LiveData/Flow for reactive data updates.

```kotlin
// Sending a broadcast
val intent = Intent("com.example.CUSTOM_EVENT")
intent.putExtra("message", "Hello from broadcast!")
sendBroadcast(intent)

// Receiving a broadcast
class MyReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val message = intent.getStringExtra("message")
        Log.d("Receiver", message ?: "No message")
    }
}
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

#### Android

Android offers several options: SharedPreferences for simple key-value storage, Room for SQLite with type safety, or direct SQLite access.

```kotlin
// SharedPreferences
val prefs = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
prefs.edit().putInt("age", 25).apply()

// Room Database
@Entity
data class Car(
    @PrimaryKey val id: Int,
    val make: String,
    val model: String,
    val year: Int
)

@Dao
interface CarDao {
    @Insert
    suspend fun insert(car: Car)

    @Query("SELECT * FROM car")
    suspend fun getAll(): List<Car>
}
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

#### Android

Android uses standard Java/Kotlin exception handling with try-catch blocks.

```kotlin
try {
    riskyOperation()
} catch (e: IOException) {
    Log.e("Error", "IO error occurred", e)
} catch (e: Exception) {
    Log.e("Error", "An error occurred", e)
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

#### Android

Android uses JUnit for unit tests and Espresso for UI testing.

```kotlin
class ExampleUnitTest {
    @Test
    fun addition_isCorrect() {
        val result = 2 + 2
        assertEquals(4, result)
    }
}

// Espresso UI test
@Test
fun buttonClick_showsText() {
    onView(withId(R.id.button)).perform(click())
    onView(withId(R.id.textView)).check(matches(withText("Clicked!")))
}
```

#### Spruce

Everything in Spruce starts with a [Test](../../concepts/tests/) If you want to write a piece of production code, you must start with a failing test.

```shell
spruce create.test
```

Once your test file is created, you are ready to start!

### User Authentication

#### Android

Android doesn't have built-in authentication. You typically use Firebase Auth, OAuth libraries, or custom server-side solutions.

```kotlin
// Firebase Auth example
FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password)
    .addOnCompleteListener { task ->
        if (task.isSuccessful) {
            val user = FirebaseAuth.getInstance().currentUser
        } else {
            Log.e("Auth", "Sign in failed", task.exception)
        }
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

#### Android

Android has a runtime permission system for accessing device features like camera, location, and storage.

```kotlin
// Request permission
if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
    != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(this,
        arrayOf(Manifest.permission.CAMERA),
        CAMERA_PERMISSION_REQUEST)
}

// Handle result
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String>,
    grantResults: IntArray
) {
    if (requestCode == CAMERA_PERMISSION_REQUEST) {
        if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // Permission granted
        }
    }
}
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
