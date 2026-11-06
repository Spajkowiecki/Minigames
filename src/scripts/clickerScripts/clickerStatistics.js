export const playerStatistics = {
  points: 0,
  clicks: 0,
  ownedUpgrades: [],
};

/**
 *
 * @param {number} value
 */
export function setPoints(value) {
  playerStatistics.points = value;
}

/**
 *
 * @param {number} value
 * @description get actual points value
 * @returns {number} points value
 */
export function getPoints() {
  return playerStatistics.points;
}

/**
 *
 * @param {number} value
 * @description add amount of points from actual value
 */
export function addPoints(value) {
  playerStatistics.points += value;
}

/**
 *
 * @param {number} value
 * @description remove amount of points from actual value
 */
export function removePoints(value) {
  playerStatistics.points -= value;
}
