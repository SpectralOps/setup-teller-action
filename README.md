# :airplane: setup-teller-action

Set up your GitHub Actions workflow with a specific version of [Teller](https://github.com/spectralops/teller).

## :bulb: Usage

Use the following to set up a `teller` binary that's available in your workflow steps:

```yaml
      - name: Setup Teller
        uses: spectralops/setup-teller@v1
```


## :clipboard: Workflow

```yaml
name: run with teller
on:
  push:
    branches:
      - master
      - main
  pull_request:

jobs:
  build:
    name: Build your code
    runs-on: ubuntu-latest

    steps:
      - name: Clone repo
        uses: actions/checkout@master


      # set up teller
      - name: Setup Teller
        uses: spectralops/setup-teller@v1

      - name: do stuff
        run: echo stuff
```
