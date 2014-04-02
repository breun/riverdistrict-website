Setup
=====

Make sure you have [Grunt](http://gruntjs.com/) installed and then install the project dependencies:

    $ npm install

Build
=====

Run the default Grunt task:

    $ grunt

To have Grunt automatically re-run tasks as necessary:

    $ grunt watch

The site is generated in the `dest` folder.

Local server
============

To have Grunt serve the contents of the target folder:

    $ grunt connect

Deploy
======

All good? Let's show it to the world!

    $ grunt rsync
