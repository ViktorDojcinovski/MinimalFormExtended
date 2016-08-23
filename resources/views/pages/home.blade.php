@extends('layout')

@section('content')
	<section>
		<form id="theForm" class="simform" autocomplete="off">
			<div class="simform-inner">
				<ol class="questions">
					<li>
						<span><label for="q1">What's your name?</label></span>
						<input id="q1" name="q1" type="text"/>
					</li>
					<li>
						<span><label for="q2">What do you do?</label></span>
						<input id="q2" name="q2" type="text"/>
					</li>
				</ol><!-- /questions -->
				<button class="submit" type="submit">Send answers</button>
				<div class="controls">
					<button class="next"></button>
					<button class="previous"></button>
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


