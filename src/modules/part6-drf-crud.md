# Part 6: DRF Complete CRUD, APIView, ViewSets and Routers

This part builds on Part 5. The goal is to make you comfortable writing REST APIs independently.

## 1. What is CRUD in DRF?

CRUD represents four basic database operations:

| Operation | HTTP method | Purpose |
|---|---|---|
| Create | POST | Insert a record |
| Read | GET | Retrieve records |
| Update | PUT / PATCH | Modify records |
| Delete | DELETE | Remove records |

Example API endpoints:

```text
GET     /api/students/
POST    /api/students/
GET     /api/students/1/
PUT     /api/students/1/
PATCH   /api/students/1/
DELETE  /api/students/1/
```

## 2. Complete CRUD using APIView

Let's build a Student API.

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

Step 3: views.py. This is the important part.

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer


class StudentListView(APIView):

    # GET - Get all students
    def get(self, request):

        students = Student.objects.all()

        serializer = StudentSerializer(
            students,
            many=True
        )

        return Response(serializer.data)


    # POST - Create student
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


class StudentDetailView(APIView):

    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return None

    # GET - Get one student
    def get(self, request, pk):
        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(student)
        return Response(serializer.data)

    # PUT - Update all fields
    def put(self, request, pk):
        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(student, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # PATCH - Update only the given fields
    def patch(self, request, pk):
        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(
            student,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # DELETE - Remove the student
    def delete(self, request, pk):
        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

Step 4: urls.py

```python
from django.urls import path
from .views import StudentListView, StudentDetailView

urlpatterns = [
    path('students/', StudentListView.as_view()),
    path('students/<int:pk>/', StudentDetailView.as_view()),
]
```

### Understand the flow

1. React Frontend: sends HTTP request.
2. Django URL Routing: identifies the correct endpoint.
3. APIView: handles GET / POST / PUT / PATCH / DELETE.
4. Serializer: validates and converts data.
5. Django ORM + Database: stores or retrieves records.

This is a good answer when an interviewer asks: **Explain the backend flow of your CRM project.**

## 3. What is Function-Based API View?

**Definition:** A Function-Based API View is a Python function decorated with DRF decorators to handle HTTP requests.

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def student_list(request):

    students = Student.objects.all()

    serializer = StudentSerializer(
        students,
        many=True
    )

    return Response(serializer.data)
```

For POST:

```python
@api_view(['POST'])
def create_student(request):

    serializer = StudentSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)
```

> Important: `@api_view()` restricts which HTTP methods the function can handle.

## 4. What is a ViewSet?

Important interview topic.

**Definition:** A ViewSet is a DRF class that groups related API operations into a single class instead of defining separate views for each operation.

```python
from rest_framework.viewsets import ModelViewSet

class StudentViewSet(ModelViewSet):

    queryset = Student.objects.all()

    serializer_class = StudentSerializer
```

This small class provides the standard CRUD operations:

- List
- Retrieve
- Create
- Update
- Partial update
- Delete

DRF handles the implementation through its built-in methods.

## 5. What is a Router in DRF?

**Definition:** A Router automatically generates URL patterns for ViewSets.

```python
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

router = DefaultRouter()

router.register(
    'students',
    StudentViewSet,
    basename='student'
)

urlpatterns = router.urls
```

The router automatically generates endpoints such as:

```text
GET       /students/
POST      /students/
GET       /students/1/
PUT       /students/1/
PATCH     /students/1/
DELETE    /students/1/
```

## 6. Difference between APIView, ViewSet and Function-Based API View

| Feature | FBV | APIView | ViewSet |
|---|---|---|---|
| Structure | Function | Class | Class |
| Methods | Decorator | get/post etc. | CRUD actions |
| Code reuse | Limited | Good | Good |
| Automatic CRUD | No | No | Yes, with ModelViewSet |
| Router support | No direct support | No direct support | Yes |

**Interview answer:** APIView gives more control over individual HTTP methods, while ViewSets group related CRUD operations and can use routers to generate URLs automatically.

## 7. What is GenericAPIView?

**Definition:** GenericAPIView is a DRF class that extends APIView and provides commonly used functionality for working with querysets and serializers.

```python
from rest_framework.generics import GenericAPIView

class StudentView(GenericAPIView):

    queryset = Student.objects.all()

    serializer_class = StudentSerializer
```

It is commonly combined with mixins to build reusable CRUD views.

## 8. What are Mixins in DRF?

**Definition:** Mixins are reusable classes that provide predefined actions for common API operations.

| Mixin | Operation |
|---|---|
| ListModelMixin | List records |
| CreateModelMixin | Create records |
| RetrieveModelMixin | Retrieve one record |
| UpdateModelMixin | Update records |
| DestroyModelMixin | Delete records |

```python
from rest_framework import generics, mixins

class StudentListView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView
):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)
```

## 9. What are Generic Views in DRF?

Generic views combine GenericAPIView with predefined mixins to reduce code.

| Class | Purpose |
|---|---|
| ListAPIView | Retrieve all records |
| CreateAPIView | Create records |
| RetrieveAPIView | Retrieve one record |
| UpdateAPIView | Update records |
| DestroyAPIView | Delete records |
| ListCreateAPIView | List and create |
| RetrieveUpdateDestroyAPIView | Retrieve, update and delete |

```python
from rest_framework import generics

class StudentListCreateView(
    generics.ListCreateAPIView
):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
```

This handles GET and POST without writing the methods manually.

## 10. Important HTTP Status Codes

These are frequently asked in technical interviews.

| Code | Meaning | Example |
|---|---|---|
| 200 | OK | Successful GET |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permission |
| 404 | Not Found | Student does not exist |
| 405 | Method Not Allowed | Unsupported HTTP method |
| 500 | Internal Server Error | Unexpected server error |

Important difference: 401 vs 403

- **401:** Authentication is missing or invalid.
- **403:** The user is authenticated but does not have permission to perform the action.

## 11. Frequently Asked Interview Questions

1. What is APIView?
2. What is a Function-Based API View?
3. What is a ViewSet?
4. What is ModelViewSet?
5. What is a Router?
6. What is GenericAPIView?
7. What are Mixins?
8. What are Generic Views?
9. Difference between APIView and ViewSet?
10. Difference between PUT and PATCH?
11. How do you implement CRUD APIs?
12. What is serializer.is_valid()?
13. What does serializer.save() do?
14. What is partial=True?
15. What is many=True?
16. What is get_object()?
17. What is queryset?
18. What is serializer_class?
19. What are HTTP status codes?
20. Difference between 401 and 403?

## 12. Practical Coding Practice

Try these without looking at the solutions.

1. Create a GET API to retrieve all employees.
2. Create a POST API to insert employee details.
3. Create a PUT API to update all employee fields.
4. Create a PATCH API to update only employee salary.
5. Create a DELETE API to delete an employee.
6. Create a ModelViewSet for a Product model.
7. Configure a DefaultRouter for ProductViewSet.
8. Create an API using ListCreateAPIView.
9. Return 404 if a student does not exist.
10. Validate email before saving a student.
