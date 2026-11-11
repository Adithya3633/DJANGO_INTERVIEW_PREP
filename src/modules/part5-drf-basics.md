# Part 5: Django REST Framework (DRF)

High-priority interview topic. Since your CRM project uses React + Django REST Framework, you should be able to explain the complete flow from React to Django to the database.

## 1. What is an API?

**Definition:** API stands for Application Programming Interface. It allows two different software applications to communicate and exchange data.

Example: Imagine a React application displaying student details.

1. React requests student data.
2. Django receives the request.
3. Django retrieves student details from the database.
4. Django sends the data back to React.

Real-world examples:

- Payment gateway APIs.
- Weather APIs.
- Login APIs.
- E-commerce APIs.

## 2. What is REST API?

**Definition:** REST stands for Representational State Transfer. It is an architectural style used to design web APIs that communicate over HTTP.

REST APIs commonly exchange data in JSON format. Important REST principles:

- Client-server architecture.
- Stateless communication.
- Cacheability where appropriate.
- Uniform interface.
- Layered system.

```text
GET    /api/students/
POST   /api/students/
GET    /api/students/1/
PUT    /api/students/1/
DELETE /api/students/1/
```

These endpoints perform different operations on student records.

## 3. What is Django REST Framework?

**Definition:** Django REST Framework (DRF) is a powerful toolkit built on top of Django that helps developers build REST APIs using Python.

Why do we use DRF?

- Provides serializers.
- Supports API views.
- Handles JSON responses.
- Supports authentication.
- Provides permissions.
- Supports CRUD operations.
- Provides browsable API.

| Django | DRF |
|---|---|
| Web framework | API development toolkit |
| Commonly renders HTML | Commonly returns JSON |
| Uses Django views | Uses APIView, ViewSets, etc. |
| Has built-in authentication | Extends authentication for APIs |

Installation:

```bash
pip install djangorestframework
```

Add to settings.py:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'students',
]
```

## 4. What is JSON?

**Definition:** JSON stands for JavaScript Object Notation. It is a lightweight data format used to exchange information between applications.

```json
{
    "id": 1,
    "name": "Adithya",
    "email": "adithya@gmail.com",
    "age": 22
}
```

Why JSON?

- Lightweight.
- Easy to understand.
- Language-independent.
- Supported by JavaScript, Python and many other languages.

> Important: JSON is a data format, not a programming language.

## 5. What is Serialization?

**Definition:** Serialization is the process of converting complex data, such as Python objects or Django model instances, into a format such as JSON that can be transmitted or stored.

```python
student = {
    "name": "Adithya",
    "age": 22
}
```

The data can be represented in JSON:

```json
{
    "name": "Adithya",
    "age": 22
}
```

## 6. What is Deserialization?

**Definition:** Deserialization is the process of converting incoming data, such as JSON, into Python data that the application can validate and process.

Example: React sends:

```json
{
    "name": "Adithya",
    "age": 22
}
```

Django receives the data and converts it into validated Python data.

| Serialization | Deserialization |
|---|---|
| Python object to JSON-compatible data | Incoming data to Python data |
| Used when sending responses | Used when receiving requests |
| Converts data outward | Converts data inward |

## 7. What is a Serializer in DRF?

Very important.

**Definition:** A Serializer is used to convert complex data types, such as Django model instances, into Python-native data types that can be rendered as JSON. It also validates incoming data.

models.py

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
```

serializers.py

```python
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'
```

Explanation:

- `serializers.py` contains serializer classes.
- `ModelSerializer` automatically generates fields based on the model.
- `model = Student` connects the serializer to the model.
- `fields = '__all__'` includes all model fields.

## 8. What is ModelSerializer?

**Definition:** ModelSerializer is a DRF class that automatically creates serializer fields based on a Django model.

```python
class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ['id', 'name', 'email']
```

Advantages:

- Less code.
- Automatic field generation.
- Built-in validation.
- Supports create and update operations.

## 9. Difference between Serializer and ModelSerializer

