# TDC Survey Platform
The modeling is React and MongoDB .

### Install dependencies
Run `npm install` from both the `clients` folder and `tdc-survey-platform`.

### Setting up project
Start dev server with `npm run dev`.

### Linting
Lint your code (ensure code style is consistent) with `npm run lint`. This command will fix some minor styling
issues before alerting you of the style errors it could not fix. To edit styling used for linting see the `.eslintrc.js`

## File Structure

This is the template file structure

```
SRC:.
|   App.css
|   App.js
|   App.test.js
|   auth-provider.js
|   index.css
|   index.js
|   logo.svg
|   reportWebVitals.js
|   setupTests.js
|   
+---assets
|       bluecat.svg
|       cateatfish.svg
|       catwalk.svg
|       editor_content.png
|       left.svg
|       logo.svg
|       paw.svg
|       qisicat.svg
|       right.svg
|       
+---components
|       background.js
|       create-button.js
|       lib.js
|       logo.js
|       
+---context
|       auth-context.js
|       index.js
|       
+---screens
|   +---authenticated-app
|   |       index.js
|   |       page-header.js
|   |       questionnaires-popover.js
|   |       user.js
|   |       
|   +---questionnair-list
|   |       empty.js
|   |       end-time-picker.js
|   |       index.js
|   |       list.js
|   |       more.js
|   |       pageheader-skeleton.js
|   |       search-panel.js
|   |       util.js
|   |       
|   +---questionnaire
|   |   |   Editor.jsx
|   |   |   index.js
|   |   |   LeftSide.jsx
|   |   |   
|   |   +---MultipleChoice
|   |   |       index.jsx
|   |   |       
|   |   +---QuestionList
|   |   |       index.jsx
|   |   |       MultipleQuesList.jsx
|   |   |       SingleLineQuesList.jsx
|   |   |       SingleQuesList.jsx
|   |   |       
|   |   +---SingleChoice
|   |   |       index.jsx
|   |   |       
|   |   \---SingleLineText
|   |           index.jsx
|   |           
|   +---questionnaire-analysis
|   |       index.js
|   |       
|   +---questionnaire-fill
|   |       index.js
|   |       
|   +---questionnaire-preview
|   |       index.js
|   |       
|   \---unauthenticated-app
|           index.js
|           login.js
|           register.js
|           
\---utils
        excel.js
        http.js
        index.js
        questionnaire.js
        url.js
        use-async.js
        use-optimistic-udpate.js
        

```

