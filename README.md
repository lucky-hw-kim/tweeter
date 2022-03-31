# Tweeter Project

Tweeter is a simple, single-page Twitter clone.
This client-side Single Page App (SPA) was created to demonstrate ability to
communicate with a server asynchronously via AJAX.

# Functionality

- User can write a post that can be displayed on the page without refreshing the page.
- The Character Counter turns red when more than 140 characters are typed.
- Error message appears when character limit is exceeded or when nothing is typed.
- *Write a new tweet* butto on nav bar toggles text area where user can write posts.
- When page is scrolled down, scroll to top button appears to navigate to the top.
- Page is responsive with any device in sizes (mobile, tablet and desktop).
- When the user hovers over icons, the icons change colour.
- Displays *time ago* when the post was created.


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.


## Dependencies

- Express
- Node 5.10.x or above
- body-parser : ^1.15.2
- chance: ^1.0.2
- express: 4.13.4
- md5: ^2.1.0
