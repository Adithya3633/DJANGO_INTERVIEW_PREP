## Frontend and Backend Fundamentals

### What is frontend and backend?
Frontend: The part of an application users interact with. It includes UI elements such as forms, buttons, navigation and dashboards.

Technologies: HTML, CSS, JavaScript and React.

Backend: The server-side part responsible for business logic, authentication, authorization, API processing and database operations.

Technologies: Python, Django, Django REST Framework, Node.js, Java and Spring Boot.

Example – Your CRM project:

- React handles the user interface.
- Django REST Framework handles API requests.
- MySQL/SQLite stores application data.

### How does frontend communicate with backend?
Frontend communicates with backend through APIs, usually using HTTP or HTTPS.

Example architecture:

React Frontend

User interface · Forms · State

HTTP / REST API

GET · POST · PUT · PATCH · DELETE

Django Backend

Views · Serializers · Authentication · Business logic

Database

MySQL / PostgreSQL / SQLite

Interview answer:

The frontend sends an HTTP request to the backend API. The backend receives the request, validates the data, performs the required business logic and interacts with the database. It then sends a response, usually in JSON format, which the frontend uses to update the UI.

### What is an API?
API stands for Application Programming Interface.

It allows two software applications or components to communicate with each other.

Example:

A React application requests customer details from a Django API:

```
GET /api/customers/
```

The backend returns:

```
[
  {
    "id": 1,
    "name": "Adithya",
    "email": "adithya@example.com"
  }
]
```

React uses this response to display the customer information.

### What is a REST API?
REST stands for Representational State Transfer.

It is an architectural style used to design APIs that communicate over HTTP.

Important characteristics:

- Client-server architecture.
- Stateless communication.
- Resource-based URLs.
- Standard HTTP methods.
- Representations such as JSON.
Example:

```
GET     /api/users/
POST    /api/users/
GET     /api/users/1/
PUT     /api/users/1/
PATCH   /api/users/1/
DELETE  /api/users/1/
```

### What is the difference between REST API and HTTP API?
An HTTP API is any API that communicates using HTTP.

A REST API follows REST architectural constraints while using HTTP.

Therefore, all REST APIs use HTTP in common web implementations, but not every HTTP API is RESTful.

### What is JSON?
JSON stands for JavaScript Object Notation.

It is a lightweight data-interchange format used to exchange data between frontend and backend.

Example:

```
{
  "name": "Adithya",
  "role": "React Developer",
  "skills": ["HTML", "CSS", "JavaScript", "React"]
}
```

### Why do we use JSON?

- Lightweight data format.
- Easy to read.
- Easy to transmit.
- Supported by almost all programming languages.
- Easily converted into JavaScript objects.

### What is the difference between JSON.stringify() and JSON.parse()?

- `JSON.stringify()` converts a JavaScript value into a JSON string.
- `JSON.parse()` converts a valid JSON string into a JavaScript value.
Example:

```
const user = {
  name: "Adithya",
  age: 22
};

const jsonData = JSON.stringify(user);

console.log(jsonData);

const objectData = JSON.parse(jsonData);

console.log(objectData.name);
```

### What is the difference between frontend validation and backend validation?
Frontend validation

Backend validation

Happens in browser

Happens on server

Improves user experience

Protects application data

Can be bypassed

Must be enforced

Provides quick feedback

Provides authoritative validation

Example: React checks whether an email field is empty. Django validates the email again before saving it.

Always validate important data on the backend, even when frontend validation exists.

### What is an HTTP request?
An HTTP request is a message sent by a client to a server to perform an operation or retrieve a resource.

It contains:

- HTTP method.
- URL.
- Headers.
- Optional request body.
Example:

```
fetch("/api/users/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Adithya"
  })
});
```

### What is an HTTP response?
An HTTP response is the message returned by the server.

It generally contains:

- Status code.
- Response headers.
- Optional response body.
Example:

```
{
  "message": "User created successfully"
}
```

### What are HTTP headers?
Headers provide additional information about the HTTP request or response.

