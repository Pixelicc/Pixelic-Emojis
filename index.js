const rankEmojiConversion = require("./constants/rankEmojis");

const parseRank = (rank, packageRank, newPackageRank, monthlyPackageRank, prefix) => {
  if (prefix == "§c[OWNER]") {
    return "OWNER";
  }
  if (prefix == "§d[PIG§b+++§d]") {
    return "PIG_PLUS_PLUS_PLUS"; // Technoblade Never Dies //
  }

  var playerRank = null;

  if (monthlyPackageRank === "NONE") monthlyPackageRank = null;
  if (rank === "NORMAL") {
    playerRank = monthlyPackageRank || newPackageRank || packageRank || null;
  } else {
    playerRank = rank || monthlyPackageRank || newPackageRank || packageRank || null;
  }

  if (playerRank === "SUPERSTAR") {
    playerRank = "MVP_PLUS_PLUS";
  }
  return playerRank;
};

const parsePlusColor = (rank, plusColor) => {
  if (plusColor == null) {
    if (rank == "MVP_PLUS" || rank == "MVP_PLUS_PLUS") {
      return "RED";
    } else {
      return null;
    }
  }
  return plusColor;
};

const parsePlusPlusColor = (rank, plusPlusColor) => {
  if (rank != "MVP_PLUS_PLUS") {
    return null;
  }
  if (plusPlusColor == null || plusPlusColor == "GOLD") {
    return "GOLD";
  }
  return "AQUA";
};

/**
 * Convert a player's hypixel rank into a Discord Emoji String.
 * @constructor
 * @param {Object} rank - rankObject to parse the player's rank **OR** enter an already parsed rank for example "GAME_MASTER" or "GM" and so on more details can be found in the corresponding documentation.
 * @param rank.rank - player.rank
 * @param rank.packageRank - player.packageRank
 * @param rank.newPackageRank - player.newPackageRank
 * @param rank.monthlyPackageRank - player.monthlyPackageRank
 * @param rank.prefix - player.prefix
 * @param {string} plusColor - The player's Hypixel plusColor
 * @param {string} plusPlusColor - The player's Hypixel plusPlusColor
 */
const parseRankEmoji = (rank, plusColor, plusPlusColor) => {
  if (rank === null) return ""; // Default rank if passed directly

  if (typeof rank !== "string" && rank !== null && typeof rank !== "object") return new Error("[pixelic-emojis] The rank parameter must be a string, null or an object!");
  if (typeof plusColor !== "string" && plusColor !== null) return new Error("[pixelic-emojis] The plusColor parameter must be a string or null!");
  if (typeof plusPlusColor !== "string" && plusPlusColor !== null) return new Error("[pixelic-emojis] The plusPlusColor parameter must be a string or null!");

  if (typeof rank === "object") {
    rank = parseRank(rank.rank, rank.packageRank, rank.newPackageRank, rank.monthlyPackageRank, rank.prefix);
  } else if (typeof rank === "string") {
    rank = rank.toUpperCase();
    const rankConversion = {
      OWNER: "OWNER",
      ADMIN: "ADMIN",
      GAME_MASTER: "GAME_MASTER",
      GM: "GAME_MASTER",
      YT: "YOUTUBER",
      YOUTUBE: "YOUTUBER",
      YOUTUBER: "YOUTUBER",
      PIG_PLUS_PLUS_PLUS: "PIG_PLUS_PLUS_PLUS",
      "PIG+++": "PIG_PLUS_PLUS_PLUS",
      MVP_PLUS_PLUS: "MVP_PLUS_PLUS",
      "MVP++": "MVP_PLUS_PLUS",
      MVP_PLUS: "MVP_PLUS",
      "MVP+": "MVP_PLUS",
      MVP: "MVP",
      VIP_PLUS: "VIP_PLUS",
      "VIP+": "VIP_PLUS",
      VIP: "VIP",
    };
    if (rankConversion[rank] !== undefined) {
      rank = rankConversion[rank];
    } else {
      return new Error("[pixelic-emojis] Invalid rank!");
    }
  }

  plusColor = parsePlusColor(rank, plusColor === null ? null : plusColor.toUpperCase());
  plusPlusColor = parsePlusPlusColor(rank, plusPlusColor === null ? null : plusPlusColor.toUpperCase());

  const validPlusColors = ["RED", "GOLD", "GREEN", "YELLOW", "LIGHT_PURPLE", "WHITE", "BLUE", "DARK_GREEN", "DARK_RED", "DARK_AQUA", "DARK_PURPLE", "DARK_GRAY", "BLACK", "DARK_BLUE", null];
  const validPlusPlusColors = ["AQUA", "GOLD", null];

  if (!validPlusColors.includes(plusColor)) return new Error("[pixelic-emojis] Invalid plusColor!");
  if (!validPlusPlusColors.includes(plusPlusColor)) return new Error("[pixelic-emojis] Invalid plusPlusColor!");

  if (rank === "OWNER") return rankEmojiConversion["OWNER"];
  if (rank === "ADMIN") return rankEmojiConversion["ADMIN"];
  if (rank === "GAME_MASTER") return rankEmojiConversion["GAME_MASTER"];
  if (rank === "YOUTUBER") return rankEmojiConversion["YOUTUBER"];
  if (rank === "PIG_PLUS_PLUS_PLUS") return rankEmojiConversion["PIG_PLUS_PLUS_PLUS"];
  if (rank === "MVP_PLUS_PLUS") return rankEmojiConversion[`MVP_PLUS_PLUS-${plusColor}-${plusPlusColor}`];
  if (rank === "MVP_PLUS") return rankEmojiConversion[`MVP_PLUS-${plusColor}`];
  if (rank === "MVP") return rankEmojiConversion["MVP"];
  if (rank === "VIP+") return rankEmojiConversion["VIP+"];
  if (rank === "VIP") return rankEmojiConversion["VIP"];
  if (rank === null) return "";
  return new Error("[pixelic-emojis] Unable to parse rankEmoji!");
};

module.exports = {
  parseRankEmoji: parseRankEmoji,
};
