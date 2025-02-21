# Soty - Web Player: Music for everyone(Deprecated)

## Unfortunately, due to Spotify's updated API policy, some key endpoints used in the application are no longer available, resulting in partial loss of functionality.

![Project Status](https://img.shields.io/badge/status-finished-brightgreen.svg)

[Preview](https://sadmearise.github.io/soty/)

## Navigation

- [Description](#description)
- [Technologies](#technologies)
- [Scripts](#scripts)
- [Installation and Use](#installation-and-use)

## Description:

Soty is a digital music service based on Spotify that gives you access to millions of songs.

## Technologies:

- Frontend:

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind CSS" alt="Tailwind CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/marwin1991/profile-technology-icons/assets/25181517/2a36d1f6-2198-4726-89ac-2148ce46a69a" title="styled-components" alt="styled-components" width="40" height="40" />&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="Typescript" alt="Typescript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/reactrouter/reactrouter-original.svg" title="React Router" alt="React Router" width="40" height="40"/>&nbsp;
</div>
<br>

- Backend:

<div>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1200px-Spotify_icon.svg.png" title="Spotify for Developers" alt="Spotify for Developers" width="40" height="40"/>&nbsp;
</div>
<br>

- Other Tools:

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/vitejs/vitejs-original.svg" title="Vite" alt="Vite" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg" title="ESLint" alt="ESLint" width="40" height="40"/>&nbsp;
  <img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" title="Prettier" alt="Prettier" width="40" height="40"/>&nbsp;
  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fv67mrvpgrqg19k3ifgll.png" title="Husky"  alt="Husky" width="95" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

## Scripts:

- `dev` Runs development environment.
- `build` Creates an optimized build of the application.
- `lint` Runs the linter on the entire project directory on any file that has an extension of `.ts`, `.tsx`.
- `format:fix` Runs Prettier, which will reformat all the files in the project.
- `prepare` Runs Husky, which will trigger and enable Git hooks.
- `preview` Starts a local web server that serves the built solution from `./dist` for previewing.

## Installation and Use:

1. To get a copy of this repository, run the following command in your terminal:

```bash
git clone https://github.com/SadMearise/soty.git
```

2. Then navigate to the project directory:

```bash
cd your_local_clone_repository
```

3. Install dependencies:

```bash
npm install
```

4. Create environment files:

- **.env**  
  Consists of three variables:
  - `VITE_CTP_CLIENT_ID`
  - `VITE_CTP_CLIENT_SECRET`
    - Initialize them according to your data from your [Spotify personal account](https://developer.spotify.com/).
  - `VITE_CTP_SCOPE`
    - I'm using the following permissions: `user-read-private`, `user-read-email`, `playlist-modify-public`, `playlist-modify-private`, `user-library-modify`, `user-library-read`, `playlist-read-private`, `playlist-read-collaborative`.
- **.env.production**  
  Consists of two variables:

  - `VITE_CTP_SERVER_URL`
    - Initialize it with the URL of your deployment server.
  - `VITE_CTP_BASE_URL`
    - Initialize it with the base URL. My case `/`

- **.env.development**  
  Consists of two variables:
  - `VITE_CTP_SERVER_URL`
    - Initialize it with the URL of your local server.
  - `VITE_CTP_BASE_URL`
    - Initialize it with the base URL. My case `/soty`

5. Use [scripts](#scripts) to manage the project. For example running the Project:

```bash
npm run dev
```