Header

Purpose

Content-Type

Describes the body format

Authorization

Carries authentication credentials

Accept

Specifies acceptable response formats

Origin

Identifies the request origin

Cookie

Sends applicable cookies

Set-Cookie

Instructs the browser to set a cookie

### What is Content-Type?
Content-Type tells the receiver the media type of the request or response body.

Example:

```
headers: {
  "Content-Type": "application/json"
}
```

It indicates that the request body contains JSON.

### What is the difference between query parameters and path parameters?
Path parameters identify a particular resource.

```
/api/users/10/
```

Here, `10` identifies a user.

Query parameters filter or modify a request.

```
/api/users/?role=admin&page=2
```

Here:

- `role=admin` filters users.
- `page=2` selects a page.

### What is the difference between PUT and PATCH?
PUT

PATCH

Usually replaces the resource representation

Partially updates a resource

Sends the complete intended representation

Sends only fields to change

Idempotent by HTTP semantics

Not necessarily idempotent

Example – Existing user:

```
{
  "name": "Adithya",
  "email": "old@example.com",
  "role": "admin"
}
```

PATCH request:

```
{
  "email": "new@example.com"
}
```

Only the email needs to change.

### What is an idempotent HTTP method?
An HTTP method is idempotent when making the same request multiple times has the same intended effect on the server as making it once.

Examples:

- GET
- PUT
- DELETE
POST is not generally idempotent.

### What is stateless communication?
Stateless means each request contains the information needed to process it.

The server does not rely on remembering the client's previous request as part of the REST interaction.

For example, with JWT authentication, the client sends the access token with each protected API request.

### What is synchronous vs asynchronous communication?
Synchronous: An operation waits for another operation to finish before continuing.

Asynchronous: An operation can continue without blocking the entire execution flow while waiting for an operation to complete.

JavaScript commonly uses Promises and async/await for asynchronous operations.

### What is the difference between fetch and Axios?
Fetch

Axios

Built-in browser API

External library

Does not reject automatically for HTTP error statuses

Rejects by default for non-2xx responses

Requires manual JSON parsing

Automatically transforms JSON responses in common cases

Supports AbortController

Supports cancellation with AbortController

Fetch example:

```
const response = await fetch("/api/users/");

if (!response.ok) {
  throw new Error("API request failed");
}

const data = await response.json();
```

Axios example:

```
import axios from "axios";

const response = await axios.get("/api/users/");

console.log(response.data);
```

### What is API integration?
API integration is connecting an application with an API to exchange data and perform operations.

Example:

In your CRM, React integrates with Django APIs to retrieve customers, create leads, update records and delete entries.

### What is CORS?
CORS stands for Cross-Origin Resource Sharing.

It is a browser security mechanism that allows a server to specify which origins can access its resources.

Example:

```
React:  http://localhost:5173
Django: http://localhost:8000
```

These have different origins because their ports differ.

The Django backend must configure appropriate CORS permissions for the React origin.

### What is a preflight request?
A preflight request is an OPTIONS request that a browser sends before certain cross-origin requests to check whether the actual request is permitted.

The server responds with appropriate CORS headers.

It is commonly triggered by methods such as PUT, PATCH or DELETE, or requests containing certain non-simple headers.

### What is the difference between CORS and CSRF?
This is a frequently asked interview question.

CORS

CSRF

Cross-Origin Resource Sharing

Cross-Site Request Forgery

Browser cross-origin access mechanism

Security attack

Controls whether browser JavaScript can access cross-origin responses

Tricks an authenticated browser into sending an unwanted request

Configured through response headers

Mitigated using CSRF tokens, SameSite cookies and other protections

Remember: CORS is not a replacement for CSRF protection.

### What is an API endpoint?
An endpoint is a specific URL where an API resource or operation can be accessed.

Example:

```
GET /api/customers/
POST /api/customers/
GET /api/customers/5/
```

### What is API versioning?
API versioning allows developers to introduce changes without breaking existing clients.

Example:

