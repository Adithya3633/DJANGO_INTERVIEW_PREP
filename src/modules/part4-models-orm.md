# Part 4: Django Models, Database, ORM and Relationships

Very important for Django technical interviews.

You should be able to:

- Create Django models.
- Understand database fields.
- Perform CRUD operations.
- Write ORM queries.
- Explain database relationships.
- Understand migrations.
- Connect Django with PostgreSQL or MySQL.

## 1. What is a Model in Django?

**Definition:** A Model is a Python class that represents a database table. It defines the structure of the table, including its fields and relationships.

Django uses ORM to convert model operations into SQL queries.

Example: Student model

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
```

Django creates a database table with these columns:

| id | name | email | age |
|---|---|---|---|
| 1 | Adithya | adithya@gmail.com | 22 |
| 2 | Rahul | rahul@gmail.com | 23 |

> Important: Django automatically creates an `id` primary key if you don't define one.

## 2. What are Model Fields?

**Definition:** Model fields define the type of data stored in each database column.

| Field | Purpose | Example |
|---|---|---|
| CharField | Short text | Name |
| TextField | Long text | Description |
| IntegerField | Integer values | Age |
| FloatField | Decimal values | Rating |
| DecimalField | Precise decimal values | Price |
| BooleanField | True/False | Is active |
| EmailField | Email address | Email |
| DateField | Date | DOB |
| DateTimeField | Date and time | Created date |
| FileField | Uploaded file | Document |
| ImageField | Uploaded image | Profile photo |
| ForeignKey | Many-to-one relationship | Customer |

```python
class Employee(models.Model):
    name = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    joining_date = models.DateField()
```

## 3. What is Primary Key?

**Definition:** A Primary Key is a field that uniquely identifies each record in a database table.

| id | name |
|---|---|
| 1 | Adithya |
| 2 | Rahul |
| 3 | Kiran |

Here, `id` is the primary key. In Django:

```python
id = models.AutoField(primary_key=True)
```

Django creates an automatic primary key if one isn't explicitly defined.

**Interview question: Can a primary key contain duplicate values?** No. A primary key must be unique and cannot contain NULL values.

## 4. What is Foreign Key?

**Definition:** A Foreign Key establishes a relationship between two database tables. It references the primary key of another table.

Example: Department and Employee. One department can have multiple employees.

```python
class Department(models.Model):
    name = models.CharField(max_length=100)


class Employee(models.Model):
    name = models.CharField(max_length=100)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )
```

Here:

- Department is the parent table.
- Employee is the child table.
- Each employee belongs to one department.
- A department can have multiple employees.

**What is on_delete=models.CASCADE?** When the referenced department is deleted, its associated employee records are also deleted.

Other important options:

| Option | Meaning |
|---|---|
| CASCADE | Delete related records |
| PROTECT | Prevent deletion if related records exist |
| SET_NULL | Set foreign key to NULL |
| SET_DEFAULT | Set the default value |
| DO_NOTHING | Take no automatic action |

For `SET_NULL`, the field must have `null=True`.

## 5. Types of Database Relationships

### A. One-to-One Relationship

One record in table A is associated with one record in table B. Example: One user has one profile.

```python
class Profile(models.Model):
    user = models.OneToOneField(
        'auth.User',
        on_delete=models.CASCADE
    )
    phone = models.CharField(max_length=15)
```

Use case: User and profile details.

### B. One-to-Many Relationship

One record in table A can be associated with multiple records in table B. Example: One department has multiple employees.

```python
department = models.ForeignKey(
    Department,
    on_delete=models.CASCADE
)
```

Use case: One customer can have multiple orders.

### C. Many-to-Many Relationship

Multiple records in table A can be associated with multiple records in table B. Example: One student can enrol in multiple courses, and one course can have multiple students.

```python
class Course(models.Model):
    name = models.CharField(max_length=100)


class Student(models.Model):
    name = models.CharField(max_length=100)

    courses = models.ManyToManyField(Course)
