# Transitioning from Android to Spruce

Android development typically involves Java or Kotlin, while Spruce is a TypeScript-based platform.

While Android focuses on front-end and does support directly implementing some backend type functionality, most times an Android app is communicating with a remote API to do it's work. Spruce, on the other hand, is a "full-stack platform" that allows for both beautiful UI's and robust back-ends.

This guide will help you connect your knowledge of Android development to Spruce's architecture, showing you how to adapt your existing skills to the Spruce environment.

## Key Differences between Android and Spruce Development

|     | Android                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Java/Kotlin        | TypeScript               |
| **IDE**                 | Android Studio                    | Visual Studio Code       |
| **App Lifecycle** | Application, Activities, Fragments | SkillViewController lifecycle (optional AppViewController) |
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

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### Android in Android Studio

<img src="../../../assets/img/screenshots/android-studio.png">

#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

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

{% include_raw "../includes/spruce/app-lifecycle.md" %}

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

{% include_raw "../includes/spruce/ui-design.md" %}

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

{% include_raw "../includes/spruce/event-handling.md" %}

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

{% include_raw "../includes/spruce/data-persistence.md" %}

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

{% include_raw "../includes/spruce/error-handling.md" %}

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

{% include_raw "../includes/spruce/testing.md" %}

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

{% include_raw "../includes/spruce/user-authentication.md" %}

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

{% include_raw "../includes/spruce/user-permissions.md" %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/getting-started/development-theatre/' | url }}">Install the Development Theatre</a>
</div>
