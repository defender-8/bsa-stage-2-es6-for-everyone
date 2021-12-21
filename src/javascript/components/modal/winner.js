import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';

export function showWinnerModal(fighter) {
  const title = `${fighter?.name} is the winner!`;
  const bodyElement = createFighterImage(fighter);
  const onClose = () => window.location.reload();

  showModal({ title, bodyElement, onClose });
}
