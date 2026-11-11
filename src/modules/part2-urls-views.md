# Part 2: Django URLs and Views

This is one of the most important Django topics because interviewers frequently ask you to write a simple view and connect it to a URL.

## 1. What is URL Routing in Django?

**Definition:** URL routing is the process of mapping a URL requested by the user to a particular view function or class.

In simple words, URL routing decides which function should execute when a user visits a particular URL.

Example: `http://127.0.0.1:8000/students/`

When a user visits `/students/`, Django calls the corresponding view.

## 2. What is urls.py?

**Definition:** `urls.py` is a Django file used to define URL patterns and connect them to views.

```python
# students/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.student_list),
]
```

Here:

- `path()` defines a URL pattern.
- `students/` is the URL.
- `views.student_list` is the function executed.

## 3. What is a View in Django?

**Definition:** A View is a Python function or class that receives an HTTP request, processes the required logic and returns an HTTP response.

There are two main types:

- Function-Based Views (FBV).
- Class-Based Views (CBV).

## 4. Function-Based Views (FBV)

**Definition:** A Function-Based View is a normal Python function that handles HTTP requests and returns HTTP responses.

```python
# views.py

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Django")
```

URL configuration:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
]
```

When we open the homepage, the browser displays: `Welcome to Django`

Use case: Simple pages, custom request handling and small functionalities.

## 5. What is HttpResponse()?

**Definition:** `HttpResponse()` is used to return an HTTP response to the client, usually containing text or HTML content.

```python
from django.http import HttpResponse

def about(request):
    return HttpResponse("About Us Page")
```

Output: `About Us Page`

## 6. What is render()?

**Definition:** `render()` is a Django shortcut used to combine an HTML template with context data and return an HTTP response.

```python
from django.shortcuts import render

def home(request):
    data = {
        'name': 'Adithya',
        'role': 'Python Developer'
    }

    return render(request, 'home.html', data)
```

home.html:

```html
<h1>Hello {{ name }}</h1>
<p>{{ role }}</p>
```

Output:

```text
Hello Adithya
Python Developer
```

Difference between HttpResponse and render:

| HttpResponse | render |
|---|---|
| Returns response content directly | Renders an HTML template |
| Can return plain text or HTML | Supports template variables |
| Does not automatically load templates | Loads and processes templates |

## 7. What is request in Django?

**Definition:** `request` is an object that contains information about the incoming HTTP request sent by the client.

It provides information such as:

- HTTP method.
- Form data.
- Query parameters.
- Request headers.
- User information.

```python
def home(request):
    print(request.method)
    return HttpResponse("Hello")
```

If the browser sends a GET request, output is: `GET`

## 8. What are GET and POST methods?

- **GET:** Used to retrieve data from the server.
- **POST:** Used to send data to the server, commonly for creating or submitting information.

```python
from django.http import HttpResponse

def student(request):

    if request.method == 'GET':
        return HttpResponse("Getting student data")

    elif request.method == 'POST':
        return HttpResponse("Student data submitted")
```

| GET | POST |
|---|---|
| Retrieves data | Submits data |
| Parameters commonly appear in URL | Data commonly sent in request body |
| Can be cached | Not normally cached by default |
| Should not change server state | Commonly changes server state |

## 9. What is request.GET?

Used to access query parameters sent through a GET request.

Example URL: `/students/?name=Adithya`

```python
def student(request):
    name = request.GET.get('name')
    return HttpResponse(name)
```

Output: `Adithya`

## 10. What is request.POST?

Used to access form data submitted through a POST request.

```python
def student(request):

    if request.method == 'POST':
        name = request.POST.get('name')
        return HttpResponse(name)

    return HttpResponse("Send student details")
```

> Important: For POST forms, Django normally requires a CSRF token.

```html
<form method="POST">
    {% csrf_token %}

    <input type="text" name="name">

    <button type="submit">Submit</button>
</form>
```

## 11. What is include() in Django?

**Definition:** `include()` is used to connect an app's URL configuration to the main project URL configuration.

Project urls.py:

```python
from django.urls import path, include

urlpatterns = [
    path('students/', include('students.urls')),
]
```

App students/urls.py:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_list),
]
```

Now visiting `/students/` executes `student_list()`.

Why use include()? It keeps URL configurations modular and organised, especially when a project contains multiple apps.

## 12. What is a Class-Based View (CBV)?

**Definition:** A Class-Based View is a Python class used to handle HTTP requests through methods such as `get()` and `post()`.

```python
from django.views import View
from django.http import HttpResponse

class HomeView(View):

    def get(self, request):
        return HttpResponse("GET Request")

    def post(self, request):
        return HttpResponse("POST Request")
```

URL configuration:

```python
path('', HomeView.as_view())
```

| FBV | CBV |
|---|---|
| Uses Python functions | Uses Python classes |
| Simple to understand | Supports inheritance |
| Uses if conditions for methods | Uses separate methods like get/post |
| Good for simple custom logic | Useful for reusable and structured views |

## 13. Important practical coding questions

Try these yourself after studying the examples.

1. Create a Django view that returns Hello World.
2. Create a view that displays your name and role.
3. Create a view that reads a name from a GET request.
4. Create a view that accepts name and email through POST.
5. Create a view that returns different responses for GET and POST.
6. Create two URLs for home and about pages.
7. Connect app URLs to project URLs using include().
8. Create a Class-Based View with GET and POST methods.

## 14. Interview questions: Part 2

These are especially important:

1. What is URL routing?
2. What is the purpose of urls.py?
3. What is a Django View?
4. What is the difference between FBV and CBV?
5. What is HttpResponse()?
6. What is render()?
7. Difference between render() and redirect()?
8. What is the request object?
9. Difference between GET and POST?
10. What is request.GET?
11. What is request.POST?
12. What is include()?
13. What is as_view()?
14. What is CSRF?
15. Can one view handle multiple HTTP methods?
