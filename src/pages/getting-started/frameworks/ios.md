# Transitioning from iOS

iOS development typically involves Swift or Objective C, while Spruce is a TypeScript-based platform.

While iOS focuses on front-end and does support directly implementing some backend type functionality, most times an iOS app is communicating with a remote API to do it's work. Spruce, on the other hand, is a "full-stack platform" that allows for both beautiful UI's and robust back-ends.

This guide will help you connect your knowledge of iOS development to Spruce's architecture, showing you how to adapt your existing skills to the Spruce environment.

## Key Differences between iOS and Spruce Development

|     | iOS                      | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Swift/Objective-C        | TypeScript               |
| **IDE**                 | Xcode                    | Visual Studio Code       |
| **App Lifecycle** | AppDelegate | SkillViewController lifecycle (optional AppViewController) |
| **UI Design**           | SwiftUI, ViewControllers            | Heartwood, ViewControllers |
| **Event Handling**      | Delegates, NotificationCenter, Target-Action | Mercury |
| **Data Persistence**    | Core Data, UserDefaults  | Data Stores                   |
| **Error Handling**      | NSError, Error Protocol, Try-Catch Blocks | Try-Catch Blocks, SpruceErrors |
| **Testing**             | XCTest                   | TDD by the 3 laws              |
| **User Authentication** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authenticator |
| **User Permissions** | Apple's Frameworks, Custom Server-Side Solutions | Mercury, Authorizer |

### Programming Language

#### iOS

In iOS, SwiftUI view files declare a structure and a preview. The structure conforms to the View protocol and describes the view’s content and layout.

```swift
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


```

#### Spruce

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### iOS in xcode

<img src="../../../assets/img/screenshots/xcode.png">

#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

### App Lifecycle

#### iOS

#### Spruce

{% include_raw "../includes/spruce/app-lifecycle.md" %}

### UI Design

#### iOS

You can customize the look of any view in your app using the `SwiftUI` framework. You can use a wide variety of views to construct your interface, from labels and buttons to more complex views like lists, stacks, and navigation views.

#### Spruce

{% include_raw "../includes/spruce/ui-design.md" %}

### Event Handling

#### iOS

There are various ways to pass around data in iOS. You can use delegates, NotificationCenter, or target-action to handle events. But, since all your components are available in the same codebase, you can instantiate and invoke them directly.

#### Spruce

{% include_raw "../includes/spruce/event-handling.md" %}

### Data Persistence

#### iOS

In iOS, you can use Core Data, UserDefaults, or a custom solution to persist data.

```swift
// UserDefaults
let defaults = UserDefaults.standard
defaults.set(25, forKey: "Age")

// Core Data
let appDelegate = UIApplication.shared.delegate as! AppDelegate
let context = appDelegate.persistentContainer.viewContext
let entity = NSEntityDescription.entity(forEntityName: "Car", in: context)
let newCar = NSManagedObject(entity: entity!, insertInto: context)

newCar.setValue("Toyota", forKey: "make")
newCar.setValue("Camry", forKey: "model")
newCar.setValue(2022, forKey: "year")

context.save()
```

#### Spruce

{% include_raw "../includes/spruce/data-persistence.md" %}

### Error Handling

#### iOS

iOS uses Swift's `Error` protocol with `do`/`try`/`catch` blocks, plus `NSError` when bridging Objective-C APIs.

```swift
do {
    try checkForError()
} catch {
    print("An error occurred")
}
```

#### Spruce

{% include_raw "../includes/spruce/error-handling.md" %}

### Testing

#### iOS

Testing is a second class citizen in iOS development. You can use XCTest to write unit tests, but it's not as robust as other testing frameworks.

```swift
import XCTest

class MyTests: XCTestCase {
    func testExample() {
        let result = 1 + 2
        XCTAssertEqual(result, 3)
    }
}

```

#### Spruce

{% include_raw "../includes/spruce/testing.md" %}

### User Authentication

#### iOS

iOS does not have the concept of being "logged in". You'll need to use a 3rd party service like Firebase or Auth0 to handle user authentication.

#### Spruce

{% include_raw "../includes/spruce/user-authentication.md" %}

### User Permissions

#### iOS

iOS has ways to request permissions for things like location, camera, and microphone. You can use Apple's frameworks to request these permissions. As far as requesting permission to features you have built, you'll need to build a custom solution.

```swift
import AVFoundation

AVCaptureDevice.requestAccess(for: .video) { granted in
    if granted {
        print("Video access granted")
    } else {
        print("Video access denied")
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
