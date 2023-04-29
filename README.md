### Links

[Discord Support](https://discord.gg/ZpuscgCayg) | [NPM](https://www.npmjs.com/package/pixelic-emojis) | [GitHub](https://github.com/Pixelicc/Pixelic-Emojis)

### Install

```shell
npm i pixelic-emojis
```

```js
const pixelicEmojis = require("pixelic-emojis");
```

## Docs

#### .rankEmoji() Constructor

```js
const rankEmoji = pixelicEmojis.parseRankEmoji(rank, plusColor, plusPlusColor);
```

Options:

|    Option     | Type                   | Description                                                                                                                                                                                                                              |
| :-----------: | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     rank      | Object, String or null | Set the player's rank if you already got the rank parsed, passing null will get interpreted as the "DEFAULT" rank. If you are using raw Hypixel Data and rank still needs to be parsed then use a rank object an example is shown below. |
|   plusColor   | String or null         | Set the plusColor of the player, passing null will get interpreted as the default color "RED".                                                                                                                                           |
| plusPlusColor | String or null         | Set the plusPlusColor of the player, passing null will get interpreted as the default color "GOLD".                                                                                                                                      |

### .rankEmoji() Examples:

#### Using raw Hypixel data:

```js
const pixelicEmojis = require("pixelic-emojis");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const res = await fetch("https://api.hypixel.net/player?uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
const parsedRes = (await res.json()).player;

const rankEmoji = pixelicEmojis.parseRankEmoji(
  {
    rank: parsedRes.rank,
    packageRank: parsedRes.packageRank,
    newPackageRank: parsedRes.newPackageRank,
    monthlyPackageRank: parsedRes.monthlyPackageRank,
    prefix: parsedRes.prefix,
  },
  parsedRes.rankPlusColor,
  parsedRes.monthlyRankColor
);

console.log(rankEmoji);
```

#### Using already parsed data:

```js
const pixelicEmojis = require("pixelic-emojis");

const rankEmoji = pixelicEmojis.parseRankEmoji("MVP++", "LIGHT_PURPLE", null);

console.log(rankEmoji);
```