```

Use case: Students and courses, employees and projects.

**Important interview question: What is the difference between ForeignKey and ManyToManyField?**

- ForeignKey represents a many-to-one relationship.
- ManyToManyField represents a many-to-many relationship.

## 6. What are Django Migrations?

**Definition:** Migrations are files that record changes made to Django models and apply those changes to the database schema.

Whenever we create or modify a model, we generally need migrations. Two important commands:

Step 1: makemigrations. Creates migration files based on model changes.

```bash
python manage.py makemigrations
```

Step 2: migrate. Applies migration files to the database.

```bash
python manage.py migrate
```

| makemigrations | migrate |
|---|---|
| Creates migration files | Applies migrations |
| Detects model changes | Updates database schema |
| Does not itself update the database schema | Executes database changes |

Other useful commands:

```bash
python manage.py showmigrations      # shows migration status
python manage.py sqlmigrate students 0001   # shows the SQL for a migration
```

## 7. What is Django ORM?

**Definition:** ORM stands for Object Relational Mapping. It allows developers to interact with relational databases using Python objects instead of writing SQL queries manually.

```python
# SQL:  SELECT * FROM students;
Student.objects.all()
```

Advantages:

- Less manual SQL.
- Easier database operations.
- Database portability.
- Supports relationships.
- Helps reduce SQL injection risks when used correctly.

## 8. What is CRUD Operations in Django?

CRUD stands for Create, Read, Update, Delete. We use this model:

```python
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
```

### A. CREATE: insert data

```python
Student.objects.create(
    name="Adithya",
    email="adithya@gmail.com",
    age=22
)
```

Alternative:

```python
student = Student(
    name="Rahul",
    email="rahul@gmail.com",
    age=23
)

student.save()
```

- `create()` creates and saves the object immediately.
- `save()` saves an existing model instance or inserts a new one.

### B. READ: retrieve data

```python
Student.objects.all()            # all records
Student.objects.get(id=1)        # one record
Student.objects.filter(age=22)   # filter records
Student.objects.first()          # first record
Student.objects.last()           # last record
```

Important difference: get() vs filter()

| get() | filter() |
|---|---|
| Returns one object | Returns a QuerySet |
| Expects one matching result | Can return multiple results |
| Raises DoesNotExist if none found | Returns an empty QuerySet |
| Raises MultipleObjectsReturned if multiple match | Handles multiple matches |

### C. UPDATE: modify data

```python
student = Student.objects.get(id=1)

student.name = "Adithya Vardhan"

student.save()
```

Alternative:

```python
Student.objects.filter(id=1).update(
    name="Adithya Vardhan"
)
```

### D. DELETE: remove data

```python
student = Student.objects.get(id=1)

student.delete()
```

Delete all records (be careful, this deletes every student record):

```python
Student.objects.all().delete()
```

## 9. Important Django ORM Query Methods

These are frequently asked in interviews.

| Method | Purpose |
|---|---|
| all() | Retrieve all records |
| get() | Retrieve one object |
| filter() | Filter records |
| exclude() | Exclude matching records |
| create() | Create a record |
| update() | Update records |
| delete() | Delete records |
| count() | Count records |
| exists() | Check whether records exist |
| first() | Get first record |
| last() | Get last record |
| order_by() | Sort records |
| values() | Retrieve selected fields as dictionaries |
| distinct() | Remove duplicate rows |

```python
Student.objects.filter(age=22)                       # filter by age
Student.objects.filter(age__gt=20)                   # greater than 20
Student.objects.filter(age__lt=25)                   # less than 25
Student.objects.filter(age__gte=22)                  # greater than or equal to 22
Student.objects.filter(name__startswith='A')         # name starts with A
Student.objects.filter(email__icontains='gmail')     # email contains gmail
Student.objects.order_by('age')                      # sort by age
Student.objects.order_by('-age')                     # descending order
Student.objects.count()                              # count students
Student.objects.filter(age=22).exists()              # check if records exist
```

## 10. What is QuerySet?

**Definition:** A QuerySet is a collection of database objects returned by Django ORM queries.

```python
students = Student.objects.filter(age=22)
```

Here, `students` is a QuerySet. Important characteristics:

- QuerySets are generally lazy.
- They execute database queries when evaluated.
- They can be filtered, ordered and sliced.
- They can contain zero or multiple objects.

**What is Lazy Evaluation?** Lazy evaluation means Django does not execute a QuerySet's database query immediately when it is created. It executes when the results are actually needed.

```python
students = Student.objects.all()   # query is generally not executed yet

