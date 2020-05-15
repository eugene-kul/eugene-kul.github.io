// $(document).on('ajaxSetup', function(event, context, msg) {
//         context.options.flash = true;
//         context.options.loading = $.oc.stripeLoadIndicator;
//         context.options.handleErrorMessage = function(message) {
//             if (message == 'A user was not found with the given credentials.') {
//                 message = 'Пользователя с таким логином и паролем не существует';
//             }
//             if (message == 'A user was found to match all plain text credentials however hashed credential "password" did not match.') {
//                 message = 'Пользователя с таким логином и паролем не существует';
//             }
//             if (message.indexOf("suspended") != -1) {
//                 message = 'Пользователь был заблокировн';
//             }
//             $.oc.flashMsg({ text: message, class: 'error' })
//         }
//
//         console.log(123);
// })



$(window).on('ajaxErrorMessage', function(event, message){
    if (!message) return

    console.log(123123)

    $.oc.alert(message)

    // Prevent the default alert() message
    event.preventDefault()
})

