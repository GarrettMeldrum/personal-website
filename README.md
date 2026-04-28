This project has been containerized and now utilizes Docker. The main docker repo can be located here. 

# Web App Layout
* This is a simple portfolio website that is using next.js/react as a framework and mostly written in TypeScript.
* Spotify Listener --> This is using the Spotify Dev API to poll for a currently-listneing flag to be triggered. This is fed to the frontend to update the currently playing box. The progression bar is a psuedo progression bar as it is just driven off of the playtime stamp of the currently playing song.
* Spotify Analytics --> This is a Spotify dashboard for analytics on my listening history. This is orchestrated with my other project that stores spotify listening data to a database. This database is stored in /data and is fed to the frontend by next APIs endpoints to keep the database protected. Eventually looking to expand the analytics.
* Featured Projects --> The featured projects is just some of my projects that are found on my Github with links to visit this. Simple list page of all projects is available as well for future projects to populate.
* Mountaineering --> The mountaineering section is for my mountain adventures recorded into markdown files that are utilizing a slug file to generate the frontend pages on build. This is for my own enjoyement and I have plans to expand this and build tooling to make it easier to push markdown file updates.
