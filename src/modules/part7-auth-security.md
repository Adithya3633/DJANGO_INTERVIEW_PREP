# Part 7: Django Authentication, JWT, Permissions, Middleware and Security

This part covers JWT authentication and role-based access control (RBAC), which are common in Django REST API projects.

## 1. Authentication vs Authorization

Authentication means verifying who a user is. Authorization means checking what an authenticated user is allowed to do.

For example, in a CRM application:

- **Authentication:** Verify whether Adithya's email and password are correct.
- **Authorization:** Check whether Adithya is allowed to delete a customer.

| Authentication | Authorization |
|---|---|
| Verifies user identity | Checks user permissions |
| Happens first | Happens after authentication |
| Example: login process | Example: admin-only page |

**Interview question: What is the difference between authentication and authorization?**

Authentication verifies a user's identity, whereas authorization determines which resources or actions that user can access.

## 2. Django Built-in Authentication

Django provides a built-in authentication system to manage users, passwords, login, logout and permissions. It includes a user model, password hashing, permissions and groups.

### Creating a user

```python
from django.contrib.auth.models import User

user = User.objects.create_user(
    username="adithya",
    email="adithya@gmail.com",
    password="mypassword",
)
```

Django hashes the password before storing it.

### Authenticating a user

```python
from django.contrib.auth import authenticate

user = authenticate(username="adithya", password="mypassword")
if user is not None:
    print("Login successful")
else:
    print("Invalid credentials")
```

### Logging in and out

These functions work with Django's session-based authentication.

```python
from django.contrib.auth import login, logout

def user_login(request, user):
    login(request, user)

def user_logout(request):
    logout(request)
```

### What is `request.user`?

`request.user` represents the user making the current request. For an unauthenticated request, Django normally provides an `AnonymousUser`.

```python
def dashboard(request):
    print(request.user.username)
```

**Interview question: What is Django's built-in authentication system?**

Django provides built-in facilities for managing user accounts, passwords, login, logout and permissions.

## 3. Password Hashing

Password hashing converts a password into a fixed-length value using a one-way algorithm. The original password cannot practically be recovered from the hash. Django uses password hashers such as PBKDF2 by default.

### Setting and checking a password

```python
user.set_password("hello123")
user.save()

if user.check_password("hello123"):
    print("Correct password")
```

| Concept | Meaning | Reversible? |
|---|---|---|
| Hashing | Converts data into a hash | No |
| Encryption | Transforms data using a key | Yes, with the key |
| Encoding | Changes data representation | Yes |

**Interview question: Why should we hash passwords?**

Plain-text passwords expose users if someone accesses the database. Hashing makes stored passwords much harder to misuse if the database is exposed.

## 4. Session Authentication

Session authentication maintains a user's login state on the server.

### How it works

1. The user enters a username and password.
2. Django verifies the credentials.
3. Django creates a session on the server.
4. The browser receives a session ID in a cookie.
5. The browser sends that cookie with subsequent requests.
6. Django uses the session ID to identify the user.

```text
Browser → Login → Django
Django → Creates session
Browser ← Session Cookie
Browser → Request + Session Cookie → Django
```

Session authentication is common in traditional Django websites and applications using server-rendered templates.

## 5. Token Authentication

Token authentication verifies a user with a token sent with each API request. Instead of relying on a server-side browser session, the client sends a token to prove its identity.

```http
GET /api/customers/
Authorization: Token abc123xyz
```

It is commonly used with REST APIs, mobile applications and separate frontend/backend applications.

| Session authentication | Token authentication |
|---|---|
| Uses a session ID | Uses an authentication token |
| Session data is stored server-side | The client presents a token for verification |
| Common in traditional websites | Common in REST APIs |
| Browser sends a session cookie | Client sends a token in a header |

## 6. JWT Authentication

JWT stands for **JSON Web Token**. It is a compact, URL-safe token format commonly used to transmit claims between a client and server for REST API authentication.

### JWT structure

A JWT contains three parts separated by dots:

```text
Header.Payload.Signature
```

- **Header:** Contains the token type and signing algorithm.
- **Payload:** Contains claims such as a user ID and expiry time.
- **Signature:** Helps verify that the token has not been altered.

Example of a simplified payload:

```json
{
  "user_id": 101,
  "role": "Admin",
  "exp": 1790000000
}
```

The payload is generally Base64URL encoded, not encrypted. Do not put passwords or secrets in it.

### How JWT authentication works

1. The user enters login credentials in React.
2. React sends the credentials to the Django login API.
3. Django validates the credentials.
4. Django generates an access token and a refresh token.
5. React receives the tokens.
6. React sends the access token with future API requests.
7. Django verifies the token and processes the request.

```http
GET /api/customers/
Authorization: Bearer <access_token>
```

