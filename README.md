# NextJs-19

## Special Life Cycle Hook
* Lets trun our main page from functional to a class based component.
```jsx
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

class IndexPage extends Component {
    render() {
        return (
            <div>
            <h1>The Main Page of {this.props.appName}</h1>
            <p>
                Go to{" "}
                <Link href="/auth">
                <a>Auth</a>
                </Link>
            </p>
            <button onClick={() => Router.push("/auth")}>Go to Auth</button>
            </div>
        );
    }
}

export default IndexPage;
```
* Just we have changed from functional to class based component.I also want to show you a special lifecycle hook you can use though
and unlike the react lifecycle hooks, that lifecycle hook would even be available in functional components.

```jsx
static async getInitialProps(context) {
    console.log(context);
}
```

* it's a static method which means it can be called without the component being instantiated yet and it's an asynchronous method which means it doesn't resolve, it doesn't return something.

* And now with that, let's reload the page and we don't see anything here, we don't even see a console log.

* We can see something in a console though, in the console here where we ran npm run dev because this code actually is executed on the server first, it will only be executed on the child if you navigated there within the app so by clicking a link for example. If you navigated there by typing the URL and hitting enter or refresh,it executes on the server, that's the special thing about this lifecycle method.

* It executes either on the server or the client and you can use it to initialize your app before it loads,so on the server for example in getInitialProps, you could fetch data from a database and then pre-populate the props this page component will receive with props of your choice.

```jsx
 static getInitialProps(context) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: "Super App" });
      }, 1000);
    });
    return promise;
  }
```
* setTimeout to fake, the reaching out to a server, you would then call resolve and return your data like the name of the app, Super App. And then what you can do or let's name it app name here too.
* nextJS will take care about listening to its result and then pre-populate our props once the result is there and only render the page once the result is there.
* So getInitialProps,super important working together with promises, either promises written by you or returned by third party packages,it'll wait for them to resolve and pre-populate your props.
* As i said We can use getInitialProps in functional component also please refer the below link.
```jsx
authIndexPage.getInitialProps = context => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve({ appName: "Super App (Auth)" });
        }, 1000);
    });
    return promise;
};
```
* Refer : https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle 

## Deploying App
* in package.json we have three different script build, dev and start
* Build is the script you want to execute to build the project for deployment.
```jsx
npm run build
```
* it will now compile and optimize all that code and spit it out,ready for you to ship to a server.
* Once you run build you will get .next folder - this now contains all the build content.
* you also need to install node modules and so on. So you would deploy the entire project folder here to a host like AWS elastic beanstalk or Heroku.And that's important,you need a host, a service which is able to run nodeJS because nextjsuses nodejs and only works on nodejs, all the files you deploy are javascript files. So you need a nodejs ready host and then you ship your entire project there and just execute npm start .