```
/api/v1/users/
/api/v2/users/
```

Different frontend versions can use the appropriate backend API version.

### What is a backend framework?
A backend framework provides tools and structures for developing server-side applications.

Examples:

- Django – Python.
- Flask – Python.
- FastAPI – Python.
- Express.js – JavaScript.
- Spring Boot – Java.

### What is the difference between SQL and NoSQL?
SQL

NoSQL

Relational databases

Non-relational database systems

Tables, rows and columns

Documents, key-value pairs, etc.

Often uses predefined schemas

Often supports flexible data models

SQL query language

Query interfaces vary by database

Examples:

- SQL: MySQL, PostgreSQL.
- NoSQL: MongoDB, Redis.

## Database Integration

### How does React data reach a database?
Interview answer:

React collects the data through a form and sends it to a backend API using an HTTP request.

The Django backend receives the request, validates the data through a serializer and saves it using Django ORM.

The database stores the record, and Django returns a response to React.

### Should React connect directly to MySQL?
No, not in a normal web application architecture.

React runs in the user's browser. Exposing database credentials would create a serious security risk.

Instead:

```
React → Backend API → MySQL
```

### What is the difference between MySQL and PostgreSQL?
MySQL

PostgreSQL

Relational database

Object-relational database

Widely used in web applications

Widely used in complex applications

Supports transactions with InnoDB

Strong transactional and advanced SQL capabilities

JSON support

Rich JSON/JSONB support

Good general-purpose choice

Strong advanced querying and extensibility

Both are excellent relational databases.

## Authentication and Authorization

### What is an authentication system?
An authentication system manages the process of identifying users.

Common elements:

- Registration.
- Login.
- Password hashing.
- Session management or token management.
- Logout.
- Password reset.
- Account verification.

### What happens during user registration?

- User submits registration details.
- Backend validates the input.
- Backend checks whether the account already exists.
- Password is securely hashed.
- User details are stored in the database.
- Backend returns a suitable response.
- The frontend displays success or an error.
Important: Never store passwords as plain text.

### What happens during login?

- User enters username/email and password.
- React sends credentials to the backend over HTTPS.
- Backend retrieves the user account.
- Backend verifies the submitted password against its stored password hash.
- If valid, the backend establishes an authenticated session or issues tokens.
- React receives the appropriate authentication response.
- The user can access protected resources according to their permissions.

### What is password hashing?
Password hashing converts a password into a one-way derived value using a password-hashing algorithm.

It is designed so the original password cannot feasibly be recovered from the stored hash.

Common algorithms:

- Argon2.
- bcrypt.
- scrypt.
- PBKDF2.
Django provides password-hashing functionality through its authentication system.

### Difference between hashing, encoding and encryption?
Hashing

Encoding

Encryption

One-way transformation

Changes representation

Reversible with key

No decryption

Decoding reverses it

Decryption reverses it

Used for password verification

Used for data representation

Used for confidentiality

bcrypt, Argon2

Base64

AES

Examples:

- Base64 is encoding, not encryption.
- A JWT is generally signed, not encrypted.

### What is a token?
A token is a piece of data used to represent information or authorize access.

In web authentication, a token is often issued after successful login and presented when accessing protected APIs.

### What is JWT?
JWT stands for JSON Web Token.

It is a compact format for representing claims between parties.

JWT is commonly used for authentication and authorization-related workflows.

A JWT has three parts:

```
HEADER.PAYLOAD.SIGNATURE
```

### Explain the three parts of JWT.
Header

Contains token metadata, commonly the signing algorithm and token type.

Example:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload

Contains claims such as user ID, role, issuer and expiration.

```
{
  "user_id": 101,
  "role": "admin",
  "exp": 1790000000
}
```

Signature

Used to verify that the token has not been altered and was signed using the expected key or secret.

Conceptually:

```
HMACSHA256(
  base64url(header) + "." +
  base64url(payload),
  secret
)
```

### Is JWT encrypted?
No. A normal signed JWT (JWS) is not encrypted.

