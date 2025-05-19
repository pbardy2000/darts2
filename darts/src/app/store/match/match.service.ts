import { Injectable } from '@angular/core';
import type { Match } from '@types';

@Injectable({ providedIn: 'root' })
export class MatchService {
  getCurrentRound(match: Match) {
    return match.sets[0][0][0];
  }

  getCurrentPlayer(match: Match) {
    const n = match.players.length;
    const setOffset = match.sets.length % n;
    const legOffset = match.sets[0].length % n;
    const roundOffset = match.sets[0][0].length % n;
    const offset = (setOffset + legOffset + roundOffset) % n;
    const currentPlayer = match.players[offset];

    return currentPlayer;
  }

  getCurrentScore(match: Match) {
    const currentRound = this.getCurrentRound(match);
    const currentPlayer = this.getCurrentPlayer(match);
    const currentScore = currentRound.scores[currentPlayer.uuid];

    return currentScore;
  }
}
