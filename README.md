# Django, React & Full-Stack Interview Prep

A React + Vite learning app with separate Django, React and Full-Stack learning tracks.
Choose a track from the start screen to access its modules and study tools.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run:

```bash
npm run build
```

Requires Node.js 18 or newer.

## Learning tracks

### Django

Includes module navigation, full-text search, code copy buttons, quick quizzes and
a progress tracker saved in your browser.

1. Django fundamentals
2. URLs and views
3. Templates, DTL and static files
4. Models, ORM and relationships
5. Django REST Framework basics
6. DRF CRUD, ViewSets and routers
7. Authentication, JWT, permissions and security

### React

Includes 11 modules of interview questions, searchable study cards, flashcards, and
browser-saved progress.

### Full-Stack Fundamentals

Includes 92 interview questions across frontend/backend fundamentals, database
integration, authentication, browser storage, web security and practical integration.
Its progress is saved separately from the Django and React tracks.

## Project structure

```text
src/
  App.jsx                  learning-track chooser
  DjangoApp.jsx            Django modules, navigation and progress
  styles.css
  components/
    Markdown.jsx           markdown renderer
    Quiz.jsx               quick-check questions
  modules/
    index.js               module list and quiz data
    part0-roadmap.md       Django module overview
    part1-fundamentals.md  Django fundamentals
    part2-urls-views.md    URLs and views
    part3-templates.md     templates, DTL, static files
    part4-models-orm.md    models, ORM, relationships
    part5-drf-basics.md    DRF basics, serializers, APIView
    part6-drf-crud.md      DRF CRUD, ViewSets, routers
    part7-auth-security.md authentication, JWT, permissions, security
  react-learning/
    ReactApp.jsx            React study and flashcard experience
    data.js                 parsed React module content
    content/                11 React interview-prep modules
  fullstack-learning/
    FullstackApp.jsx        Full-stack study path and progress
    data.js                 parsed sections and questions
    content/                full-stack fundamentals material
```

## Adding a module

Create a Markdown file in `src/modules/`, import it in `src/modules/index.js`, and add
an entry to the `modules` array with its title and quiz questions.
