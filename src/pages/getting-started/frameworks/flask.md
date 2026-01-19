# Transitioning from Flask to Spruce

Flask is a lightweight Python micro-framework that provides flexibility and simplicity for building web applications. Spruce is a TypeScript-based full-stack framework designed to create scalable web applications with a focus on modern development practices and test-driven development. This guide will help Flask developers understand how to transition their skills to work with Spruce.

## Key Differences between Flask and Spruce Development

|     | Flask                    | Spruce                   |
|-----------------------|--------------------------|--------------------------|
| **Programming Language** | Python                  | TypeScript               |
| **IDE**                 | PyCharm, VS Code        | Visual Studio Code       |
| **App Lifecycle** | Application Factory, Blueprints | SkillViewController lifecycle (optional AppViewController) |
| **UI Design**           | Jinja2 Templates        | Heartwood, ViewControllers |
| **Event Handling**      | Route Decorators, Signals | Mercury                  |
| **Data Persistence**    | Flask-SQLAlchemy        | Data Stores              |
| **Error Handling**      | Try-Except Blocks, Error Handlers | Try-Catch Blocks, SpruceErrors |
| **Testing**             | pytest, Flask Test Client | TDD by the 3 laws        |
| **User Authentication** | Flask-Login             | Mercury, Authenticator   |
| **User Permissions**    | Flask-Principal, Custom Decorators | Mercury, Authorizer      |

### Programming Language

#### Flask

Flask uses Python with a simple routing system using decorators. Views are functions that return responses.

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
    app.run(debug=True)
```

#### Spruce

{% include_raw "../includes/spruce/programming-language.md" %}

### IDE

#### Flask in PyCharm/VS Code

Flask developers typically use PyCharm (with Flask support) or VS Code with Python extensions for development.

<img src="../../../assets/img/screenshots/vscode.png">

#### Spruce in Visual Studio Code

{% include_raw "../includes/spruce/ide.md" %}

### App Lifecycle

#### Flask

Flask manages the application lifecycle through the application factory pattern and blueprints for modular applications.

```python
from flask import Flask, Blueprint

# Application factory pattern
def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app

# Blueprint example
main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/about')
def about():
    return render_template('about.html')
```

#### Spruce

{% include_raw "../includes/spruce/app-lifecycle.md" %}

### UI Design

#### Flask

Flask uses Jinja2 templating engine for rendering HTML, with template inheritance and filters.

```python
# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/card')
def card_view():
    return render_template('card.html',
        title='Hello',
        subtitle='World'
    )
```

{% raw %}
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- templates/card.html -->
{% extends 'base.html' %}
{% block title %}Card{% endblock %}
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

#### Flask

Flask uses route decorators for handling HTTP requests and Flask-SocketIO or signals for event-driven patterns.

```python
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from blinker import signal

app = Flask(__name__)
socketio = SocketIO(app)

# Route-based event handling
@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    feedback = data.get('feedback')
    # Process feedback
    return jsonify({'success': True})

# Custom signals with blinker
feedback_submitted = signal('feedback-submitted')

@feedback_submitted.connect
def handle_feedback(sender, feedback):
    print(f'Feedback received: {feedback}')

# Emit signal
feedback_submitted.send(app, feedback='Great app!')

# WebSocket events
@socketio.on('submit_feedback')
def handle_socket_feedback(data):
    emit('feedback_received', {'status': 'success'})
```

#### Spruce

{% include_raw "../includes/spruce/event-handling.md" %}

### Data Persistence

#### Flask

Flask commonly uses Flask-SQLAlchemy for database operations, providing an ORM layer over SQL databases.

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
db = SQLAlchemy(app)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'{self.year} {self.make} {self.model}'

# Create a new car
new_car = Car(make='Toyota', model='Camry', year=2022)
db.session.add(new_car)
db.session.commit()

# Query cars
cars = Car.query.filter_by(make='Toyota').all()
car = Car.query.get(1)
```

#### Spruce

{% include_raw "../includes/spruce/data-persistence.md" %}

### Error Handling

#### Flask

Flask provides error handlers and custom exception classes for handling errors.

```python
from flask import Flask, jsonify
from werkzeug.exceptions import NotFound

app = Flask(__name__)

class CarNotFoundError(Exception):
    def __init__(self, car_id):
        self.car_id = car_id
        self.message = f'Car with id {car_id} not found'
        super().__init__(self.message)

@app.errorhandler(CarNotFoundError)
def handle_car_not_found(error):
    return jsonify({'error': error.message}), 404

@app.errorhandler(404)
def handle_not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.route('/cars/<int:car_id>')
def get_car(car_id):
    car = Car.query.get(car_id)
    if car is None:
        raise CarNotFoundError(car_id)
    return jsonify(car.to_dict())
```

#### Spruce

{% include_raw "../includes/spruce/error-handling.md" %}

### Testing

#### Flask

Flask testing is commonly done with pytest and the Flask test client.

```python
import pytest
from app import create_app, db
from app.models import Car

@pytest.fixture
def app():
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome' in response.data

def test_create_car(client):
    response = client.post('/api/cars', json={
        'make': 'Toyota',
        'model': 'Camry',
        'year': 2022
    })
    assert response.status_code == 201
    assert response.json['make'] == 'Toyota'

def test_car_model():
    car = Car(make='Toyota', model='Camry', year=2022)
    assert str(car) == '2022 Toyota Camry'
```

#### Spruce

{% include_raw "../includes/spruce/testing.md" %}

### User Authentication

#### Flask

Flask-Login is the most common extension for handling user authentication in Flask.

```python
from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.secret_key = 'your-secret-key'
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password_hash = db.Column(db.String(128))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user and user.check_password(request.form['password']):
            login_user(user)
            return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)
```

#### Spruce

{% include_raw "../includes/spruce/user-authentication.md" %}

### User Permissions

#### Flask

Flask uses Flask-Principal or custom decorators for permission handling.

```python
from flask import Flask, abort
from flask_login import current_user
from functools import wraps

app = Flask(__name__)

# Custom permission decorator
def permission_required(permission):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.has_permission(permission):
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Role-based access
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.has_role(role):
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@app.route('/admin/stories/generate')
@login_required
@permission_required('can_generate_story')
def generate_story():
    # Only users with permission can access
    return render_template('generate_story.html')

# Manual permission check
@app.route('/stories')
@login_required
def stories():
    if current_user.has_permission('can_generate_story'):
        # User has permission
        pass
    return render_template('stories.html')
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
