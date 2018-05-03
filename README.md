# Poll-erizer
An app where users can create their own polls and vote on each others.

This app is built upon the boilerplate code at https://github.com/johnstonbl01/clementinejs-fcc. It uses passport.js to provide github 
login functionality combined with mongodb and mongoose so users may create and store their own polls. React.js is used to render the pages 
displaying user polls. D3.js is used to render the graphs associated with each poll.

Users who are not logged in may still view and vote on all polls created by other users. If a user logs in via github, they can go to 
'/mypolls' where they may create their own poll. They also may edit or delete previous polls they created.

Both kinds of poll page ('/mypolls' and '/allpolls') are rendered via react components coded in a single html file. Ideally, these components should be modularised using a build tool such as webpack. This would also improve the app's performance by avoiding the in-browser Babel transformer which is used to compile the pages rendered with react.

Technologies used in this project:
* node
* express
* html
* css
* jquery
* mongodb
* mongoose
* react
* passport

Addtional packages of note:
* passport-github
