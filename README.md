# emoji-toe

Welcome to my first project at General Assembly: Emoji-toe, a re-creation of tic-tac-toe using emoji. The Must-Have objectives below were the minimum requirements for completing the project, while other project goals were either instructor suggestions or personal goals. Checked items are fulfilled and completed in the project, while unchecked items have yet to be implemented. Thanks for taking the time to check this out 🤩!

---

## Must-Haves 🚲

- [x] Display an empty tic-tac-toe board when the page is initially displayed.
- [x] A player can click on the nine cells to make a move.
- [x] Every click will alternate between marking an `X` and `O`.
- [x] Once occupied with an `X` or `O`, the cell cannot be played again.
- [x] Provide a `Reset Game` button that will clear the contents of the board.

---

## Bonuses 🚄

- [x] Display whose turn it is `X` or `O`.
- [x] Provide win logic and display a winning message.
- [x] Provide logic for a tie, and displaying a tie message.
- [x] Fulfill the name of the game - use 👋 and 🦶 as `X` and `O`
- [x] Basic accessibility features
- [x] Add light/dark mode
- [x] Confetti!

---

## Above and Beyond ✈

- [ ] Investigate CSS Grid?
- [ ] Animations!
- [x] Automatic light and dark mode based on user OS preferences
- [x] Favicon
- [ ] Improve mobile experience

---

## WAY Above and Beyond 🚀

- [ ] Play against CPU
- [x] Get game working on GitHub Webpage

---

## Misc To-Dos

- [ ]  Clean-up Confetti Object settings
- [ ]  Investigate options for cleaning up CSS

---

## Known Issues 💣

- Looks very broken on mobile devices
- The foot emoji 🦶 (U+1F9B6) requires Unicode/Emoji 11.0, released in 2018. Browsers/OSs that lack support will instead display a missing emoji symbol such as � (U+FFFD) in its place. Technically the game would still be playable under this condition, as long as user is on a device that supports any emoji display, as 👋 (U+1F44B) is part of Unicode 6.0 released in 2010
- The prefers-color-scheme media query is a relatively new and may not be widely supported, this does not break any functionality of the page.

---

## Credits 🙌

- emoji-toe uses Roboto Slab by Google. Found at: [Google Fonts](https://fonts.google.com/specimen/Roboto+Slab) and [GitHub](https://github.com/googlefonts/robotoslab).
- emoji-toe uses JoyPixels 5.5 waving hand emoji as favicon. Additionally uses waving hand, foot, and angry face with horns emoji as in confetti. Found at: [Joypixels](https://www.joypixels.com/).
- emoji-toe uses confetti-js by Gabriel Age to generate celebratory confetti. Found at: [GitHub](https://github.com/Agezao/confetti-js).
