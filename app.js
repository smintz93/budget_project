
// BUDGET CONTROLLER 
const budgetController = (function() {


})();
// this gets called right away bc of line 13
// works because of closure. inner function always has access to variables even after return statement


// UI CONTROLLER 
const UIController = (function() {
	return {
		getInput: function(){
			return {
			 type: document.querySelector(".add__type").value, // Either inc or exp. 
			 description: document.querySelector(".add__description").value,
			 value: document.querySelector(".add__value").value
			}	
		}
	};

})();

// GLOBAL APP CONTROLLER 
const controller = (function(budgetCtrl, UICtrl) {

	const ctrlAddItem = function(){
		// 1. Get input field data
		const input = UIController.getInput();
		console.log(input);

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