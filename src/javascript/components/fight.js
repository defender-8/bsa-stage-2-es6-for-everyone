import { controls } from '../../constants/controls';

export function fight(firstFighter, secondFighter) {
  const firstFighterIndicator = document.getElementById('left-fighter-indicator');
  const secondFighterIndicator = document.getElementById('right-fighter-indicator');
  const indicatorContainerWidth = document.querySelector('.arena___health-indicator').offsetWidth;

  let isFirstFighterInBlock = false;
  let isSecondFighterInBlock = false;

  document.addEventListener('keydown', (e) => {
    if (e.code === controls.PlayerOneBlock) {
      isFirstFighterInBlock = true;
    }

    if (e.code === controls.PlayerTwoBlock) {
      isSecondFighterInBlock = true;
    }
  });

  return function (keyUpEvent) {
    if (keyUpEvent.code === controls.PlayerOneBlock) {
      isFirstFighterInBlock = false;
    }

    if (keyUpEvent.code === controls.PlayerTwoBlock) {
      isSecondFighterInBlock = false;
    }

    if (keyUpEvent.code === controls.PlayerOneAttack) {
      if (!isFirstFighterInBlock) {
        const damage = isSecondFighterInBlock ? getDamage(firstFighter, secondFighter) : getHitPower(firstFighter);
        const substrWidth = (indicatorContainerWidth * damage) / secondFighter.health;
        const secondFighterIndicatorWidth =
          ((secondFighterIndicator.offsetWidth - substrWidth) * 100) / indicatorContainerWidth;

        secondFighterIndicator.style.width = secondFighterIndicatorWidth > 0 ? secondFighterIndicatorWidth + '%' : 0;

        if (secondFighterIndicatorWidth <= 0) {
          return new Promise((resolve) => {
            // resolve the promise with the winner when fight is over
            resolve(firstFighter);
          });
        }
      }
    }

    if (keyUpEvent.code === controls.PlayerTwoAttack) {
      if (!isSecondFighterInBlock) {
        const damage = isFirstFighterInBlock ? getDamage(secondFighter, firstFighter) : getHitPower(secondFighter);
        const substrWidth = (indicatorContainerWidth * damage) / firstFighter.health;
        const firstFighterIndicatorWidth =
          ((firstFighterIndicator.offsetWidth - substrWidth) * 100) / indicatorContainerWidth;

        firstFighterIndicator.style.width = firstFighterIndicatorWidth > 0 ? firstFighterIndicatorWidth + '%' : 0;

        if (firstFighterIndicatorWidth <= 0) {
          return new Promise((resolve) => {
            // resolve the promise with the winner when fight is over
            resolve(secondFighter);
          });
        }
      }
    }
  };
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);

  return damage > 0 ? damage : 0;
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
