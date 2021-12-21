import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
  return getHitPower(attacker) - getBlockPower(defender);
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = getRandomNumber(1, 2);
  const power = fighter.attack * criticalHitChance;

  return power;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = getRandomNumber(1, 2);
  const power = fighter.defense * dodgeChance;

  return power;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
