<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StepsForm</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="/css/normalize.css" rel="stylesheet" type="text/css"/>
        <link href="/css/demo.css" rel="stylesheet" type="text/css"/>
        <!-- CUSTOM APP CSS -->
        <link href="/css/app.css" rel="stylesheet" type="text/css">
        <!-- MODERNIZR -->
        <script src="/js/modernizr.custom.js"></script>
    </head>
    <body>
        <div>
            @yield('content')
        </div>
        <!-- JAVASCRIPT BUILD -->
        <script src="/js/all.js" ></script>
        <script>
            var theForm = document.getElementById( 'theForm' );
            StepsForm( theForm, {
                onSubmit : function( form ) {
                    // hide form
                    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
                    
                    /*
                    form.submit()
                    or
                    AJAX request
                    */

                    // let's just simulate something...
                    var messageEl = theForm.querySelector( '.final-message' );
                    messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
                    classie.addClass( messageEl, 'show' );
                }
            } );
        </script>
    </body>
</html>
