# Part 1: Django Fundamentals

## 1. What is Django?

**Definition:** Django is a high-level, open-source Python web framework used to develop secure, scalable and maintainable web applications quickly.

It follows the MVT (Model-View-Template) architectural pattern.

Why do we use Django?

- Faster development.
- Built-in authentication system.
- Built-in admin panel.
- Database interaction using ORM.
- Security features.
- URL routing.
- Supports REST API development through Django REST Framework.

Example use cases:

- E-commerce applications.
- CRM systems.
- Social media platforms.
- Banking applications.
- Job portals.

## 2. What is a Framework?

A framework is a collection of predefined tools, libraries and rules that helps developers build applications without writing everything from scratch.

Example: Instead of manually creating login functionality, Django provides built-in authentication features that we can customise.

## 3. What is MVT Architecture?

Django follows MVT:

| Component | Definition | Responsibility |
|---|---|---|
| Model | Handles data | Database operations |
| View | Handles application logic | Processes requests |
| Template | Handles presentation | Displays HTML pages |

Example: Student application

- Model: Stores student name, email and marks.
- View: Retrieves student details from the database.
- Template: Displays student details on the webpage.

**Interview question: What is the difference between MVC and MVT?**

- MVC stands for Model-View-Controller.
- MVT stands for Model-View-Template.
- Django's View performs much of the responsibility of the Controller in traditional MVC.
- Django's Template handles the presentation layer.

## 4. What is ORM in Django?

**Definition:** ORM stands for Object Relational Mapper. It allows developers to interact with databases using Python code instead of writing SQL queries manually.

Example:

```python
# SQL approach
SELECT * FROM students;

# Django ORM approach
Student.objects.all()
```

Other examples:

```python
# Insert
Student.objects.create(name="Adithya")

# Retrieve
Student.objects.get(id=1)

# Filter
Student.objects.filter(name="Adithya")

# Update
Student.objects.filter(id=1).update(name="Rahul")

# Delete
Student.objects.filter(id=1).delete()
```

Use case: In a CRM application, ORM helps retrieve customers, create leads, update records and delete unnecessary data.

## 5. What is the difference between Django and Django REST Framework?

| Django | Django REST Framework |
|---|---|
| Python web framework | Django extension for APIs |
| Mainly supports full web applications | Mainly supports REST API development |
| Uses views and templates | Uses serializers and API views |
| Can return HTML responses | Commonly returns JSON responses |

Example:

- Django: Displays a student details webpage.
- DRF: Returns student details as JSON to a React frontend.

## 6. Django Project vs Django App

- **Django Project:** The complete web application containing configuration and multiple apps.
- **Django App:** A specific module responsible for one functionality.

Example: A CRM project can contain:

- `customers` – manages customers.
- `leads` – manages leads.
- `accounts` – manages login and authentication.
- `meetings` – manages meetings.

> Important: One Django project can contain multiple Django apps.

## 7. How to create a Django project?

Installation:

```bash
pip install django
```

Check version:

```bash
django-admin --version
```

Create project:

```bash
django-admin startproject myproject
```

Move into project:

```bash
cd myproject
```

Create app:

```bash
python manage.py startapp students
```

Run migrations:

```bash
python manage.py migrate
```

Start development server:

```bash
python manage.py runserver
```

Default URL: `http://127.0.0.1:8000/`

## 8. Django Project Structure

```text
myproject/
│
├── manage.py
│
└── myproject/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py
```

| File | Purpose |
|---|---|
| manage.py | Executes Django management commands |
| settings.py | Project configuration |
| urls.py | Defines URL routes |
| asgi.py | ASGI server entry point |
| wsgi.py | WSGI server entry point |
| `__init__.py` | Marks directory as Python package |

## 9. Django App Structure

```text
students/
│
├── migrations/
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

| File | Purpose |
|---|---|
| models.py | Defines database models |
| views.py | Contains application logic |
| admin.py | Registers models in admin panel |
| apps.py | App configuration |
| tests.py | Contains test cases |
| migrations/ | Stores database migration files |

> Important: After creating an app, register it inside `INSTALLED_APPS` in `settings.py`.

## 10. Important interview questions

Try to remember these answers.

1. What is Django?
2. Why is Django called a high-level framework?
3. What is MVT architecture?
4. Explain the difference between MVC and MVT.
5. What is ORM?
6. What is the difference between Django and DRF?
7. What is a Django project?
8. What is a Django app?
9. Can one project contain multiple apps?
10. What is the purpose of manage.py?
11. What is settings.py?
12. What is urls.py?
13. What is INSTALLED_APPS?
14. What is the use of migrations?
15. How do you start a Django development server?

## Part 1 completion checklist

- Django definition and use cases
- Framework concept
- MVT architecture
- ORM basics
- Django vs DRF
- Project vs App
- Installation and commands
- Project and App structure
