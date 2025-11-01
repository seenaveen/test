# GlobeTrotter Quiz App

This static web app challenges players to identify countries from their silhouettes. The project contains only front-end assets (`index.html`, `styles.css`, and `script.js`).

## Prerequisites

No build step is required. You only need a modern web browser. If you would like to run it behind a local web server (recommended), Python 3 ships with a simple HTTP server you can use.

## Get the code

If you have not already downloaded the project, clone the repository first.
The commands below show a complete example using a GitHub HTTPS URL—adjust the
URL if you use SSH or a different hosting provider.

1. Choose a parent folder for the clone (for example `~/projects`) and make
   sure it exists:

   ```bash
   mkdir -p ~/projects
   cd ~/projects
   ```

2. Clone the repository. Replace `YOUR-ORG` (and the rest of the URL, if
   necessary) with the location you were given:

   ```bash
   git clone https://github.com/YOUR-ORG/test.git
   ```

3. Change into the repository root:

   ```bash
   cd test
   ```

Once the clone finishes you will find the quiz app directly under
`funscala/quiz-app/` inside the repository root:

```bash
ls funscala/quiz-app
```

### No GitHub remote by default

The starter workspace you are using does **not** come pre-configured with a
GitHub remote. That means the commits exist only in your local clone until you
add a remote yourself. You can verify this with:

```bash
git remote -v
```

If the command prints nothing, there is no remote configured yet. To publish
the code to your own GitHub repository:

1. Create a new empty repository on GitHub (for example
   `https://github.com/<your-account>/globetrotter-quiz`).
2. Add that repository as the `origin` remote:
   ```bash
   git remote add origin https://github.com/<your-account>/globetrotter-quiz.git
   ```
3. Push the current branch (named `work` in this workspace) to GitHub:
   ```bash
   git push -u origin work
   ```

After pushing, your commits—including the quiz app files—will be visible on
GitHub under the repository you just created.

### If you already cloned the repository

You do **not** need to delete your existing clone. From within the repository
root, run `git pull` to fetch the latest commits that moved the quiz into the
`funscala/quiz-app/` directory:

```bash
cd /path/to/your/clone
git pull
```

After updating, the folder structure will match the layout described above. If
you prefer to keep any local changes, ensure they are committed or stashed
before pulling so Git can merge cleanly.

## Run the app locally

1. Open a terminal and change into the project directory. If you cloned this
   repository into `~/projects/test`, the quiz assets live at
   `~/projects/test/funscala/quiz-app`:
   ```bash
   cd /path/to/your/clone/funscala/quiz-app
   ```
2. Start a static file server. Any server will work; here is the command using Python 3:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit the app in your browser at [http://localhost:8000](http://localhost:8000). The quiz will load automatically.
4. When you are done, stop the server with `Ctrl+C` in the terminal.

If you prefer, you can also open `index.html` directly in your browser without a server, although some browsers restrict certain features (such as sound or font loading) when opening files via the `file://` protocol.

## Testing the app

This project does not have automated tests. To verify that the quiz behaves correctly:

1. Follow the steps above to run the app.
2. Play through several rounds, confirming that the timer, streak counter, hint, and skip controls work as expected.
3. Check that the score updates correctly and badges unlock when their criteria are met.
4. Ensure the travel fact modal appears after each question and that the next country loads once you close it.

You can repeat the session to verify badge persistence and different quiz flows.
