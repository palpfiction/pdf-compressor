# PDF Compressor

A simple, privacy-focused PDF compression tool that runs entirely in your browser. No files are uploaded to any server.

## Features

- Compress PDF files using Ghostscript (via WebAssembly)
- Multiple compression levels
- Process multiple files at once
- Download all compressed files as a ZIP
- Available in English and Spanish
- Works offline after first load

## How it works

This tool uses [Ghostscript](https://www.ghostscript.com/) compiled to WebAssembly to compress PDFs directly in your browser. Your files never leave your computer.

## Why?

The most important one is that a family member needed to compress a high amount of PDF files and they contain sensitive information. I was compressing them using Ghostscript in my computer, but I wanted to build something that allowed them to do it by themselves. Other online tools upload the files to their servers or are not transparent about what they do with the files, so I decided to build this tool that runs entirely in the browser. This is nothing without the work it's based on, mainly the work from Laurent Meyer, so all credits to them. The only advantage of this over Laurent's work is that you can process multiple files at once and download them as a ZIP.

## Deploy your own

1. Clone this repository
2. Enable GitHub Pages in repository settings (Settings → Pages → main branch)
3. Your compressor will be available at `https://yourusername.github.io/repository-name`

## Credits

- Ghostscript WASM integration based on work by [Laurent Meyer](https://github.com/laurentmmeyer/ghostscript-pdf-compress.wasm) (AGPL-3.0)
  - `gs-worker.js` - Modified line 713 to use local WASM file instead of CDN
  - `gs-worker.wasm` - Used as-is from the original repository  
  - `background-worker.js` - Based on original, modified to support configurable quality settings
- Ghostscript WASM build by [ochachacha](https://github.com/ochachacha/ps-wasm)
- [Ghostscript](https://www.ghostscript.com/) by Artifex Software

## License

AGPL-3.0 (due to Ghostscript WASM dependency)
