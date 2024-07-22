# Manually Install Development Theatre

If you don't have an M Series Mac, or if you want to take the time to install the Development Theatre manually, you can follow these steps:

1. Install <a href="https://nodejs.org/en/">latest LTS Node</a>.
2. Install <a href="https://classic.yarnpkg.com/en/docs/install/">Yarn 1</a>.
3. Install <a href="https://code.visualstudio.com">Visual Studio Code (vscode)</a>.
4. Setup <a href="https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line">vscode to work through command line</a>.
5. Quit vscode (**very important or vscode won't get new settings**)

## Install Spruce CLI

Once Node, Yarn, and vscode are ready, run the following: 👇

```bash
yarn global add @sprucelabs/spruce-cli
```

## Clone the theatre-monorepo

`cd` to the directory where you want to install the Development Theatre and run:

```bash
git clone git@github.com:sprucelabsai-community/theatre-monorepo.git spruce-theatre
```

> **Note**: This will create a new directory called `spruce-theatre` in your current directory. You can name it whatever you want, but it's always helpful to end the directory name with `-theatre`.

## Download the Blueprint

Theatres are driven by a `blueprint.yml` file. It tells the theatre what to build and how to build it. You can download the blueprint for the Development Theatre by running:

```bash
curl -o blueprint.yml https://raw.githubusercontent.com/sprucelabsai/sprucebot-theatre/master/blueprint.yml
```

You should end up with a directory structure that looks like this:
```bash
> ls
spruce-theatre/
blueprint.yml
```

## Setup the Theatre

Now that you have the `spruce-theatre` directory and the `blueprint.yml` file, you can setup the theatre by running:

```bash
cd spruce-theatre
yarn setup.theatre ../blueprint.yml
```

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/ideology/' | url }}">Learn the Spruce Ideology</a>
</div>

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

