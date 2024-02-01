# omy

Unofficial CLI for working with notion AI

## Installation

**Using npm:**
```bash
npm i omy -g
```

## Usage

First, you need to copy the cookie value with the key `token_v2`. This token needs to be passed in the function call.

Then you should call the function `omy c` and pass this token to it

### search

Searching for an answer in your Notion

```bash
omy search 'the process of caching a request from the service with DNA data'
```

### translate

```bash
omy translate 'denken Sie sich einen Namen für eine Variable aus, die für das Zwischenspeichern von Anfragen aus dem Dienst mit DNA-Daten verantwortlich ist' -l english
```

### helpMeEdit

Free-form request to Notion AI

```bash
omy helpme 'think up a name for a variable responsible for caching requests from the service with DNA data'
```

## License

[MIT](https://github.com/vordgi/omy/blob/main/LICENSE)