Its header and payload are Base64URL encoded and can be decoded by anyone who possesses the token.

The signature provides integrity and authenticity verification, not confidentiality.

Never store passwords or sensitive secrets in an ordinary JWT payload.

### What is an access token?
An access token is a credential used to access protected APIs.

It is generally short-lived.

Example:

```
GET /api/customers/
Authorization: Bearer ACCESS_TOKEN
```

The backend validates the token before allowing access.

### What is a refresh token?
A refresh token is a credential used to obtain a new access token after the old access token expires, without asking the user to log in again.

It is generally longer-lived and must be protected carefully.

### Difference between access token and refresh token?
Access token

Refresh token

Accesses protected APIs

Obtains new access tokens

Usually short-lived

Usually longer-lived

Sent with protected API requests

Sent to refresh endpoint

Exposure can allow API access

Exposure can allow continued token renewal

Often expires quickly

Often has longer expiry and revocation controls

### Explain access token and refresh token flow.

1. User Login

Email + Password
2. Backend Authentication

Validates credentials
3. Tokens Issued

Access Token + Refresh Token
4. Access Protected APIs

Send access token
5. Access Token Expires

API returns authentication error
6. Refresh Request

Send refresh token to refresh endpoint
7. New Access Token

Continue accessing APIs

### Why do we need both access and refresh tokens?
If a single long-lived access token is stolen, an attacker may use it for a long period.

Using short-lived access tokens reduces the exposure window.

Refresh tokens allow users to obtain new access tokens without repeatedly entering their passwords.

### What happens when an access token expires?
The protected API should reject the expired token.

The frontend can then:

- Attempt a refresh using a valid refresh token.
- Receive a new access token.
- Retry the original API request once.
- If refreshing fails, clear authentication state and ask the user to log in again.

### What happens when a refresh token expires?
The user can no longer use that refresh token to obtain new access tokens.

The application generally requires the user to authenticate again.

### Can we use JWT without a database?
Yes.

JWT itself does not require a database.

However, applications commonly use databases to store user information, roles, account status and other authentication-related records.

JWT can carry signed claims, but it does not automatically provide revocation or user-account management.

### What is a Bearer token?
A Bearer token is a credential where possession of the token is sufficient to use it, subject to server validation.

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

It should only be transmitted over HTTPS.

### What is a session-based authentication system?
In session-based authentication:

- User logs in.
- Server creates a session.
- Server stores session information.
- Browser receives a session identifier, usually in a cookie.
- Browser sends that cookie with subsequent requests.
- Server looks up the session and identifies the user.

### Difference between session authentication and JWT authentication?
Session authentication

JWT authentication

Server maintains session state

Common signed JWT validation can be stateless

Browser usually stores session ID in cookie

Token may be sent in Authorization header

Server can invalidate stored sessions

Revocation needs additional mechanisms

Session data lives on server

Claims are carried in the token

Neither is automatically more secure. Security depends on implementation, storage, expiration, transport and threat model.

### What is token expiration?
Token expiration defines the time after which a token must no longer be accepted.

JWT commonly uses the `exp` claim.

Example:

```
{
  "user_id": 101,
  "exp": 1790000000
}
```

### What is token revocation?
Token revocation means invalidating a token before its natural expiry.

Common techniques include:

- Refresh-token blacklisting.
- Token revocation records.
- Session invalidation.
- Token rotation.
- Short-lived access tokens.
A self-contained JWT access token may continue to work until expiry unless the server implements an additional revocation mechanism.

### Where should we store JWT tokens in React?
This is a very important interview question.

There are different approaches, each with trade-offs.

Storage

Characteristics

localStorage

Accessible to JavaScript; vulnerable to token theft through XSS

sessionStorage

Also accessible to JavaScript; usually limited to the browser tab session

HttpOnly cookie

Not accessible to JavaScript; automatically sent under applicable cookie rules

In-memory state

Not persisted across page reloads unless restored

A common secure architecture:

