// Feel free to modify this JS code as you see fit!
// Just don't import any external 3rd party JS libraries for this assignment!

const POKEMON_DATA = [
	{ "id": 1, "name": "bulbasaur" },
	{ "id": 4, "name": "charmander" },
	{ "id": 7, "name": "squirtle" },
	{ "id": 25, "name": "pikachu" },
	{ "id": 39, "name": "jigglypuff" },
	{ "id": 137, "name": "porygon" },
	{ "id": 144, "name": "articuno" },
	{ "id": 151, "name": "mew" },
	{ "id": 175, "name": "togepi" },
	{ "id": 249, "name": "lugia" },
	{ "id": 393, "name": "piplup" },
	{ "id": 399, "name": "bidoof" },
	{ "id": 483, "name": "dialga" },
	{ "id": 727, "name": "incineroar" },
	{ "id": 792, "name": "lunala" }
]

window.onload = async () => { //waits for everything to be loaded 

  //gets the elements (parts of the visual)
	const pokedex = document.getElementById('pokedex');
	const leftPanelClosed = document.getElementById('left-panel-closed');
	const openButton = document.getElementById('open-arrow');
  const closeButton = document.getElementById('close-circle')

	// Init function. Use this to do stuff when the app start to first load.
	const onInit = () => {
		pokedex.style = "display: none"; //makes it initally closed by displaying none
		openButton.addEventListener('click', () => { //makes it so when yellow arrow is clicked opens 
			pokedex.style.display = "flex";
			leftPanelClosed.style.display = "none";
		})

    //close button 
    closeButton.addEventListener('click', () =>{
      leftPanelClosed.style.display = "block"; //for some reason wehn display flex it arrow goes wonky
      pokedex.style.display = "none";
    })

                //render images
    // Select all img elements within the pokemon-list-item class
    const images = document.querySelectorAll('.pokemon-list-item img');
    images.forEach((img)=>{
      console.log(img.src);
    })
    //turn into an array for easier time changing & can use for each method
    var imagesArray = Array.from(images);
    // Log each img element
    imagesArray.forEach((img) => {
    console.log(img); // Logs the img element itself
    });
    //function to change src 
    imagesArray.forEach(changeSrc)
    //changing the src 
    function changeSrc(img, index, arr){
      if(index < POKEMON_DATA.length){
        const id = String(POKEMON_DATA[index].id);
        img.src = "img/" + id + ".png";
        console.log(`Updated src for image ${index}: ${img.src}`);
      }
    }
    //--------------------------------------------------------------------------
    console.log("selection part");
                      //Selecting a Pokemon--
    const pokemonItems = document.getElementsByClassName("pokemon-list-item");

    var selectedItem = document.querySelector(".selected-list-item");
    DisplaySelected(); //initial selected state 

      //when user clicks to select 
    for(let i = 0; i < pokemonItems.length; i++){
      pokemonItems[i].addEventListener('click', () => {
                  //have the yellow highlight 
        selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue");
        selectedItem = pokemonItems[i];
        pokemonItems[i].setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
        
                  //Left Side Display Selected Pokemon
        DisplaySelected();


      })
    }
    //-------------------------------------Randomizer
    const randomButton = document.getElementById('random-button');
    randomButton.addEventListener('click',() =>{
      console.log("randomizer clicked");
      var randomIndex = Math.floor(Math.random() * POKEMON_DATA.length);
      console.log("random index chosen: " + randomIndex); //finds random index
      selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue");
      selectedItem = pokemonItems[randomIndex]; //b/c pokemonItems are in the same order as POKEMON_DATA array it matches with the index 
      pokemonItems[randomIndex].setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
      DisplaySelected()
    })

    //----------------------Clicking arrows 
    const leftArrow = document.getElementsByClassName('arrow left')[0]; // Get the first element
    leftArrow.addEventListener('click', () => {
      ArrowLeft();
    });
    const rightArrow = document.getElementsByClassName('arrow right')[0]; // Get the first element
    rightArrow.addEventListener('click', () => {
      ArrowRight();
    
    });
    const upArrow = document.getElementsByClassName('arrow up')[0];
    upArrow.addEventListener('click', () =>{
      ArrowUp();
    })
    const downArrow = document.getElementsByClassName('arrow down')[0];
    downArrow.addEventListener('click', () =>{
      ArrowDown();
    })

    //-----------Key Arrows
     document.addEventListener("keydown", event => {
      if(event.key.startsWith("Arrow")){
        switch(event.key){
          case "ArrowUp":
            ArrowUp();
            break;
          case "ArrowDown":
            ArrowDown();
            break;
          case "ArrowLeft":
            ArrowLeft();
            break;
          case "ArrowRight":
            ArrowRight();
            

        }
      }
     })
   

    
//left arrow
//----------------------------------------functions---------------------
function ArrowLeft(){
    if (selectedItem) {
      // Use previousElementSibling instead of previousSibling
      var previousItem = selectedItem.previousElementSibling;
      
      // Check if previousItem exists and has the required classes
      if (previousItem && previousItem.classList.contains('pokemon-list-item') && previousItem.classList.contains('pokedex-blue')) {
          // Update the class for the currently selected item
          selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue");
  
          // Set the new selected class on the previous item
          previousItem.setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
          selectedItem = previousItem;
          DisplaySelected();
      }
    }
  
}
  

function ArrowRight(){
  if (selectedItem) {
  // Use previousElementSibling instead of previousSibling
  var previousItem = selectedItem.nextElementSibling;
  
  // Check if previousItem exists and has the required classes
  if (previousItem && previousItem.classList.contains('pokemon-list-item') && previousItem.classList.contains('pokedex-blue')) {
      // Update the class for the currently selected item
      selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue");

      // Set the new selected class on the previous item
      previousItem.setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
      selectedItem = previousItem;
      DisplaySelected();
  }
}

}

//up arrow (in a row of 3 would have to move up 3 in an array)
const pokemonItemsArray = Array.from(pokemonItems);
function ArrowUp(){
  //help visualize the list 
  pokemonItemsArray.forEach((item, index) => {
    console.log("Index: " + index);
    console.log("Element: ", item);
  });
  //find the index 
  for(let i = 0; i < pokemonItemsArray.length; i++){
    if(pokemonItemsArray[i].classList.contains('selected-list-item')){
      var index = i;
      break;
    }
  }
  console.log("selected index: " + index);
  //find new index & see if valid 
  var newIndex = index - 3; //b/c moving up so if in pos 6 go up to pos 3 since 3 columns
  if(newIndex >= 0 && newIndex< pokemonItemsArray.length){
    selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue")
    newSelected = pokemonItemsArray[newIndex];
    newSelected.setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
    selectedItem = newSelected;
    DisplaySelected();
  }

}
 
function ArrowDown(){
 //down arrow
  //up arrow (in a row of 3 would have to move down 3 in an array)
  const downArrow = document.getElementsByClassName('arrow down')[0];
  downArrow.addEventListener('click', () =>{

  })
  //help visualize the list 
  pokemonItemsArray.forEach((item, index) => {
    console.log("Index: " + index);
    console.log("Element: ", item);
  });
  //find the index 
  for(let i = 0; i < pokemonItemsArray.length; i++){
    if(pokemonItemsArray[i].classList.contains('selected-list-item')){
      var index = i;
      break;
    }
  }
  console.log("selected index: " + index);
  //find new index & see if valid 
  var newIndex = index + 3; //b/c moving down this time
  if(newIndex >= 0 && newIndex< pokemonItemsArray.length){
    selectedItem.setAttribute("class", "pokemon-list-item pokedex-blue")
    newSelected = pokemonItemsArray[newIndex];
    newSelected.setAttribute("class", "pokemon-list-item pokedex-blue selected-list-item");
    selectedItem = newSelected;
    DisplaySelected();
  }

}
    
    function DisplaySelected(){
      //image
      var pokemonDisplay = document.getElementById('pokemon-display');
      var pokemonDisplayImage = pokemonDisplay.querySelector('img'); //gets the first img element 
      var selectedImage = selectedItem.querySelector('img'); //the image of the selected item
      pokemonDisplayImage.src = selectedImage.src;
      //name
      var selectedSrcPath = pokemonDisplayImage.src; //outputs the http nonense 
        console.log("name: " + selectedSrcPath);
        var selectedSrcFile = selectedSrcPath.split('/').pop(); //gives only #.png
        console.log("file name: " + selectedSrcFile);
        var selectedIdNum = Number(selectedSrcFile.split('.')[0]);
        console.log("ID num: " + selectedIdNum);

        console.log("changed selected item");
        //loop through array get the name & change it 
        const displayName = document.getElementById('name-display');

        console.log("ID: " + POKEMON_DATA[4].id + " Name: " + POKEMON_DATA[4].name); //testing logic right 
        for(let j = 0; j < POKEMON_DATA.length; j++){
          if(POKEMON_DATA[j].id == selectedIdNum){
            displayName.innerText = POKEMON_DATA[j].name.toUpperCase();
          }
        }

    }

 
   

   
  
  

  
  
  
  
  
  
  
  }



	// On startup, call onInit.
	onInit();

  
  
}