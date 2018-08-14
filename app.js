
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
		 },
		 budget: 0,
		 percentage: -1
	};

	const calculateTotal = function(type){
		let sum = 0; 
		data.allItems[type].forEach(function(current){
			sum += current.value;
		});

		data.totals[type] = sum;

	
	}

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

		},
		calculateBudget: function(){

			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate budget: income - expenses 
			data.budget = data.totals.inc - data.totals.exp;

			// calculate % of income 
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}


		},

		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		}
	};

})();



// UI CONTROLLER 
const UIController = (function() {

	const DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		addBtn: ".add__btn",
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		expensesLabel: '.budget__expenses--value',
		incomeLabel: '.budget__income--value',
		percentageLabel: '.budget__expenses--percentage'
	}

	return {
		getInput: function(){
			return {
			 type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp. 
			 description: document.querySelector(DOMstrings.inputDescription).value,
			 value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}	
		},

		addListItem: function(obj, type){
			// Create HTML string with palceholder text
			let html, newHtml, element;

			if(type === 'inc') {
				element = DOMstrings.incomeContainer;
				html =  '<div class="item clearfix" id="income-%id%"> <div class="item__description"> %description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
			} else if(type === 'exp') {
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			// Replace pholder text with real data 
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert HTML into DOM 
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

		},

		clearFields: function() {
			const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

			// trick slice method into thinking fields is an array
			const fieldsArray = Array.prototype.slice.call(fields);

			// loops over all elements in fieldsArray and sets value to ""
			fieldsArray.forEach(function(current, index, array){
				current.value = "";
			});

			fieldsArray[0].focus();
		},
		// Public so it can be passed to Global App controller 
		getDOMstrings: function(){
			return DOMstrings;
		},

		displayBudget: function(obj) {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
	

			if(obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
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

	const updateBudget = function(){

		// 1. Calc budget 
		budgetCtrl.calculateBudget();

		// 2. Return budget 
		const budget = budgetCtrl.getBudget();

		// 3. Display budget on UI
		UICtrl.displayBudget(budget);


	}
	const ctrlAddItem = function(){
		// 1. Get input field data
		const input = UIController.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value > 0 ){
			// 2. Add item to the Budget Controller (accepts 3 params)
			const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to UI 
			UIController.addListItem(newItem, input.type)

			// 4. Clear fields 
			UIController.clearFields();

			// 5. Calc and update Budget
			updateBudget();

		}
	
	};

	// Public
	return {
		init: function(){
			console.log("App has started")
			UICtrl.displayBudget( {
				budget: 0,	
				totalInc: 0, 
				totalExp: 0,
				percentage: 0
			});
			setupEventListeners();
		}
	};

})(budgetController, UIController);


controller.init();