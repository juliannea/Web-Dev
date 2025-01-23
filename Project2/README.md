[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/H1uKwBRz)
## Assignment 2
### Due Date: 10/24/24 - 5:00pm EST

*Assignment deadlines are strictly enforced, please do try to hand in your assignments on time, and I will honor your commitment by grading them and giving feedback in a timely manner. I do understand that sometimes there may be emergencies that we need to attend to. Please do reach out to me as soon as possible if you know you won't be able to make a deadline.*

---

## Assignment Description

This assignment will help you practice writing JS, such as: working with user events, handling validation, writing selectors to target given elements, and also ones that you create dynamically and getting comfortable with the various array methods (hopefully you'll incorporate using map, reduce, filter), and many more!

We will be continuing on with our Pokémon theme assignments for the semester, and will be expanding upon the Pokédex that you had built for assignment 1.
You're given template code that renders an already built Pokédex, to which you will be implementing JS code to give it some functionality.

Each of the functionality requirements are listed below, along with their grading rubric. You will also be working under certain constraints for this assignment, they are listed below in the next section on "General Instructions & Constraints".

---

## Generic Instructions & Constraints

You **SHOULD NOT** need to use any JS libraries, the native JS functions/code should be able to provide enough functionality for you to complete the assignment. **Any reference/importing of external libraries will result in an incomplete grade for the problem.**

You'll also be working with a lot of assets/data, all of which (Pokémon images, JSON data objects, etc...) is provided for you in the template code. Feel free to swap out any images/assets that you'd like, as long as you adhere to the assignment description/requirements. above or unless specified otherwise.

Lastly, you are **NOT** allowed to modify the given `index.html` file. You will do all your work in `index.js` file (and `index.css` should you choose to modify the styling a bit, although styling will not be graded). Your submission will be graded using the provided/original `index.html` file.

### Getting Started

To get started with the assignment, simply open up `index.html` in your Chrome browser to see/interact with the started code. You'll notice that the Pokédex is closed, clicking on the 
yellow arrow will open the Pokédex and see the rest of the elements render on the screen. Follow the guidelines below to start implementing the requirements for the assignment.

Hints:
- I would modify the JS code temporarily so that the Pokédex always renders in an open state so it's easier to work with, as most of the requirements are for the opened state.
- Have the browser and your code editor open side by side, code in increments and frequently refresh the page to see/test your changes.
- Your Chrome/browser debugger is your friend!

---

## Functional Requirements

These are your core requirements for the assignments, each broken down by their features/function, and listed next to each is their respective % of your grade. Follow the guidelines and requirements listed, grading will be done strictly to these guidelines. Feel free to reach out over Slack if any of the requirements are unclear!

### Left Panel

#### 1. Open/Close Pokédex (10%)
- With the starter code, you are able to open the Pokédex by clicking on the yellow triangle in the middle of the closed Pokédex to open it.
- You should be able to close the Pokédex by clicking on the blue circle, in the top left corner of the left side panel that turns red when hovered upon.
- Closing the Pokédex should return you to the initial closed state of the app.
- You should be able to open/close the Pokédex as many times as you wish.
- The internal state (selected Pokémon) of the Pokédex should be preserved when opening/closing the Pokédex.

#### 2. Pokémon Detail Display (15%)
- The current selected Pokémon should be displayed in the Pokémon data section in the middle of the panel.
- The selected Pokémon image should be displayed in the black box/window. Image assets provided in the `/img` folder.
- The Pokémon's name should also be rendered below it, in all **CAPS**!
- The Pokémon's name associated to the image can be found in the `POKEMON_DATA` object given in the `index.js` started code.

#### 3. Random Button (15%)
- There is a green `RANDOM` button right below the Pokémon detail display section.
- Clicking on this button should randomly select one of the 15 Pokémon listed on the right panel.
- There's a chance that you can randomly select the currently selected Pokémon. The implication is that it won't really do anything/change/update the state of the app.

#### 4. Navigation Buttons (20%)
- Below the random button, there are 4 navigation buttons (up, down, left, right).
- Clicking on each of these buttons will navigate away from the currently selected Pokémon.
- You are **NOT** able to navigate out of bounds.
  - If your selected Pokémon is at the top most row, clicking the up arrow will not do anything.
  - The same goes for all other boundaries (left/right most columns, bottom row, etc...).
- Navigation to a new Pokémon will cause that Pokémon to be selected and follow all the same effect/implication of being selected.
  - i.e. It should have a yellow selected border, and it should update the Pokémon detail image/name.
- Navigation can also be done via keyboard arrows. See req #3 below in the `Right Panel` requirements section.

### Right Panel

#### 1. Rendering Pokémon List (10%)
- In the opened state of the Pokédex, you should see a right side panel with a number of grid/list items rendered.
- You should see Pikachu already rendered for you, with the rest of the list items rendering the placeholder image of a Pokéball.
- You are required to render all 15 Pokémon, whose image assets should be provided for you already in the `./img` folder.
- The image files are named based on the Pokémon's id.
- The ids/names of all the Pokémon you are required to render are listed in the `POKEMON_DATA` object that is already defined for you within `index.js`.
- You may render the list in any order.
- There should be a yellow border when you hover over the Pokémon list item, this should already be provided for you via the starter code. Your end result of rendering this list should preserve this functionality.

#### 2. Selecting a Pokémon (15%)
- The provided template code has the top left most Pokémon on the list selected.
- You are only allowed to have one Pokémon selected at a time.
- Selected Pokémon will be highlighted with a yellow border (CSS already provided for you).
- Clicking on a Pokémon on the list will select it. You can click on the currently selected Pokémon as well, but the implication is that it won't really do anything.
- It will also cause the Pokémon detail display on the left panel to update accordingly (see left panel requirement above).

#### 3. Pokémon List Keyboard Navigation (15%)
- Similar to the navigation buttons requirement above, clicking the up/down/left/right arrows on the keyboard should also perform the same navigation.
- We should also prevent the navigation from going out of bounds.
- It should also follow the same selected Pokémon logic outlined above (updating selected Pokémon details).

---

## Demo/Expected Outcome

There will be a demo/expected outcome that I will go over as part of the lecture. It should be part of the lecture recording, so you can go back and take a look for reference. Also, feel free to post in Slack if you have any questions regarding the requirements of this assignment.