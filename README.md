# emoji-toe

Welcome to my first project at General Assembly: Emoji-toe, a re-creation of tic-tac-toe using emoji. The Must-Have objectives below were the minimum requirements for completing the project, while other project goals were either instructor suggestions or personal goals. Thanks for taking the time to check this out! 🤩

---

## Must-Haves 🚲

- [x] Display an empty tic-tac-toe board when the page is initially displayed.
- [x] A player can click on the nine cells to make a move.
- [x] Every click will alternate between marking an `X` and `O`.
- [x] Once occupied with an `X` or `O`, the cell cannot be played again.
- [x] Provide a `Reset Game` button that will clear the contents of the board.

---

## Bonuses 🚀

- [x] Display whose turn it is `X` or `O`.
- [x] Provide win logic and display a winning message.
- [x] Provide logic for a tie, and displaying a tie message.
- [x] Fulfill the name of the game - use 👋 and 🦶 as `X` and `O`
- [x] Basic accessibility features
- [x] Add light/dark mode
- [x] Confetti!
- [x] Investigate CSS Grid? (Not needed)
- [ ] Animations!
- [x] Automatic light and dark mode based on user OS preferences
- [x] Favicon
- [x] Improve mobile experience
- [ ] Play against CPU
- [x] Get game working on GitHub Webpage
- [ ] Flesh out AI to be more than just random number generator

---

## Misc To-Dos

- [ ]  Clean-up Confetti Object settings
- [x]  Investigate options for cleaning up CSS

---

## Known Issues 💣

- The foot emoji 🦶 (U+1F9B6) requires Unicode/Emoji 11.0, released in 2018. Browsers/OSs that lack support will instead display a missing emoji symbol such as � (U+FFFD) in its place. Technically the game would still be playable under this condition, as long as user is on a device that supports any emoji display, as 👋 (U+1F44B) is part of Unicode 6.0 released in 2010
- The prefers-color-scheme media query is a relatively new and may not be widely supported, however if used on an unsupported browser none of the functionality of the page will be impacted.

---

## Credits 🙌

- Check out the [Attributions](https://github.com/DavidStinson/emoji-toe/blob/master/Attributations.md).
