import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)
  const imageElement = fighter ? createFighterImage(fighter) : '';
  const infoElement = fighter ? createFighterInfoBlock(fighter) : '';

  fighterElement.append(imageElement);
  fighterElement.append(infoElement);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}

function createFighterInfoBlock(fighter) {
  const infoBlock = createElement({
    tagName: 'div',
    className: 'fighter-preview___info'
  });

  const nameElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___info-name'
  });

  nameElement.innerHTML = fighter.name;

  function createInfoItem(itemName) {
    const itemElement = createElement({
      tagName: 'div',
      className: 'fighter-preview___info-item'
    });

    itemElement.innerHTML = `<span class="fighter-preview___info-item-title">${itemName}</span><span>${fighter[itemName]}</span>`;

    return itemElement;
  }

  infoBlock.append(nameElement);
  infoBlock.append(createInfoItem('health'));
  infoBlock.append(createInfoItem('attack'));
  infoBlock.append(createInfoItem('defense'));

  return infoBlock;
}