- Short-lived access token held in memory.
- Refresh token in a Secure, HttpOnly cookie.
- Appropriate SameSite and CSRF protections.
- HTTPS for all authentication traffic.
The correct design depends on the application architecture and threat model.

### What is logout in JWT authentication?
Logout should clear the frontend's authentication state and invalidate the refresh session or refresh token on the backend where supported.

Simply deleting a JWT from the frontend does not necessarily invalidate an already-issued access token.

### What is role-based authentication?
More accurately, role-based access control (RBAC) is an authorization mechanism.

It assigns permissions to roles and users receive permissions through their assigned roles.

Example:

```
if request.user.role == "admin":    # Allow administrative operation    pass
```

This is only a simplified illustration. Real authorization should use server-side permission checks consistently across endpoints.

### What is the difference between 401 and 403?
401 Unauthorized: The request lacks valid authentication credentials.

403 Forbidden: The server understands the request but refuses to authorize it.

Example:

- An unauthenticated user tries to access a protected endpoint: 401.
- An authenticated Sales Executive tries to access an Admin-only endpoint: 403.

## Cookies and Browser Storage

### What is a cookie?
A cookie is a small piece of data stored by the browser for a website.

Cookies are commonly used for:

- Session management.
- Authentication.
- User preferences.
- Tracking.
Example:

```
Set-Cookie: sessionid=abc123; HttpOnly; Secure; SameSite=Lax
```

The browser automatically sends applicable cookies with matching requests, subject to cookie rules.

### What is the difference between cookies and localStorage?
Cookies

localStorage

Can be sent automatically with HTTP requests

Not automatically sent

Can be HttpOnly

Accessible to JavaScript

Supports expiration and cookie attributes

Stores data until removed or cleared

Commonly used for sessions

Commonly used for client-side persistence

Limited storage capacity

Generally larger storage capacity

### What is an HttpOnly cookie?
An HttpOnly cookie is a cookie that JavaScript cannot read through `document.cookie`.

Example:

```
Set-Cookie: refresh_token=abc123;
HttpOnly;
Secure;
SameSite=Lax;
Path=/api/token/refresh/
```

Advantages:

- Reduces the risk of token theft through JavaScript-based XSS.
- Suitable for storing sensitive session or refresh credentials.
However, HttpOnly does not prevent CSRF attacks.

### What is a Secure cookie?
A Secure cookie is sent by the browser only over secure connections, typically HTTPS.

It helps prevent cookie transmission over unencrypted HTTP.

### What is the SameSite attribute?
SameSite controls when a browser sends a cookie in cross-site contexts.

Three commonly used values:

Value

Meaning

Strict

Restricts cross-site cookie sending

Lax

Allows cookies in certain cross-site top-level navigations

None

Allows cross-site sending, requires Secure

It helps reduce CSRF risks but should not be treated as the only CSRF defense.

## Web Application Security

### What is CSRF?
CSRF stands for Cross-Site Request Forgery.

It is an attack in which an attacker tricks a user's browser into sending an unwanted request to a website where the user is already authenticated.

Example:

- User logs into a banking website.
- Browser stores the authentication cookie.
- User visits a malicious website.
- That website attempts to trigger a money-transfer request to the banking website.
- Browser may automatically attach the authentication cookie.
- Without proper protections, the unwanted request could be accepted.

### How do we prevent CSRF?
Common protections:

- CSRF tokens.
- SameSite cookie configuration.
- Origin and Referer validation where appropriate.
- Avoiding state-changing GET requests.
- Proper CORS configuration as an additional browser access control, not as a replacement for CSRF protection.
Django provides built-in CSRF protection.

### What is a CSRF token?
A CSRF token is a random, unpredictable value used to verify that a state-changing request was initiated through an expected application flow.

In Django, the CSRF token is commonly used with cookie-based authentication.

Example:

```
from django.views.decorators.csrf import csrf_protect@csrf_protectdef transfer_money(request):    # Process validated POST request    pass
```

In a React application using Django session authentication, the frontend needs to obtain the CSRF token and send it in the appropriate header.

Example:

