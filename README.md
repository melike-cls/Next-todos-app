# Simple ToDo App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Tasks

-   Build the design according to `design.png` (you can choose any colors and any icons by yourself)

    User should be able to:

-   create new todo
-   remove todo
-   add memo to todo
-   pin the todo

## API

**Create ToDo**

    POST /api/tasks

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `title`   | `string` | **Required**. ToDo Title |
| `memo`    | `string` | **Optional**. ToDo Memo  |

**CURL Example:**

    curl -X POST http://localhost:3000/api/tasks
           -H 'Content-Type: application/json'
           -d '{ "title": "Example ToDo Updated", "memo": "Example Memo Text" }'

**Response**

```javascript
{
	"id" : number,
	"title" : string,
	"memo" : string,
	"checked" : bool,
	"pinned" : bool
}
```

---

**Get ToDo List**

    GET /api/tasks

**CURL Example:**

    curl -X GET http://localhost:3000/api/tasks

**Response**

```javascript
;[
	{
		id: number,
		title: string,
		memo: string,
		checked: bool,
		pinned: bool,
	},
	{
		id: number,
		title: string,
		memo: string,
		checked: bool,
		pinned: bool,
	},
]
```

---

**Get ToDo Detail**

    GET /api/tasks/:id

**CURL Example:**

    curl -X POST http://localhost:3000/api/tasks/1643718674442
         -H 'Content-Type: application/json'
         -d '{ "title": "Example Todo" }'

---

**Update ToDo**

    PATCH /api/tasks/:id

**CURL Example:**

    curl -X PATCH http://localhost:3000/api/tasks/1643718674442
           -H 'Content-Type: application/json'
           -d '{ "title": "Example ToDo Updated" }'

---

**Delete ToDo**

    DELETE /api/tasks/:id

**Types:** `title`

**CURL Example:**

    curl -X DELETE http://localhost:3000/api/tasks/1643718674442