| Access token | Refresh token |
|---|---|
| Used to access APIs | Used to obtain a new access token |
| Usually has a shorter lifetime | Usually has a longer lifetime |
| Sent with API requests | Sent to a refresh endpoint |

**Interview question: What happens when an access token expires?**

The client can send a valid refresh token to the refresh endpoint to obtain a new access token. If the refresh token is also expired or invalid, the user generally needs to log in again.

## 7. Implementing JWT in Django REST Framework

A commonly used package is `djangorestframework-simplejwt`.

### Step 1: Install the package

```bash
pip install djangorestframework-simplejwt
```

### Step 2: Configure authentication in `settings.py`

Make sure `rest_framework` is in `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    "rest_framework",
]
```

Configure JWT authentication:

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}
```

### Step 3: Configure JWT URLs

In the project's `urls.py`:

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
]
```

### Step 4: Obtain tokens

Send a `POST` request:

```http
POST /api/token/
Content-Type: application/json
```

Request body:

```json
{
  "username": "adithya",
  "password": "hello123"
}
```

The response contains tokens:

```json
{
  "refresh": "refresh_token_here",
  "access": "access_token_here"
}
```

### Step 5: Protect an API

```python
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Welcome to dashboard"})
```

Only authenticated users can access this API.

## 8. Permissions in DRF

Permissions determine whether a user is allowed to access an API or perform an operation.

- **Authentication:** Who are you?
- **Permissions:** Are you allowed to do this?

| Permission | Meaning |
|---|---|
| `AllowAny` | Anyone can access |
| `IsAuthenticated` | Only authenticated users can access |
| `IsAdminUser` | Only admin/staff users can access |
| `IsAuthenticatedOrReadOnly` | Anyone can read; only authenticated users can write |

### Allow only authenticated users

```python
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class CustomerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Customers"})
```

### Make an API public

```python
from rest_framework.permissions import AllowAny

class PublicView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "Public API"})
```

### Global vs view-level permissions

Global permissions are applied by default through `settings.py`:

```python
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}
```

A view-level `permission_classes` setting applies to that individual API and overrides the global default for that view:

```python
permission_classes = [AllowAny]
```

## 9. RBAC – Role-Based Access Control

RBAC is an access-control method where permissions are assigned based on a user's role.

Example roles in a CRM:

| Role | Example permissions |
|---|---|
| Admin | Manage users, customers and all records |
| Sales Manager | View and manage team records |
| Sales Executive | Access assigned customers and leads |

### Illustrative role check

```python
def check_role(user):
    if user.role == "Admin":
        return "Full access"
    if user.role == "Sales Manager":
        return "Team access"
    if user.role == "Sales Executive":
        return "Assigned records only"
    return "No access"
```

In a real DRF application, enforce access using permission classes and queryset filtering, not just a returned message.

### Custom permission example

```python
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "Admin"
        )
```

Use the permission in a view:

```python
from rest_framework.response import Response
from rest_framework.views import APIView

class ManageUsersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        return Response({"message": "Admin access"})
```

**Interview question: What is RBAC?**

RBAC stands for Role-Based Access Control. It grants access based on assigned roles. For example, an Admin can manage all CRM records, while a Sales Executive can access only assigned records.

## 10. Middleware in Django

Middleware is a component that processes HTTP requests before they reach a view and processes responses before they are returned to the client. Think of middleware as a checkpoint between the browser and Django views.

```text
Client → Middleware → URL routing → View
Client ← Middleware ← Response ← View
```

### Common Django middleware

| Middleware | Purpose |
|---|---|
| `SecurityMiddleware` | Provides security-related protections |
| `SessionMiddleware` | Enables sessions |
| `CommonMiddleware` | Provides common request/response processing |
| `CsrfViewMiddleware` | Provides CSRF protection |
| `AuthenticationMiddleware` | Adds the authenticated user to the request |
| `MessageMiddleware` | Supports temporary messages |

These are configured in `MIDDLEWARE` in `settings.py`.

### Creating custom middleware

Example: log each incoming request.

```python
class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Request received")
        response = self.get_response(request)
        print("Response sent")
        return response
```

Add it to `settings.py`:

```python
MIDDLEWARE = [
    # Existing middleware
    "myapp.middleware.MyMiddleware",
]
```

**Interview question: What is middleware in Django?**

Middleware is a layer in the request/response process. It can perform operations such as security checks, logging and session handling.

## 11. CSRF vs CORS

These concepts are frequently asked about in Django and React interviews.

### CSRF – Cross-Site Request Forgery

CSRF is an attack in which a malicious website tricks an authenticated user's browser into sending an unwanted request to another website. Django provides CSRF protection, which is particularly important for cookie/session-based authentication.

Example in a Django template:

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="username">
    <button type="submit">Submit</button>
