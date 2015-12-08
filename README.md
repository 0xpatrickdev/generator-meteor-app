## forked from [Pent/generator-meteor](https://github.com/Pent/generator-meteor)
* added FlowRouter
* added prompts for more packages
* modified scaffolding
* updated for Meteor 1.2

## To Do:
* add router group generator

## generator-meteor
A [Meteor](http://meteor.com) project generator for [Yeoman](http://yeoman.io).

## Prerequisites
* [nodejs](http://nodejs.com)
* [yeoman](http://yeoman.io)

Create a new app directory:

```
$ npm install -g generator-meteor-app
```

Create a new app directory:

```
$ mkdir newApp && cd $_
```

Initiate the generator:

```
$ yo meteor-app
```

Finally, run Meteor:

```
$ meteor
```

##Collection, Template, and View Generators

To generate a new Collection in `/lib/collections`, and accompanying pubs/subs:

```
$ yo meteor-app:collection yourCollectionName
```

To generate a new view in `/client/views/`:

```
$ yo meteor-app:view viewName
```

To generate a new template in `/client/templates/`:

```
$ yo meteor-app:template templateName
```

## App Structure
```
    .meteor/
        .gitignore
        packages
        release
    client/
        compatibility/
        components/
        layouts/
            mainLayout.html
        lib/
            registerHelpers.js
            subscriptions.js
            templateHelpers.js
        styles/
            theme.css
        templates/
        views/
            common/
            home.html
            home.js
    lib/
        routes.js
        collections/
            collection.js
    private/
    public/
        fonts/
        images/
        robots.txt
    server/
        methods/
            method.js
        publications/
            publication.js
        security.js
        server.js
        startup.js
    .gitignore <- contains sensible defaults for files/folders to ignore
    LICENSE <- default empty license file
    smart.json <- meteorite package definition
    settings.json <- to store credentials and tokens
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
