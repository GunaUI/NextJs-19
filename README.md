# NextJs-19

* NextJs is a library building up on react and you'll still be writing a react application
with it, it's not an extra library framework or syntax.

* Nextjs is a minimalistic framework for a server rendered react applications.

* Server side rendering simply means that when a user enters a URL leading to your react app or one of your pages of your react app, it will pre-render that page on the server so that the server returns that pre-rendered html code,

* If you now visit your server for the first time, so you load the page for the first time, the server would typically ship you the index.html file and your code and then you would load it as a single page application in your client.

* The problem can be that if your page needs to be crawlable by search engines, crawlers like the google crawler might not really understand or read your page correctly, especially if you are using asynchronous code to load the initial content.

* So if you have a page where the first thing you do in javascript is you reach out to a server and then
render the results to the screen when the data is back,that might happen super fast to the user but the crawler will only see the spinner or whatever you are
showing until the data is there.

* Now with server side rendering, for the first page load which is always what the crawler sees, the server will fetch and render the react app so it won't just fetch and return it, it also renders it for that page you visited and then it returns that pre-rendered page along with the
react app bundle so that from this point on, you still have a single page application so you then still work as before.

* It's just about that initial page load essentially, now nextjs is a package helping you with server side rendering because that is super tricky to set up.
And besides just helping you with it, it gives you a custom or a specific structure to work in. This structure takes advantage of enforcing a strict folder structure you have to use though we're only talking about one folder mainly which has to be named in a certain way, so that all
the routes of your application are actually generated automatically.

* Refer image attached to this folder.

## Installation

* First install npm init 
* Then install next js as follows
```jsx
npm install --save next react react-dom
```
* Next.js is a library building up on React, it gives you extra features but behind the scenes or also from a code perspective what you're going to write, it's still all React.
* Now add a script to your package.json like this:
```jsx
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```
*  In Next.js, the file system is our main API,we don't use React router with Next.js to create routes and allow the user to visit /auth/user
and so on, instead we create folders and files to reflect our URLs in the file system.

* Next.js, the package will automatically pass that and use its own internal router to handle all the heavy lifting.

* Now along the way, it pre-renders the content we load as pages on the server, it automatically code splits, so lazy loads that, all of that out of the box without us configuring anything , that is why Next is such a great package.
## Implementation
* index.js
```jsx
import React from 'react';

const indexPage = () => (
    <div>
        <h1>The Main Page</h1>
    </div>
);

export default indexPage;
```
* auth/index.js
```jsx
import React from 'react';

const authIndexPage = () => (
    <div>
        <h1>The Auth Page</h1>
    </div>
);

export default authIndexPage;
```
* Now run  npm run dev in your terminal.. now you can open your page and we can swith between main and authpage without routing..
* Now we want to move from main to auth page with a link here we will not use route link component we will use next js's link component.
```jsx
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const indexPage = () => (
    <div>
        <h1>The Main Page</h1>
        <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
        <button onClick={()=> Router.push('/auth')}>Go to Auth</button>
    </div>
);

export default indexPage;
```
* nextjs as we'll parse all the files in their as pages, create routes for them and automatically code split. By the way that code splitting of course also includes components included in that page like the user component.
```jsx
import React from 'react';

const user = (props) => (
    <div>
        <h1>{props.name}</h1>
        <p>Age: {props.age}</p>
    </div>
);

export default user;
```

* we only use that in the auth component, in the authindex.js file so we only load the code for it if we navigate to that page. If we spend our entire time on the main index.js page where we don't use the user component, we would never load the code for this either.

```jsx
import React from 'react';
import User from '../../componunt/User';     

const authIndexPage = () => (
    <div>
        <h1>The Auth Page</h1>
        <User name="Max" age={28}/>
    </div>
);

export default authIndexPage;
```
* Nextjs has its own way of styling react. you can still use inline styles, you can still use radium but you can't use css module  because you can't access the webpack configuration nextjs uses but it offers another out of the box working way of styling your components and having scoped styling
```jsx
<style jsx>{`
    div {
        border: 1px solid #eee;
        box-shadow: 0 2p 3px #ccc;
        padding: 20px;
        text-align: center;
    }
`}</style>
```
## Handling (404) Errors

* You can create your own error handler by creating an _error.js file in the pages folder.
```jsx
import React from 'react';
import Link from 'next/link';

const errorPage = () => (
    <div>
        <h1>Oops, something went wrong.</h1>
        <p>Try <Link href="/"><a>going back</a></Link>.</p>
    </div>
);

export default errorPage;
```