```
fetch("/api/transfer/", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  body: JSON.stringify({
    amount: 500
  })
});
```

The backend must also have the correct CSRF trusted-origin and cookie configuration.

### Difference between CSRF token and JWT?
CSRF token

JWT

Helps prevent CSRF attacks

Token format carrying claims

Validates request intent in a CSRF-protected flow

Used for authentication/authorization workflows

Not necessarily an authentication credential

Can be an access credential

Commonly used with cookie-based authentication

Often sent through Authorization header

A JWT does not automatically prevent CSRF.

If JWT is stored in a cookie and automatically sent by the browser, CSRF protections may still be necessary.

### What is XSS?
XSS stands for Cross-Site Scripting.

It occurs when an attacker injects malicious scripts into a web application and those scripts execute in another user's browser.

Types:

- Stored XSS.
- Reflected XSS.
- DOM-based XSS.

### Difference between CSRF and XSS?
CSRF

XSS

Tricks a browser into making unwanted requests

Injects malicious scripts into a page

Abuses the victim's authenticated browser

Executes attacker-controlled script in the victim's browser

CSRF tokens and SameSite help

Output encoding, sanitization and CSP help

Does not require injecting JavaScript into the target application

Involves script injection or unsafe DOM handling

### What is SQL injection?
SQL injection happens when untrusted input changes the structure or meaning of a database query.

Prevention:

- Parameterized queries.
- Django ORM.
- Input validation.
- Least-privilege database accounts.

### What is HTTPS?
HTTPS stands for HyperText Transfer Protocol Secure.

It uses TLS to protect communication between the client and server.

It provides:

- Encryption.
- Integrity.
- Server authentication through certificates.

### What is TLS?
TLS stands for Transport Layer Security.

It is a cryptographic protocol that provides secure communication over networks.

HTTPS uses TLS to protect HTTP communication.

### What is a brute-force attack?
A brute-force attack involves repeatedly trying different passwords or credentials to gain unauthorized access.

Prevention:

- Rate limiting.
- Account lockout or throttling.
- Strong password policies.
- Multi-factor authentication.
- Monitoring suspicious activity.

### What is rate limiting?
Rate limiting restricts the number of requests a client can make within a specified period.

Example:

An API may allow only 100 requests per minute per user.

It helps prevent abuse and excessive traffic.

### What is multi-factor authentication?
MFA means Multi-Factor Authentication.

It requires two or more independent authentication factors.

Examples:

- Password.
- Authenticator app.
- Hardware security key.
- Biometric verification.
A password plus an OTP is a common example.

### What is the principle of least privilege?
It means users and applications should receive only the minimum permissions required to perform their tasks.

Example:

A Sales Executive should not have permission to delete all CRM users.

### What is input sanitization?
Input sanitization involves transforming or removing unsafe input according to the context in which it will be used.

For example, HTML sanitization removes dangerous markup when rendering user-generated HTML.

Validation and sanitization are related but different:

- Validation checks whether input meets expected rules.
- Sanitization transforms input into an acceptable or safe representation.

### What is a password salt?
A salt is a random value added to a password before password hashing.

It helps ensure that identical passwords produce different stored hashes and makes precomputed hash attacks more difficult.

Modern password-hashing libraries handle salts automatically.

### What is password reset functionality?
A password reset flow allows a user to regain account access without knowing their existing password.

Typical process:

- User enters registered email.
- Backend generates a secure, random, single-use reset token.
- Backend sends a reset link.
- User opens the link.
- Backend validates the token and expiry.
- User submits a new password.
- Backend hashes and saves the new password.
- Reset token is invalidated.

### How do you protect sensitive information in an application?

- Use HTTPS.
- Hash passwords.
- Protect authentication tokens.
- Apply role-based permissions.
- Validate inputs.
- Use secure cookie attributes.
- Avoid exposing secrets in frontend code.
- Apply database access controls.
- Avoid logging passwords and tokens.
- Follow least-privilege principles.

### What is an environment variable?
An environment variable is a configuration value supplied outside the application source code.

