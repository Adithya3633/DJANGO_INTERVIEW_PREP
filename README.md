# Django Modules

A React + Vite study app for learning Django and Django REST Framework. It includes
module navigation, full-text search, code copy buttons, quick quizzes and a progress
tracker saved in your browser.

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

## Modules

1. Django fundamentals
2. URLs and views
3. Templates, DTL and static files
4. Models, ORM and relationships
5. Django REST Framework basics
6. DRF CRUD, ViewSets and routers
7. Authentication, JWT, permissions and security

## Project structure

```text
src/
  App.jsx                  sidebar, search, progress, navigation
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
```

## Adding a module

Create a Markdown file in `src/modules/`, import it in `src/modules/index.js`, and add
an entry to the `modules` array with its title and quiz questions.
