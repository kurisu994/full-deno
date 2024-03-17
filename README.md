# Full-deno

A new full stack project use Fresh. You can follow the Fresh "Getting Started"
guide here: <https://fresh.deno.dev/docs/getting-started>.

## Usage

Make sure to install [Deno](https://deno.land/manual/getting_started/)

## installation

### Then start the project

```shell
deno task start
```

### Build

```shell
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t full-deno:latest -f ./Dockerfile --no-cache .
docker run -d --name full-deno -it -p 9003:8000 full-deno:latest
```

This will watch the project directory and restart as necessary.
