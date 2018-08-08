
// BUDGET CONTROLLER 
const budgetController = (function() {


})();
// this gets called right away bc of line 13
// works because of closure. inner function always has access to variables even after return statement


// UI CONTROLLER 
const UIController = (function() {

	// some code

})();

// GLOBAL APP CONTROLLER 
const controller = (function(budgetCtrl, UICtrl) {

	const ctrlAddItem = function(){
		// 1. Get input field data

		// 2. Add item to the Budget Controller 

		// 3. Add the item to UI 

		// 4. Calc budget 

		// 5. Display budget on UI

	}

	// Pass stand along function in here. Callback function. Event listener will call functio.
	document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

	


	// If user hits 'enter' --> keyCode 13
	document.addEventListener("keypress", function(e){

		if(e.keyCode === 13){
			ctrlAddItem();	

		} 
	})

})(budgetController, UIController);