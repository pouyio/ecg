# [🫀 ECG 🌍](https://pouyio.github.io/ecg/)

[![Test](https://github.com/pouyio/ecg/actions/workflows/ci.yml/badge.svg)](https://github.com/pouyio/ecg/actions/workflows/ci.yml) [![Deploy static content to Pages](https://github.com/pouyio/ecg/actions/workflows/cd.yml/badge.svg)](https://github.com/pouyio/ecg/actions/workflows/cd.yml)

To execute this project locally run `yarn install && yarn dev`

## 💬 Solution

The provided data file weighs in at a hefty 1.5GB, necessitating a pagination system to prevent browser memory overload. To keep the process client-side, I considered two approaches: streaming, which reads data sequentially, and chunking, which processes data in manageable pieces. Chunking emerged as the preferred choice.

Reading in chunks is easy and efficient thanks to the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) and the `readAsText()` method.

After some testing, I set the default window size to 700 kB, but it can be changed manually in `constants.ts`, as well as it could be changed from the app as an improvement.

Although the first line of the data file says there are 5 channels, only data for four of them are found. The data shows there is a measurement for every 40ms for the first signal, and fewer for the rest of them, that is also acknowledged.

After reading about and testing the most used charts libraries, I opted for "highcharts" for its customization and open-source nature and speed.

## 💻 All Scripts

- **`yarn dev`** to start the dev server
- **`yarn test`** to run all the tests (unit and components)
- **`yarn build`** to build with index.html as entrypoint
- **`yarn preview`** to start a server with the files from buid step

## 👤 Usage

Users can only select and load a file. Once this process is complete, the chart will display the initial data chunk for the four default signals.

The x-axis represents seconds, while the units for the y-axis are unspecified. Although it could be in microvolts, I refrain from specifying this due to the involvement of multiple signals.

Users can hide each signal by clicking on its label along the x-axis. The chart responds by zooming in or out to enhance the visibility of the remaining signals. Additionally, the app provides essential information such as the file total size and the number of chunks.

To navigate through and load different chunks, users have several options:

- _Arrow buttons_: Users can navigate sequentially.
- _Slider_: Users can move to specific areas within the file.
- _Number input_: For increased precision, users can input a number. This is particularly helpful when dealing with a slider with numerous steps, as arrows may be slower.

Users can zoom in on the chart either by selecting a square area or by using the mouse wheel. A "reset zoom" option will be available. When the chart is zoomed in, users can hold the Shift key to move the signals.

To clear the current file and upload a new one, a "refresh" button appears in the header.

## 🎯 Tech

This project utilizes `yarn` as its primary package manager, `vite` and `vitest` for the bundler, development server, and test framework. It is exceptionally fast for serving the development environment, building for production, and running tests in watch mode.

`Typescript` is essential because working without it can be quite challenging.

I employ `Github Actions` to establish a straightforward CI/CD pipeline that runs tests on every push to the main branch and deploys assets to GitHub Pages.

Both `Material UI` and `styled-components` are both required libraries.

I aimed to maintain the project's simplicity and minimize dependencies as much as possible, given time constraints. While I do not consider it production-ready yet, it is certainly heading in the right direction.

## 📝 Possible improvements

- More intuitive controls for zoom and panning
- Cover more corner cases with testing
- Dark/light themes
- i18n
- ~~CI/CD~~✅
- Versioning, changelog, [semantic-release](https://github.com/semantic-release/semantic-release)
- More fluid/mobile friendly
- Manifest.json
- Provide an example data file
- Block main branch, push only through reviewed PRs.
