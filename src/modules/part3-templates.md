# Part 3: Django Templates, DTL and Static Files

This part is important for understanding how Django displays dynamic data on HTML pages.

## 1. What is a Django Template?

**Definition:** A Django Template is an HTML file used to display dynamic data to users.

It separates the presentation layer (HTML) from the application logic (Python views).

Example use case: In a student management application, Django retrieves student details from the database and displays them in an HTML page.

View (views.py)

```python
from django.shortcuts import render

def home(request):
    data = {
        'name': 'Adithya',
        'role': 'Python Developer'
    }

    return render(request, 'home.html', data)
```

Template (home.html)

```html
<h1>Welcome {{ name }}</h1>
<p>Role: {{ role }}</p>
```

Output:

```text
Welcome Adithya
Role: Python Developer
```

## 2. What is DTL?

**Definition:** DTL stands for Django Template Language. It is used to display dynamic data and perform basic logic inside Django templates.

DTL supports:

- Variables
- Tags
- Filters
- Comments

## 3. What are Variables in DTL?

Variables are used to display data passed from Django views to templates.

Syntax: `{{ variable_name }}`

```html
<h1>{{ name }}</h1>
<p>{{ email }}</p>
```

If the view sends:

```python
data = {
    'name': 'Adithya',
    'email': 'adithya@gmail.com'
}
```

The template displays those values.

## 4. What are Template Tags?

**Definition:** Template tags are used to perform basic programming operations such as conditions, loops and loading static files inside templates.

Template tags use: `{% %}`

A. If condition

```html
{% if marks >= 40 %}
    <p>Pass</p>
{% else %}
    <p>Fail</p>
{% endif %}
```

B. For loop

```html
{% for student in students %}
    <p>{{ student }}</p>
{% endfor %}
```

View:

```python
def home(request):
    students = ['Adithya', 'Rahul', 'Kiran']

    return render(request, 'home.html', {
        'students': students
    })
```

Output:

```text
Adithya
Rahul
Kiran
```

C. Empty condition

```html
{% for student in students %}
    <p>{{ student }}</p>
{% empty %}
    <p>No students available</p>
{% endfor %}
```

## 5. What are Template Filters?

**Definition:** Template filters modify or format the value of a variable before displaying it.

Filters use the pipe symbol `|`.

| Filter | Purpose | Example |
|---|---|---|
| upper | Converts to uppercase | `{{ name\|upper }}` |
| lower | Converts to lowercase | `{{ name\|lower }}` |
| title | Capitalises words | `{{ name\|title }}` |
| length | Returns length | `{{ name\|length }}` |
| default | Provides fallback value | `{{ name\|default:"Guest" }}` |
| date | Formats date | `{{ date\|date:"d-m-Y" }}` |

Example: `{{ "adithya"|upper }}` gives `ADITHYA`

Difference between tags and filters:

- Tags perform template operations such as loops and conditions.
- Filters modify the appearance or value of variables.

## 6. What is Template Inheritance?

**Definition:** Template inheritance allows multiple HTML pages to reuse a common base template instead of writing the same HTML structure repeatedly.

Real-world use case: An application has multiple pages with the same navbar, footer and sidebar. Instead of repeating them on every page, create one base template.

Step 1: base.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>

    <h1>My Application</h1>

    {% block content %}
    {% endblock %}

    <footer>Copyright 2026</footer>

</body>
</html>
```

Step 2: home.html

```html
{% extends 'base.html' %}

{% block content %}

<h2>Welcome Adithya</h2>
<p>Home Page</p>

{% endblock %}
```

Step 3: about.html

```html
{% extends 'base.html' %}

{% block content %}

<h2>About Us</h2>

{% endblock %}
```

Both pages reuse the same base structure.

**Important interview question: What is the purpose of extends and block?**

- `extends` inherits the structure of another template.
- `block` defines a section that child templates can override.

## 7. What is a Static File in Django?

**Definition:** Static files are files that do not change dynamically based on user requests, such as CSS, JavaScript, images and fonts.

Example project structure:

```text
myproject/
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
│
├── templates/
│   └── home.html
│
└── manage.py
```

settings.py

```python
STATIC_URL = 'static/'
```

home.html

```html
{% load static %}

<link rel="stylesheet"
      href="{% static 'css/style.css' %}">
```

This connects the CSS file to the HTML page.

## 8. What is the difference between Static and Media Files?

| Static Files | Media Files |
|---|---|
| CSS, JS, images used by the application | Files uploaded by users |
| Usually part of application assets | Usually stored separately |
| Example: Website logo | Example: Profile photo |
| Uses STATIC_URL | Uses MEDIA_URL |

Example settings:

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

## 9. What is the difference between render() and redirect()?

- `render()`: Renders an HTML template and returns the response.

```python
return render(request, 'home.html')
```

- `redirect()`: Redirects the user to another URL or named view.

```python
from django.shortcuts import redirect

return redirect('home')
```

| render() | redirect() |
|---|---|
| Displays a template | Sends browser to another URL |
| Usually returns 200 | Usually returns 302 |
| Used to show a page | Used to navigate after an action |

Use case: After successfully submitting a registration form, redirect the user to the login page.

## 10. What is CSRF Token?

**Definition:** CSRF stands for Cross-Site Request Forgery. It is a security mechanism that helps protect Django forms from unauthorised requests made using a user's authenticated browser session.

```html
<form method="POST">
    {% csrf_token %}

    <input type="text" name="username">

    <button type="submit">Submit</button>
</form>
```

Interview point: Django enables CSRF protection through middleware by default.

## Part 3: Important interview questions

Prepare these answers:

1. What is a Django Template?
2. What is DTL?
3. What are template variables?
4. What are template tags?
5. What are template filters?
6. Difference between tags and filters?
7. What is template inheritance?
8. What is the use of extends?
9. What is the purpose of block?
10. What are static files?
11. What are media files?
12. Difference between static and media files?
13. What is {% load static %}?
14. Difference between render and redirect?
15. What is CSRF protection?

## Practical coding practice

Try these five exercises:

1. Display your name and role using DTL variables.
2. Display a list of five student names using a for loop.
3. Display Pass or Fail using an if condition.
4. Create a base.html and inherit it in home.html.
5. Connect a CSS file to a Django template using static files.
