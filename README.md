# Loadsmart Engineering Blog

Built on top of GatsbyJS and continuously deployed to Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/18394d28-4c09-4006-bb41-19a1a89445bf/deploy-status)](https://app.netlify.com/sites/loadsmart-engineering/deploys)

## Installing

If you already have a Node.js environment and yarn installed, install the dependencies by running in the root directory:

```
yarn
```

## Running

To run it locally:

```
gatsby develop
```

And then access your browser at [localhost:8000](http://localhost:8000). This commands listens to changes in the file system and restarts the server by itself, so you don’t have to do it manually.

## Writing a blog post

If you work for Loadsmart and want to write an article, you can do so by creating a Markdown file under the `content` folder. Make sure you follow the expected structure of directories by adding an `index.md` file and all the referenced images in the same folder named after the date your post should be published plus the slug. E.g.:

```
content
  posts
    2020-06-05-title-of-your-post
      index.md
      some-image.jpg
      another-image.jpg
```

When it’s ready, send a pull request and assign some people to review it. If build passes, Netlify will comment in your pull request with a link to preview your post. In case you want to check an example, see [this](https://github.com/loadsmart/blog/pull/27).

As soon as your PR is merged into master, a deploy to Netlify will be triggered. In less than a minute, you should be able to see your post live at [engineering.loadsmart.com](https://engineering.loadsmart.com).

## Contributing

Found a typo or want to help us with any of the [open tickets](https://github.com/loadsmart/blog/issues)? Feel free to fork the project and send us a Pull Request.

## License

This project is distributed under the [MIT](https://raw.githubusercontent.com/loadsmart/blog/master/LICENSE) License.
