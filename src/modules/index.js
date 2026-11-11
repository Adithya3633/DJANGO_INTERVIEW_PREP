import p0 from './part0-roadmap.md?raw'
import p1 from './part1-fundamentals.md?raw'
import p2 from './part2-urls-views.md?raw'
import p3 from './part3-templates.md?raw'
import p4 from './part4-models-orm.md?raw'
import p5 from './part5-drf-basics.md?raw'
import p6 from './part6-drf-crud.md?raw'
import p7 from './part7-auth-security.md?raw'

// To add a module: create a .md file here, import it above, add an entry below.
export const modules = [
  { id: 'roadmap', label: 'Modules', title: 'Django modules', body: p0, quiz: [] },
  {
    id: 'part-1', label: 'Part 1', title: 'Django fundamentals', body: p1,
    quiz: [
      {
        q: 'In Django MVT, which component is responsible for presenting data?',
        options: ['Model', 'View', 'Template', 'URLconf'],
        answer: 2,
      },
      {
        q: 'What does Django ORM let you do?',
        options: [
          'Style HTML pages',
          'Work with database records using Python',
          'Configure URL paths',
          'Compile Python code',
        ],
        answer: 1,
      },
      {
        q: 'What is the relationship between a Django project and its apps?',
        options: [
          'A project can contain multiple apps',
          'An app must contain multiple projects',
          'Projects and apps are the same thing',
          'A project can contain only one app',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 'part-2', label: 'Part 2', title: 'URLs and views', body: p2,
    quiz: [
      {
        q: 'What is a Django View?',
        options: [
          'A file that stores database tables',
          'A function or class that handles requests and returns responses',
          'A file that stores URL patterns',
          'A database management tool',
        ],
        answer: 1,
      },
      {
        q: 'Where does Django expose query parameters from a GET request?',
        options: ['request.POST', 'request.body', 'request.GET', 'request.data'],
        answer: 2,
      },
      {
        q: "What does Django's render() shortcut do?",
        options: [
          'Runs a database migration',
          'Combines a template with context and returns a response',
          'Creates a URL route',
          'Starts the development server',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'part-3', label: 'Part 3', title: 'Templates, DTL and static files', body: p3,
    quiz: [
      {
        q: 'Which syntax displays a variable in DTL?',
        options: ['{% name %}', '{{ name }}', '<% name %>', '(name)'],
        answer: 1,
      },
      {
        q: 'Which DTL filter converts text to uppercase?',
        options: [
          '{{ name|upper }}',
          '{% upper name %}',
          '{{ upper:name }}',
          '<upper>{{ name }}</upper>',
        ],
        answer: 0,
      },
      {
        q: 'What does template inheritance help you do?',
        options: [
          'Reuse a base template and override blocks',
          'Create database tables',
          'Add URL parameters',
          'Serialize model instances',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 'part-4', label: 'Part 4', title: 'Models, ORM and relationships', body: p4,
    quiz: [
      {
        q: 'What relationship does a ForeignKey represent?',
        options: ['One-to-one', 'Many-to-one', 'Many-to-many', 'No relationship'],
        answer: 1,
      },
      {
        q: 'Which command creates migration files from model changes?',
        options: [
          'python manage.py migrate',
          'python manage.py makemigrations',
          'python manage.py runserver',
          'python manage.py createsuperuser',
        ],
        answer: 1,
      },
      {
        q: 'Which ORM method typically fetches ForeignKey data with a SQL JOIN?',
        options: ['prefetch_related()', 'select_related()', 'values_list()', 'distinct()'],
        answer: 1,
      },
    ],
  },
  {
    id: 'part-5', label: 'Part 5', title: 'Django REST Framework basics', body: p5,
    quiz: [
      {
        q: 'What is the purpose of Django REST Framework?',
        options: [
          'Create CSS files',
          'Build REST APIs',
          'Manage operating systems',
          'Create database servers',
        ],
        answer: 1,
      },
      {
        q: 'What can a DRF serializer do?',
        options: [
          'Convert model data to API-friendly data and validate input',
          'Configure Django URL routes',
          'Render CSS styles',
          'Create a database connection',
        ],
        answer: 0,
      },
      {
        q: 'What does serializer.is_valid() do?',
        options: [
          'Applies database migrations',
          'Checks incoming data against serializer validation',
          'Returns all database records',
          'Registers a model in the admin site',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'part-6', label: 'Part 6', title: 'DRF CRUD, ViewSets and routers', body: p6,
    quiz: [
      {
        q: 'Which DRF class provides ready-made CRUD operations?',
        options: ['APIView', 'ModelViewSet', 'HttpResponse', 'Serializer'],
        answer: 1,
      },
      {
        q: 'In a DRF serializer update, what does partial=True allow?',
        options: [
          'Updating only the supplied fields',
          'Skipping all validation',
          'Deleting the object',
          'Returning multiple objects',
        ],
        answer: 0,
      },
      {
        q: 'What does a DRF router commonly generate for a registered ViewSet?',
        options: [
          'Database migrations',
          'URL patterns for its API actions',
          'HTML templates',
          'Serializer fields',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'part-7', label: 'Part 7', title: 'Authentication, JWT and security', body: p7,
    quiz: [
      {
        q: 'What does authentication establish?',
        options: [
          'Which database is configured',
          'Who the user is',
          'Which URL is requested',
          'How a template is rendered',
        ],
        answer: 1,
      },
      {
        q: 'Is a JWT payload encrypted by default?',
        options: [
          'Yes, always',
          'No, it is generally encoded, not encrypted',
          'Only when using HTTPS',
          'Only when it contains a role',
        ],
        answer: 1,
      },
      {
        q: "What does DRF's IsAuthenticated permission require?",
        options: [
          'The request must be from an authenticated user',
          'The user must be a superuser',
          'The endpoint must be public',
          'The request must use a GET method',
        ],
        answer: 0,
      },
    ],
  },
]
