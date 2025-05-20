import { Injectable } from "@angular/core";
import type { Match } from "@types";

@Injectable({ providedIn: "root" })
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

	getIsValidCheckout(checkout: number) {
		if (checkout > 170) return false;
		// @TODO: check if its a valid checkout
		return true;
	}

	getIsValidScore(match: Match, score: number) {
		const currentScore = this.getCurrentScore(match);
		if (currentScore.total - score > 1) return true;
		if (currentScore.total - score < 0) return false;

		return this.getIsValidCheckout(currentScore.total);
	}

	getVictor(match: Match) {
		const currentRound = this.getCurrentRound(match);
		const victor = Object.entries(currentRound.scores).find(([_, score]) => {
			// @TODO: check sets and whether its a first to or best of
			return score.legs === match.options.legs;
		});

		return victor
			? match.players.find((player) => player.uuid === victor[0])
			: null;
	}
}