Examples:

```
DEBUG=False
SECRET_KEY=your-secret
DATABASE_URL=your-database-url
```

In Django:

```
import osSECRET_KEY = os.environ.get("SECRET_KEY")
```

Never commit actual production secrets into GitHub.

### Why should we not store API secrets in React environment variables?
Because React code is delivered to the browser.

Values included in frontend build bundles can be inspected by users.

Frontend environment variables are suitable for public configuration, such as an API base URL, but not private API keys or database credentials.

### What is secure API development?
Secure API development involves protecting endpoints from unauthorized access, malicious input, data leakage and abuse.

It includes:

- Authentication.
- Authorization.
- Input validation.
- Rate limiting.
- HTTPS.
- Safe database queries.
- Proper error handling.
- Logging and monitoring.

## Practical Full-Stack Integration Questions

### Explain the complete registration flow.

- User enters name, email and password.
- React validates the fields.
- React sends a POST request.
- Django receives the data.
- Serializer validates the data.
- Backend checks duplicate accounts.
- Password is hashed.
- User record is saved in the database.
- Backend returns a success response.
- React displays the registration confirmation.

### Explain how CRUD works in a full-stack application.
CRUD stands for:

- Create.
- Read.
- Update.
- Delete.
Example: Customer management system

Operation

React

HTTP

Django

Database

Create

Add customer form

POST

Create record

INSERT

Read

Customer list

GET

Retrieve records

SELECT

Update

Edit form

PATCH

Update record

UPDATE

Delete

Delete button

DELETE

Remove record

DELETE

### What happens if the backend is not running?
The frontend cannot establish a successful connection to the backend.

The request generally fails with a network error.

The React application should handle this and show a meaningful message, such as:

```
Unable to connect to server. Please try again later.
```

### What happens when the frontend sends incorrect data to the backend?
The backend validates the request.

If the data is invalid, it returns a suitable 4xx response, commonly 400 Bad Request for validation failures.

The frontend reads the response and displays appropriate field-level or general error messages.

Example:

```
{
  "email": ["Enter a valid email address."]
}
```

### What happens when a user directly enters a protected URL?
React Router checks the application's authentication state and can redirect the user to the login page.

However, even if someone bypasses the frontend, the backend must independently verify the credentials and permissions before returning protected data.

### How do you handle expired tokens automatically?
A common approach is to use a centralized API client or request wrapper.

When a request receives an appropriate token-expiration response:

- Check whether refresh is possible.
- Send a refresh request.
- Obtain a new access token.
- Retry the original request once.
- If refresh fails, clear authentication state and redirect to login.
Also handle concurrent requests carefully to avoid multiple simultaneous refresh attempts.

### What happens if two users update the same record simultaneously?
This is a concurrent update problem.

One user's update might overwrite another user's changes.

Solutions include:

- Optimistic locking using a version number.
- Database transactions.
- Row-level locking where appropriate.
- Conflict detection using timestamps or version fields.

### How do you prevent duplicate form submissions?
Possible solutions:

- Disable the submit button while a request is in progress.
- Display a loading indicator.
- Apply server-side idempotency for operations that require it.
- Validate duplicate data on the backend.

### What is pagination in a full-stack application?
Pagination allows the frontend to request a limited number of records from the backend.

Example:

```
/api/customers/?page=1&page_size=10
```

The backend returns the requested page along with relevant pagination metadata.

React displays the records and provides Previous and Next controls.

### How do you implement search in a full-stack application?
React captures the search input.

It sends the search value to the backend as a query parameter.

Example:

```
/api/customers/?search=Adithya
```

Django filters the records and returns matching results.

For large datasets, server-side filtering is generally more efficient than downloading all records and filtering only in React.

### What is API documentation?
API documentation explains how developers can use an API.

It commonly includes:

- Endpoint URLs.
- HTTP methods.
- Request parameters.
- Request body.
- Response format.
- Authentication requirements.
- Status codes.
Common tools include Swagger/OpenAPI and Postman.