for student in students:           # now Django evaluates the QuerySet
    print(student.name)
```

## 11. What is Django Admin?

**Definition:** Django Admin is a built-in administrative interface that allows authorised users to manage database records without writing custom management pages.

First create a superuser:

```bash
python manage.py createsuperuser
```

Register the model in admin.py:

```python
from django.contrib import admin
from .models import Student

admin.site.register(Student)
```

Run the server and open `http://127.0.0.1:8000/admin/`. You can add, view, update and delete student records through the admin interface.

## 12. What is null=True and blank=True?

This is a common interview question.

- `null=True`: Allows a database column to store NULL.
- `blank=True`: Allows a field to be empty during form or model validation.

```python
phone = models.CharField(
    max_length=15,
    null=True,
    blank=True
)
```

| null=True | blank=True |
|---|---|
| Database level | Validation level |
| Allows NULL in database | Allows empty input |

Interview tip: For optional string fields, Django commonly uses `blank=True` without `null=True`, storing empty strings instead of NULL.

## 13. What is default in Django Models?

**Definition:** `default` specifies the value assigned to a model field when no value is provided.

```python
class Employee(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
```

If no value is provided for `is_active`, it defaults to True.

## 14. What are auto_now and auto_now_add?

Used with DateTimeField or DateField.

- `auto_now_add`: Sets the current date/time when a record is first created.
- `auto_now`: Updates the date/time whenever the model instance is saved.

```python
class Student(models.Model):
    name = models.CharField(max_length=100)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )
```

Use case: Tracking when a customer was created and last updated in a CRM.

## 15. What is `__str__()` in Django?

**Definition:** `__str__()` is a special Python method that defines the human-readable string representation of a model object.

```python
class Student(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
```

Without `__str__()`, the admin panel may display generic object names. With it, the student name is displayed.

## 16. What is select_related()?

**Definition:** `select_related()` is a Django ORM method used to retrieve related objects using a SQL JOIN in a single database query.

It is mainly used for ForeignKey and OneToOneField relationships.

```python
employees = Employee.objects.select_related(
    'department'
)

for emp in employees:
    print(emp.name, emp.department.name)
```

Why use it? Without `select_related()`, Django may execute separate queries when accessing each employee's department. With it, Django fetches the related department data using a JOIN.

## 17. What is prefetch_related()?

**Definition:** `prefetch_related()` retrieves related objects using separate database queries and combines the results in Python.

It is mainly useful for ManyToManyField and reverse ForeignKey relationships.

```python
students = Student.objects.prefetch_related(
    'courses'
)

for student in students:
    for course in student.courses.all():
        print(course.name)
```

| select_related() | prefetch_related() |
|---|---|
| Uses SQL JOIN | Uses separate queries |
| ForeignKey and OneToOne | ManyToMany and reverse ForeignKey |
| Single SQL query in typical use | Multiple SQL queries |

## 18. What is Database Connection in Django?

Django supports multiple databases, including SQLite, PostgreSQL and MySQL. Database configuration is defined in `settings.py`.

Example: PostgreSQL

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Install PostgreSQL driver:

```bash
pip install psycopg
```

- **Which database does Django use by default?** SQLite.
- **Can Django work with MySQL and PostgreSQL?** Yes. Django supports both databases through database backend configurations.

## 19. What is the difference between SQL and Django ORM?

| SQL | Django ORM |
|---|---|
| Structured Query Language | Object Relational Mapper |
| Uses SQL queries | Uses Python code |
| Database-specific syntax can vary | Abstracts many database differences |
| Manual query writing | ORM generates queries |
| Example: SELECT * FROM student | Student.objects.all() |