</form>
```

### CORS – Cross-Origin Resource Sharing

CORS is a browser mechanism that controls whether a frontend from one origin can access resources from another origin.

For example, `http://localhost:5173` and `http://localhost:8000` are different origins because their ports differ. Django needs suitable CORS configuration to allow the React frontend to access the API.

### Configure CORS

Install the package:

```bash
pip install django-cors-headers
```

Add the app and middleware:

```python
INSTALLED_APPS = [
    # ...
    "corsheaders",
    "rest_framework",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    # Other middleware
]
```

Allow the frontend origin:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

| CSRF | CORS |
|---|---|
| Protects against forged requests | Controls cross-origin browser access |
| An attack and protection mechanism | A browser access-control mechanism |
| Django has CSRF middleware | Often configured using `django-cors-headers` |
| Particularly relevant to cookie/session authentication | Relevant to cross-origin React-Django communication |

**Interview question: Why do we need CORS in React and Django?**

When React and Django run on different origins, the browser may block frontend requests unless the backend allows that origin through CORS configuration.

## 12. Important Django Security Practices

| Practice | Explanation |
|---|---|
| Password hashing | Never store plain-text passwords |
| HTTPS | Encrypts data during transmission |
| Input validation | Validate user-provided data |
| Authentication | Verify user identity |
| Permissions | Restrict unauthorized actions |
| ORM | Helps protect against SQL injection when used correctly |
| Environment variables | Keep secret keys and credentials outside source code |
| `DEBUG=False` | Disable debug mode in production |
| `ALLOWED_HOSTS` | Restrict allowed hostnames |

### SQL injection

Unsafe SQL string interpolation:

```python
query = "SELECT * FROM users WHERE name = '%s'" % username
```

Safer Django ORM usage:

```python
User.objects.filter(username=username)
```

The ORM uses parameterized database operations, which help protect against SQL injection.

## 13. Explain Authentication in Your CRM Project

This is an important answer to prepare because interviewers may ask you to explain your project.

**Question: How did you implement authentication in your CRM project?**

> I used JWT authentication in my Django REST Framework backend. When a user enters login credentials in the React frontend, the frontend sends them to the Django login API. Django validates the credentials and generates access and refresh tokens. The frontend sends the access token in the Authorization header for subsequent API requests. Django validates the token before allowing access to protected APIs.

**Question: How did you implement role-based access control?**

> I implemented role-based access control for Admin, Sales Manager and Sales Executive. Each role has different permissions. Admin has broader access, Sales Managers can manage team-related records, and Sales Executives can access their assigned records. I used permissions and data filtering to restrict access.

**Question: What happens if a Sales Executive tries to access another employee's customer?**

> The backend should verify the user's role and restrict the queryset to records assigned to that employee. This prevents users from accessing records they are not authorized to see.

## 14. Most-Asked Interview Questions – Part 7

Try to answer these in your own words:

1. What is authentication?
2. What is authorization?
3. What is Django's built-in authentication system?
4. What is password hashing?
5. What is the difference between hashing and encryption?
6. What is session authentication?
7. What is token authentication?
8. What is JWT?
9. What are the three parts of a JWT?
10. What is the difference between access and refresh tokens?
11. What is a Bearer token?
12. What is the use of `IsAuthenticated`?
13. What is the difference between authentication and permissions?
14. What is RBAC?
15. What is middleware?
16. Name five built-in Django middleware classes.
17. How do you create custom middleware?
18. What is CSRF?
19. What is CORS?
20. What is the difference between CSRF and CORS?
21. Why do we need CORS in React and Django?
22. What is SQL injection?
23. Why should `DEBUG=False` in production?
24. How does JWT authentication work in your CRM project?
25. How do you restrict a Sales Executive to assigned customers?

## 15. Practical Coding Questions

Practice these without looking at the solutions first:

1. Write a custom DRF permission that allows only Admin users.
2. Create an API that requires authentication.
3. Write code to check a user's password using `check_password()`.
4. Write custom middleware that prints the request method.
5. Create a public API using `AllowAny`.
6. Create a protected API using `IsAuthenticated`.
7. Write a queryset that retrieves only customers assigned to the logged-in user.

Example for question 7:

```python
customers = Customer.objects.filter(assigned_to=request.user)
```

This assumes your `Customer` model has an `assigned_to` relationship with the user model.

## Part 7 – Quick Revision

- **Authentication:** Who are you?
- **Authorization:** What can you access?
- **Hashing:** One-way password protection.
- **Session:** Server-side login state.
- **JWT:** Token-based authentication.
- **Access token:** Used for API access.
- **Refresh token:** Used to obtain a new access token.
- **Permissions:** Control access to APIs.
- **RBAC:** Access based on roles.
- **Middleware:** Processes requests and responses.
- **CSRF:** Protects against forged requests.
- **CORS:** Controls cross-origin browser access.
