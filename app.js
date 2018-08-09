
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

	const data = {
		 allItems: {
		 	exp: [],
		 	inc:[]
		 },
		 totals: {
		 	exp: 0,
		 	inc: 0
		 }
	};

	return {
		addItem: function(type, des, val){
			let newItem, ID
				

			// ID = last ID + 1
			// length - 1 
			// want the next id so + 1 

			// Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0
			}
			

			// Create new item based on 'inc' or 'exp' type 
			if(type === 'exp'){
				newItem = new Expense(ID, des, val)
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val)
			}
			// Push new item into array. [type] is always going to be exp or inc
			data.allItems[type].push(newItem)

			return newItem;

		}
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

		// 2. Add item to the Budget Controller (accepts 3 params)
		const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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