> Important: ORM does not mean SQL is unnecessary. Understanding SQL helps you write efficient ORM queries and debug database issues.

## 20. Practical Example: CRM Database Models

Let's connect these concepts to your CRM project. Imagine a CRM application with customers and leads.

models.py

```python
from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class Lead(models.Model):
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    source = models.CharField(max_length=100)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.source
```

Explanation:

- Customer stores customer information.
- Lead stores potential business opportunities.
- ForeignKey connects a lead to a customer.
- One customer can have multiple leads.

Example ORM:

```python
# Create customer
customer = Customer.objects.create(
    name="Adithya",
    email="adithya@gmail.com",
    phone="9876543210"
)

# Create lead
Lead.objects.create(
    customer=customer,
    source="Website",
    status="New"
)

# Retrieve all leads
leads = Lead.objects.all()

# Retrieve customer leads
leads = Lead.objects.filter(
    customer__name="Adithya"
)
```

## 21. Most Important Django Interview Questions

Prepare these answers properly to revise the core database and ORM concepts.

1. What is a Django Model?
2. What is ORM?
3. What are model fields?
4. What is a Primary Key?
5. What is a Foreign Key?
6. Explain One-to-One relationship.
7. Explain One-to-Many relationship.
8. Explain Many-to-Many relationship.
9. What is on_delete?
10. What is CASCADE?
11. What are migrations?
12. Difference between makemigrations and migrate?
13. What is CRUD?
14. Difference between get() and filter()?
15. Difference between create() and save()?
16. What is QuerySet?
17. What is lazy evaluation?
18. Difference between update() and save()?
19. What is order_by()?
20. What is exclude()?
21. What is select_related()?
22. What is prefetch_related()?
23. Difference between null and blank?
24. What is auto_now_add?
25. What is __str__()?
26. What is Django Admin?
27. What is a superuser?
28. Which database does Django use by default?
29. How do you connect PostgreSQL with Django?
30. Difference between SQL and ORM?

## 22. Practical Coding Questions

Try writing these without looking at the notes.

### Beginner level

1. Create an Employee model with name, age, email and salary.
2. Create a Student model with name and marks.
3. Insert five student records using ORM.
4. Retrieve all students.
5. Retrieve a student using ID.
6. Filter employees whose salary is greater than 30,000.
7. Update an employee's salary.
8. Delete a student using ID.
9. Count the total number of employees.
10. Retrieve employees in descending order of salary.

### Intermediate level

1. Create Department and Employee models using ForeignKey.
2. Create Student and Course models using ManyToManyField.
3. Retrieve all employees belonging to a particular department.
4. Find students whose names start with A.
5. Retrieve employees with salary between 20,000 and 50,000.
6. Use select_related() to retrieve employee and department details.
7. Use prefetch_related() to retrieve students and courses.
8. Create a model with created_at and updated_at fields.
9. Implement a model with an optional phone number.
10. Explain the complete migration process.

## 23. Quick Revision: Commands

Keep these commands handy for practical exercises.

| Command | Purpose |
|---|---|
| python manage.py startapp appname | Create app |
| python manage.py makemigrations | Create migrations |
| python manage.py migrate | Apply migrations |
| python manage.py showmigrations | Show migration status |
| python manage.py createsuperuser | Create admin user |
| python manage.py runserver | Start server |
| python manage.py shell | Open Django shell |
| python manage.py sqlmigrate app 0001 | Show migration SQL |

## 24. What you must be able to explain in the interview

These five areas deserve extra attention:

1. **Priority 1, ORM and CRUD:** Write create, retrieve, update and delete queries without help.
2. **Priority 2, Database relationships:** Explain ForeignKey, OneToOneField and ManyToManyField with examples.
3. **Priority 3, Migrations:** Understand how model changes reach the database.
4. **Priority 4, Query optimisation:** Understand QuerySets, lazy evaluation, select_related and prefetch_related.
5. **Priority 5, Practical models:** Practise creating Customer, Employee, Department and Lead models.

Don't just read Part 4. Practise the CRUD operations in the Django shell at least once. These are easy opportunities to demonstrate practical knowledge.
