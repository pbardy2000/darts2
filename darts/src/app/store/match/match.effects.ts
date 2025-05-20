import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Pages } from "@models/pages";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { selectMatchOptions } from "@store/match-options";
import { selectSelectedPlayers } from "@store/player/selected/selected-players.selectors";
import type { Match, Player, Round } from "@types";
import { nanoid } from "nanoid";
import { filter, map, of, tap } from "rxjs";
import {
	addLeg,
	addMatch,
	addRound,
	addScore,
	endMatch,
	startMatch,
} from "./match.actions";
import { selectMatchFromRoute } from "./match.selectors";
import { MatchService } from "./match.service";

@Injectable()
export class MatchEffects {
	readonly store = inject(Store);
	readonly actions = inject(Actions);
	readonly router = inject(Router);
	readonly matchService = inject(MatchService);

	onStartMatch = createEffect(() =>
		this.actions.pipe(
			ofType(startMatch),
			concatLatestFrom(() => [
				this.store.select(selectMatchOptions),
				this.store.select(selectSelectedPlayers),
			]),
			map(([_, options, players]) => {
				const now = new Date().toISOString();

				const match: Match = {
					uuid: nanoid(),
					options,
					players,
					completed: false,
					createdAt: now,
					updatedAt: now,
					deletedAt: null,
					sets: [
						// first set
						[
							// first leg
							[
								// first round
								{
									uuid: nanoid(),
									set: 1,
									leg: 1,
									score: null,
									scorer: null,
									scores: players.reduce(
										(scores, player) =>
											Object.assign(scores, {
												[player.uuid]: {
													total: options.points,
													order: player.order,
													sets: 0,
													legs: 0,
												},
											}),
										{} satisfies Round["scores"],
									),
								},
							],
						],
					],
				};

				return match;
			}),
			tap((match) =>
				this.router.navigate([Pages.MATCH.replace(":matchId", match.uuid)]),
			),
			map((match) => addMatch({ match })),
		),
	);

	onAddScore = createEffect(() =>
		this.actions.pipe(
			ofType(addScore),
			concatLatestFrom(() => this.store.select(selectMatchFromRoute)),
			map(([action, match]) => {
				const currentScore = this.matchService.getCurrentScore(match);
				const currentRound = this.matchService.getCurrentRound(match);
				const currentPlayer = this.matchService.getCurrentPlayer(match);

				const round: Round = {
					...currentRound,
					uuid: nanoid(),
					score: action.score,
					scorer: currentPlayer.uuid,
					scores: {
						...currentRound.scores,
						[currentPlayer.uuid]: {
							...currentScore,
							total: currentScore.total - action.score,
						},
					},
				};

				return addRound({ match, round });
			}),
		),
	);

	onAddRound = createEffect(() =>
		this.actions.pipe(
			ofType(addRound),
			filter(({ round }) => round.scores[round.scorer as string].total === 0),
			map(({ round, match }) =>
				addLeg({
					match,
					leg: [
						{
							...round,
							uuid: nanoid(),
							leg: round.leg + 1,
							scorer: null,
							scores: Object.entries(round.scores).reduce(
								(scores, [id, player]) =>
									Object.assign(scores, {
										[id]: {
											...player,
											legs: id === round.scorer ? player.legs + 1 : player.legs,
											total: match.options.points,
										},
									}),
								{} satisfies Round["scores"],
							),
						},
					],
				}),
			),
		),
	);

	onAddLeg = createEffect(() =>
		this.actions.pipe(
			ofType(addLeg),
			concatLatestFrom(({ match }) => of(this.matchService.getVictor(match))),
			filter(([_, victor]) => victor !== null),
			map(([{ match }, v]) => endMatch({ match, victor: v as Player })),
		),
	);

	onMatchEnd = createEffect(
		() =>
			this.actions.pipe(
				ofType(endMatch),
				map(({ match }) => Pages.MATCH_SUMMARY.replace(":matchId", match.uuid)),
				tap((redirectUrl) => this.router.navigate([redirectUrl])),
			),
		{ dispatch: false },
	);
}
