# EMo Viewer

Viewer for the modular framework to present digital editions.

**Note:**
Although the EMo Viewer is designed as a generic viewer for digital editions, it is currently developed within the scope of the [Ahiqar project](https://gitlab.gwdg.de/subugoe/ahiqar).
This is the reason for "Ahiqar" being mentioned several times in the docs of this repo.

Demo: <https://subugoe.pages.gwdg.de/emo/Qviewer/develop>

(For newer branches the demo is deployed in a directory named with branch name lowercased, shortened to 63 bytes, and with everything except `0-9` and `a-z` replaced with `-` (CI_COMMIT_REF_SLUG).
Also the commit short hash can be used to see a demo.

**Overview:**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Get the Dependencies](#get-the-dependencies)
  - [Start the App in Development Mode (Hot-Code Reloading, Error Reporting, etc.)](#start-the-app-in-development-mode-hot-code-reloading-error-reporting-etc)
  - [Lint the files](#lint-the-files)
  - [Build the App for Production](#build-the-app-for-production)
  - [Customize the Configuration](#customize-the-configuration)
- [Configure the Viewer](#configure-the-viewer)
  - [The keys in detail](#the-keys-in-detail)
- [Dockerfile](#dockerfile)
- [Connecting the Viewer to a Backend](#connecting-the-viewer-to-a-backend)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Prerequisites

To get the EMo Viewer up and running you should have the following software installed:

- **curl**
- **npm**
- **nvm**


**Note**:

We recommend to make use of *nvm*, since there might be issues with npm regarding permissions.
The main purpose of `nvm` is to have multiple node versions installed in regards to different projects which might demand some sort of backwards compatibility.
It enables you to just switch to the appropriate node version.
Besides it also keeps track of resolving permission issues,
since all your global installations go to your home directory (~/.nvm/) instead of being applied systemwide.

#### Set up *nvm* and the recent stable version of *node.js*

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  nvm install stable
  ```
**Note**:

After the nvm installation is done, please `restart` your shell session once. That's due to changes to your profile environment.

#### Set up *global* project requirements via npm

  ```bash
  npm install -g @vue/cli @vue/cli-service-global @quasar/cli
  ```

#### Clone the repository

  ```bash
  git clone git@gitlab.gwdg.de:subugoe/emo/viewer.git
  ```

### Installation

#### Get the dependencies

Head over to your project directory, where you just cloned the repository to as described above and get all the dependencies needed by simply typing:

  ```bash
  cd /path/to/projectdir
  npm install
  ```

That's it. You now should be able to run the Viewer.

## Usage

### Start the App in Development Mode (Hot-Code Reloading, Error Reporting, etc.)

#### Start a local instance of a dev server

```bash
npm run dev
```
(usually located at: `localhost:8080`)

#### Lint the files

```bash
npm run lint
```

#### Build the App for Production

```bash
npm run build
```

### Customize the Configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Configure the Viewer

Locate the `index.template.html` file inside the root of your project dir and find the script section:

**Note**:

It's a json object. So if you are going to make any changes and you have to quote these, use double quotes but single ones.

```html
    <script id="emo-config" type="application/json">
    {
      "entrypoint": "https://{server}{/prefix}/{collection}/collection.json",
      "headers": {
        "all": true,
        "info": false,
        "navigation": true,
        "toggle": true
      },
      "labels": {
        "item": "Sheet",
        "manifest": "Manuscript"
      },
      "panels": {
        "image": true,
        "text": false,
        "metadata": true,
        "treeview": true
      },
      "standalone": true
    }
    </script>
```

### The keys in detail

- **entrypoint**

	to link the viewer to a backend, the entrypoint should point to the collection you want to be displayed. (Further details below: [Connecting the Viewer to a Backend](#connecting-the-viewer-to-a-backend))
- **headers**
  - **all**

		set this value to `false` if you want to completely switch off all the headerbars at once. This value takes precedence. If it's set to *false*, the other settings for the individual bars are not taken into account.
      *(A use case might be to embed the Viewer into an existing website and you simply need more screen space)*
  - **info**

		set this value to `false` if you want to switch off the Infobar (breadcrumbs)
  - **navigation**

		set this value to `false` if you want to switch off the NavBar
  - **toggle**

		set this value to `false` if you want to switch off the ToggleBar.

		**Note**: if you turn this one off, you won't be able to toggle the panels anymore.

		All header values default to **true**

- **labels**
  - **item**: the label of the item respectively

		Assuming your collection consists of letters, you'd maybe want to name it "letter" or just "sheet" for instance.
This change affects the captions of the navbuttons located in the headerbar and the metadata section.

		Defaults to **Sheet**

  - **manifest**: same as for `item` but related to the manifest title

		Defaults to **Manuscript**

- **panels**

	It's keys correspond to the panelnames, e.g. "treeview", "text", "image", "metadata".
  	Set either value to **false** if you don't want the Viewer to show the appropriate panel/s.

	Defaults to **true** for every panel

- **standalone**

	denotes if the Viewer will be used as a single page application on it's own or if it will be embedded into an existing page. If you want to use it in the latter case, please toggle the value to "false". That way the language toggle in the footer section will not show up.

	Defaults to **true**

## Dockerfile

The dockerfile is used at GitLab CI.
It needs to be updated, when either node or quasar-cli should be updated.

```bash
docker build --pull -t docker.gitlab.gwdg.de/subugoe/emo/qviewer/node .
docker push docker.gitlab.gwdg.de/subugoe/emo/qviewer/node
```

## Connecting the Viewer to a Backend

The viewer expects JSON that complies to the [SUB's generic TextAPI](https://subugoe.pages.gwdg.de/emo/text-api/) in order to function properly.
To establish a link to the backend, the viewer's entrypoint in `src/index.template.html` has to be modified:

```html
"entrypoint": "https://{server}{/prefix}/{collection}/collection.json"
```

The entrypoint should point to the collection you want to be displayed.

## Architecture

![Architecture diagram of the EMo viewer](img/emo_architecture.png)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.gwdg.de/subugoe/emo/Qviewer/-/tags).

## Authors

See the list of [contributors](https://gitlab.gwdg.de/subugoe/emo/Qviewer/-/graphs/develop) who participated in this project.
