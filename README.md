# Music Player

A responsive browser-based music player built with **HTML, CSS, and vanilla JavaScript** as a hands-on software engineering learning project.

The project focuses on understanding how data, DOM rendering, event handling, and browser audio playback work together in a small interactive application.

## Features

- Play and pause audio
- Navigate to the previous or next track
- Automatically move to the next track when the current track ends
- Display the current track title, artist, elapsed time, duration, and playback progress
- Sort tracks alphabetically by title
- Shuffle the playlist
- Delete individual tracks
- Clear the playlist
- Render playlist items dynamically from JavaScript data
- Responsive dark-themed interface for desktop and mobile browsers

## Built With

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- HTML Audio API
- DOM manipulation and event listeners

## Project Structure

```text
music-player/
├── index.html
├── styles.css
├── script.js
├── README.md
└── music/
    └── generated audio files (.mp3)
```

The song metadata and audio paths are maintained in the `allSongs` array in `script.js`. Each `src` should point to the exact filename inside the `music/` directory, for example:

```js
{
    id: 1,
    title: "Example Track",
    artist: "AI-generated instrumental",
    duration: "2:45",
    src: "./music/example-track.mp3"
}
```

Make sure the filename, extension, capitalization, and spaces match the actual file. The displayed duration can be updated to match the recording; the player also reads the audio element's actual duration after the file loads.

## Running Locally

1. Clone or download this repository.
2. Keep `index.html`, `styles.css`, and `script.js` in the project root.
3. Put the audio files you are authorized to use in the `music/` directory.
4. Update the song entries in `allSongs` in `script.js` so each path matches its audio file.
5. Open `index.html` in a browser. For development, using Visual Studio Code with a local server extension is recommended.

## Music and Audio Acknowledgments

The audio assets included with this project were generated with AI tools for this educational and self-development project. Track titles and displayed metadata are maintained in `script.js`.

The project does not claim endorsement by any AI provider, artist, musician, label, publisher, or other rights holder. AI generation does not automatically mean an asset is public domain or unrestricted. The generated audio is included for public demonstration only where the applicable generation service terms and rights permit that use. No third-party commercial recordings should be added unless you have the necessary permission or licence.

## Educational Purpose

This project was created for **learning, experimentation, and self-development**. It is a practical exercise in applying JavaScript concepts to a working application rather than a claim that the underlying techniques are novel.

Concepts practised include:

- Arrays of objects and application state
- `map()`, `filter()`, `find()`, `sort()`, and `indexOf()`
- Template literals and dynamically generated HTML
- `data-*` attributes and `dataset`
- DOM selection and event listeners
- Separating functionality into reusable functions
- Updating the interface when application data changes
- HTML audio playback events and playback-time calculations

## Deployment on GitHub Pages

This is a static website, so it can be published with GitHub Pages:

1. Push the project to a GitHub repository with `index.html` at the repository root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.
5. Wait for deployment to complete and open the site URL shown in Pages settings.

After changing the source files or audio paths, commit and push the updates. GitHub Pages will redeploy from the configured source.

**Audio-file note:** ordinary GitHub repositories block individual files larger than 100 MiB. Git LFS is not a suitable workaround for audio that must be served directly by GitHub Pages, because GitHub Pages does not support Git LFS. Keep each audio file within GitHub's limits and consider an appropriate audio-hosting service if the collection becomes large. See the [GitHub documentation on large files](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github) and [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Developer

Built independently as part of an ongoing software engineering learning journey.

*Built for learning. Improved through practice. Driven by curiosity.*
