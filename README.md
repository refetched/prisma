# @refetched/prisma

This package exports refetched prisma functions.

## User Guide

### Install Package

```bash
npm install -D @refetched/prisma
```

### Uninstall Package

```bash
npm uninstall @refetched/prisma
```

## Developer Guide

### Install Dependencies

```bash
npm install .
```

### New Feature

#### Add Function Definition

Assuming `DIRECTORY` is directory where function belongs. Change directory to `src/DIRECTORY`. Create funtion definition file (i.e. `example.ts`). Export funtion definition file in `src/DIRECTORY/index.ts`. If not already exported, export `DIRECTORY` in `src/index.ts`. Change directory to `src/DIRECTORY/__tests__`. Create function definition test file (i.e. `example.test.ts`).

#### Update Function Definition

Assuming `DIRECTORY` is directory where function belongs. Change directory to `src/DIRECTORY`. Update funtion definition file (i.e. `example.ts`). Change directory to `src/DIRECTORY/__tests__`. Update function definition test file (i.e. `example.test.ts`).

#### Remove Function Definition

Assuming `DIRECTORY` is directory where function belongs. Change directory to `src/DIRECTORY/__tests__`. Delete function definition test file (i.e. `example.test.ts`). Change directory to `src/DIRECTORY`. Delete funtion definition file (i.e. `example.ts`). Delete function definition file in `src/DIRECTORY/index.ts`. If only function in `src/DIRECTORY`, delete `DIRECTORY` and export in `src/index.ts`.

### Bump version

There are three scenarios for bumping versions: patch release, minor release, major release.

#### Patch Release

These releases are for backward compatible bug fixes. To perform a patch release increment the third digit (i.e. `1.0.1`).

#### Minor Release

These releases are for backward compatible new features. To perform a minor release increment the middle digit and reset last digit to zero (i.e. `1.1.0`).

#### Major Release

These relases are for changes that break backwards compatibility. To perform a major release increment the first digit and reset the middle and last digits to zero (i.e. `2.0.0`).
