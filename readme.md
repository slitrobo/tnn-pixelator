# TNN Pixelator

![](https://github.com/vladimirshlygin/tnn-pixelator/blob/master/sample.jpg)

Small Jimp-based custom pixelization script for scan-me project.

## How to use?

Sample bash command:

`FILE_PATH=references/architecture-a.png SAVE_AS=outcomes/architecture-a-8.png DIVS=8 npm start`

Require in your project:

`var tnnPixelator = require('./tnnPixelator')`

DIVS are number of picture divisions by x and y axis. Two divisions means two quads, eight divisions means eight quads, etc.
