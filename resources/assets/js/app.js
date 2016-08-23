/* 
----------------------------------
Some basic rules for the module:
----------------------------------
1.it is self contained
	-if it should manage more than one job, it should be splited in more than one module
	-everything to do with this module is in this module
	-no global variables
2.separation of concerns
3.efficient DOM usage
	-as few $(selector) or getElementById expressions 
4.no memory leaks
	-all events can be unbound
*/
;(function(window) {
	'use strict';

	var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	support = { transitions : Modernizr.csstransitions };

	var StepsForm = function(el, options) {
		return new StepsForm.init(el, options);
	}

	StepsForm.init = function(el, options) {
		this.el = el;
		this.options = options;
		//current step
		this.current = 0;
		// questions
		this.questions = [].slice.call( this.el.querySelectorAll( 'ol.questions > li' ) );
		// total questions
		this.questionsCount = this.questions.length;
		// show first question
		classie.addClass( this.questions[0], 'current' );
		// next question control
		this.ctrlNext = this.el.querySelector( 'button.next' );
		// previous question control
		this.ctrlPrevious = this.el.querySelector( 'button.previous' );
		// progress bar
		this.progress = this.el.querySelector( 'div.progress' );
		// question number status
		this.questionStatus = this.el.querySelector( 'span.number' );
		// current question placeholder
		this.currentNum = this.questionStatus.querySelector( 'span.number-current' );
		this.currentNum.innerHTML = Number( this.current + 1 );
		// total questions placeholder
		this.totalQuestionNum = this.questionStatus.querySelector( 'span.number-total' );
		this.totalQuestionNum.innerHTML = this.questionsCount;

		// error message
		this.error = this.el.querySelector( 'span.error-message' );
		// init events
		this.initEvents();
	}

	StepsForm.prototype = {
		initEvents: function() {
			//declare variables
			var self = this,
			//declare the first input element
			firstElInput = this.questions[this.current].querySelector('input'),
			//show the first input element on init
			onFocusStartFn = function () {
				firstElInput.removeEventListener('focus', onFocusStartFn);
				classie.addClass(self.ctrlNext, 'show');
			};

			firstElInput.addEventListener('focus', onFocusStartFn);

			this.ctrlNext.addEventListener('click', function(event){	
				event.preventDefault();
				self.nextQuestion();
			});

			this.ctrlPrevious.addEventListener('click', function(event){	
				event.preventDefault();
				self.previousQuestion();
			});

			//press enter to jump to the next question
			document.addEventListener('keydown', function(event) {
				var keyCode = event.keyCode || event.which;

				if(keyCode == 13) {
					event.preventDefault();
					self.nextQuestion();
				}
			})
			//disable action on tab
			this.el.addEventListener( 'keydown', function( ev ) {
				var keyCode = ev.keyCode || ev.which;
				// tab
				if( keyCode === 9 ) {
					ev.preventDefault();
				} 
			});
		},
		nextQuestion: function() {
			if(!this.validate()) {
				return false;
			}
			//check if the form is filled
			if(this.current === this.questionsCount - 1 ) {
				this.isFilled = true;
			}
			//clear error if it is displayed and update progress
			this.clearError();
			// current question
			var currentQuestion = this.questions[ this.current ];

			// increment current question iterator
			++this.current;
			//check if the question is first or not to show the back button
			if(!classie.hasClass(this.ctrlPrevious, 'show')) {
				classie.addClass(this.ctrlPrevious, 'show');
			}

			this.makeProgress();

			if(!this.isFilled) {
				// change the current question number/status
				this.updateQuestionNumber();
				
				var nextQuestion = this.questions[this.current];
				//add class 'show-next' to the form element to triiger animation on all succesor elements
				classie.addClass(this.el, 'show-next');

				//hide current question and show next question
				classie.removeClass(currentQuestion, 'current');
				classie.addClass(nextQuestion, 'current');
			}

			// after animation ends, remove class "show-next" from form element and change current question placeholder
			var self = this,
			onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				if( self.isFilled ) {
					self.submit();
				}
				else {
					classie.removeClass( self.el, 'show-next' );
					self.currentNum.innerHTML = self.nextQuestionNum.innerHTML;
					self.questionStatus.removeChild( self.nextQuestionNum );
					// force the focus on the next input
					nextQuestion.querySelector( 'input' ).focus();
				}
			};

			if( support.transitions ) this.progress.addEventListener( transEndEventName, onEndTransitionFn );
			else onEndTransitionFn();
		},
		previousQuestion: function() {
			//clear error messages
			this.clearError();

			// current question
			var currentQuestion = this.questions[ this.current ];

			// decrement current question iterator
			--this.current;

			//update the progress bar and the numbers
			this.makeProgress();

			// change the current question number/status
			this.updateQuestionNumber();

			// add class "show-previous" to form element (start animations)
			classie.addClass( this.el, 'show-previous' );

			//if the question is the first one then hide the button
			if( this.current === 0 ) {
				classie.removeClass( this.ctrlPrevious, 'show' );
			}

			var previousQuestion = this.questions[ this.current ];
			classie.removeClass( currentQuestion, 'current' );
			classie.addClass( previousQuestion, 'current' );

			// after animation ends, remove class "show-next" from form element and change current question placeholder
			var self = this,
				onEndTransitionFn = function( ev ) {
					if( support.transitions ) {
						this.removeEventListener( transEndEventName, onEndTransitionFn );
					}
					
					classie.removeClass( self.el, 'show-previous' );
					self.currentNum.innerHTML = self.nextQuestionNum.innerHTML;
					self.questionStatus.removeChild( self.nextQuestionNum );
					// force the focus on the next input
					previousQuestion.querySelector( 'input' ).focus();
				};

			if( support.transitions ) {
				this.progress.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		},
		makeProgress: function() {
			this.progress.style.width = this.current * (100/this.questionsCount) + '%';
		},
		validate: function() {
			var inputValue = this.questions[this.current].querySelector('input').value;

			if(inputValue === '') {
				this.showError('EMPTYSTR');
				return false;
			}
			return true;
		}, 
		updateQuestionNumber: function() {
			// first, create next question number placeholder
			this.nextQuestionNum = document.createElement( 'span' );
			this.nextQuestionNum.className = 'number-next';
			this.nextQuestionNum.innerHTML = Number( this.current + 1 );
			// insert it in the DOM
			this.questionStatus.appendChild( this.nextQuestionNum );
		},
		showError: function(err) {
			var message = '';
			switch(err) {
				case 'EMPTYSTR' :
				message = 'Please fill the field before continuing!';
				break;
				case 'INVALIDEMAIL' :
				message = 'Please enter valid email address!';
				break;
			}
			this.error.innerHTML = message;
			classie.addClass(this.error, 'show');
		}, 
		clearError: function() {
			this.error.innerHTML = '';
			classie.removeClass(this.error, 'show');	
		}, 
		submit: function() {
			this.options.onSubmit(this.el);
		}
	};

	StepsForm.init.prototype = StepsForm.prototype;

	//atach newly created object to the global object
	window.StepsForm = StepsForm;
})(window);