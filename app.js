
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

	document.querySelector(".add__btn").addEventListener("click", function(){

		// 1. Get input field data

		// 2. Add item to the Budget Controller 

		// 3. Add the item to UI 

		// 4. Calc budget 

		// 5. Display budget on UI
	})

	// If user hits 'enter' --> keycode 107
	document.addEventListener("keypress", function(e){

		if(e.keyCode === 13){
			console.log('ENTER was pressed')
		} else {
			console.log("...")
		}
	})

})(budgetController, UIController);