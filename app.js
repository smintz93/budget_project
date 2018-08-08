
// BUDGET CONTROLLER 
const budgetController = (function() {

	const Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	const Income = function(id, description, value) {
	this.id = id;
	this.description = description;
	this.value = value;
	};



})();



// UI CONTROLLER 
const UIController = (function() {

	const DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		addBtn: ".add__btn"
	}

	return {
		getInput: function(){
			return {
			 type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp. 
			 description: document.querySelector(DOMstrings.inputDescription).value,
			 value: document.querySelector(DOMstrings.inputValue).value
			}	
		},
		// Public so it can be passed to Global App controller 
		getDOMstrings: function(){
			return DOMstrings;
		}
	};
})();

// GLOBAL APP CONTROLLER 
const controller = (function(budgetCtrl, UICtrl) {

	const setupEventListeners = function (){

		const DOM = UIController.getDOMstrings();
		// Pass stand along function in here. Callback function. Event listener will call functio.
		document.querySelector(DOM.addBtn).addEventListener("click", ctrlAddItem);
		// If user hits 'enter' --> keyCode 13
		document.addEventListener("keypress", function(e){
		if(e.keyCode === 13){
			ctrlAddItem();	
		} 
	})
}
	const ctrlAddItem = function(){
		// 1. Get input field data
		const input = UIController.getInput();

		// 2. Add item to the Budget Controller 

		// 3. Add the item to UI 

		// 4. Calc budget 

		// 5. Display budget on UI

	};

	// Public
	return {
		init: function(){
			console.log("App has started")
			setupEventListeners();
		}
	};

})(budgetController, UIController);


controller.init();