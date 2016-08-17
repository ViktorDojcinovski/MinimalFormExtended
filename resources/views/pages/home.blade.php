@extends('layout')

@section('content')
	<section>
		<form id="theForm" class="simform" autocomplete="off">
			<div class="simform-inner">
				<ol class="questions">
					<li>
						<span><label for="q1">What's your favorite movie?</label></span>
						<input id="q1" name="q1" type="text"/>
					</li>
					<li>
						<span><label for="q2">Where do you live?</label></span>
						<input id="q2" name="q2" type="text"/>
					</li>
					<li>
						<span><label for="q3">What time do you got to work?</label></span>
						<input id="q3" name="q3" type="text"/>
					</li>
					<li>
						<span><label for="q4">How do you like your veggies?</label></span>
						<input id="q4" name="q4" type="text"/>
					</li>
					<li>
						<span><label for="q5">What book inspires you?</label></span>
						<input id="q5" name="q5" type="text"/>
					</li>
					<li>
						<span><label for="q6">What's your profession?</label></span>
						<input id="q6" name="q6" type="text"/>
					</li>
				</ol><!-- /questions -->
				<button class="submit" type="submit">Send answers</button>
				<div class="controls">
					<button class="next"></button>
					<div class="progress"></div>
					<span class="number">
						<span class="number-current"></span>
						<span class="number-total"></span>
					</span>
					<span class="error-message"></span>
				</div><!-- / controls -->
			</div><!-- /simform-inner -->
			<span class="final-message"></span>
		</form><!-- /simform -->			
	</section>
@stop