| Serializer | ModelSerializer |
|---|---|
| Fields are defined manually | Fields are generated from models |
| More control | Less code |
| Does not automatically map to a model | Designed to work with Django models |
| Useful for custom data | Useful for model-based APIs |

Example of a regular Serializer:

```python
from rest_framework import serializers

class StudentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    age = serializers.IntegerField()
```

**Interview question: When do you use ModelSerializer?** When building APIs that work with Django models and database records.

## 10. What is APIView?

**Definition:** APIView is a class provided by Django REST Framework used to build API endpoints by defining methods for HTTP requests.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class StudentView(APIView):

    def get(self, request):
        return Response({
            "message": "Getting student data"
        })

    def post(self, request):
        return Response({
            "message": "Student created"
        })
```

URL configuration:

```python
from django.urls import path
from .views import StudentView

urlpatterns = [
    path('students/', StudentView.as_view()),
]
```

> Important: APIView handles HTTP requests and provides DRF features such as authentication, permissions and response handling.

## 11. What is Response in DRF?

**Definition:** Response is a DRF class used to return API response data, commonly in JSON format.

```python
from rest_framework.response import Response

def student_data(request):
    return Response({
        "name": "Adithya",
        "role": "Developer"
    })
```

In practice, this should be used within a DRF view.

| HttpResponse | DRF Response |
|---|---|
| Provided by Django | Provided by DRF |
| Returns HTTP content | Returns unrendered data |
| Does not provide DRF content negotiation | Supports content negotiation |
| Used in normal Django views | Used in DRF views |

## 12. What are HTTP Methods in REST APIs?

This is extremely important.

| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve data | Get all students |
| POST | Create data | Add a student |
| PUT | Completely update a resource | Replace student details |
| PATCH | Partially update a resource | Update only email |
| DELETE | Delete data | Delete a student |

```text
GET     /api/students/
POST    /api/students/
PUT     /api/students/1/
PATCH   /api/students/1/
DELETE  /api/students/1/
```

PUT vs PATCH:

- PUT generally replaces the complete resource representation.
- PATCH updates only the specified fields.

## 13. Complete CRUD API: Practical Example

Now let's combine models, serializers, APIView and ORM. This is one of the most useful exercises for your interview.

Step 1: models.py

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()

    def __str__(self):
        return self.name
```

Step 2: serializers.py

```python
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'
```

Step 3: views.py

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer


class StudentView(APIView):

    # GET - Retrieve all students
    def get(self, request):
        students = Student.objects.all()

        serializer = StudentSerializer(
            students, many=True
        )

        return Response(serializer.data)

    # POST - Create a student
    def post(self, request):
        serializer = StudentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
```

Step 4: urls.py

```python
from django.urls import path
from .views import StudentView

urlpatterns = [
    path('students/', StudentView.as_view()),
]
```

Step 5: Test API

```text
GET http://127.0.0.1:8000/api/students/
```

POST request:

```json
{
    "name": "Adithya",
    "email": "adithya@gmail.com",
    "age": 22
}
```

Expected response:

```json
{
    "id": 1,
    "name": "Adithya",
    "email": "adithya@gmail.com",
    "age": 22
}
```

**Important interview explanation:** When React sends a POST request, Django receives the JSON data through `request.data`. The serializer validates the incoming data. If the data is valid, `serializer.save()` creates a database record. Finally, DRF returns the saved data as a JSON response.

## 14. Important DRF Interview Questions

1. What is an API?
2. What is REST API?
3. What is DRF?
4. What is JSON?
5. What is serialization?
6. What is deserialization?
7. What is a Serializer?
8. What is ModelSerializer?
9. Difference between Serializer and ModelSerializer?
10. What is APIView?
11. What is request.data?
12. What is serializer.data?
13. What is serializer.is_valid()?
14. What is serializer.save()?
15. What is Response?
16. Difference between HttpResponse and Response?
17. Difference between PUT and PATCH?
18. What is many=True?
19. What is status.HTTP_201_CREATED?
20. How do you create CRUD APIs in Django?
