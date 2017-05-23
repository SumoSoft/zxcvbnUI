$.fn.zxcvbnUI = function (zxcvbnPath) {

    return this.each(function () {

        var passwordInput = $(this);

        passwordInput.after("<div id='indicator-wrapper' style='opacity: 0'><div id='password-strength-label'>Password strength</div><div id='strength-bar-wrapper'><div id='strength-bar'></div></div></div>");

        var indicatorWrapper = $("#indicator-wrapper");
        var passwordStrengthLabel = $("#password-strength-label");
        var strengthBarWrapper = $("#strength-bar-wrapper");
        var strengthBar = $("#strength-bar");

        indicatorWrapper.css({
            "display": "table",
            "width": "100%"
        });

        indicatorWrapper.children().css({
            "display": "table-cell"
        });

        passwordStrengthLabel.css({
            "width": "1%",
            "white-space": "nowrap"
        });

        strengthBarWrapper.css({
            "padding-left": "5%"
        });

        strengthBar.css({
            "padding": "0.3em",
            "width": "0"
        });

        function setStrengthBar(backgroundColor, width) {
            strengthBar
                .css({
                    "background-color": backgroundColor
                })
                .animate({
                    width: width
                }, "fast");
        }

        $.getScript(zxcvbnPath, () => {

            passwordInput.on("keyup", function () {

                var password = passwordInput.val();

                if (password.length > 0) {
                    indicatorWrapper.animate({ opacity: 1 });
                } else {
                    indicatorWrapper.animate({ opacity: 0 });
                }

                var score = zxcvbn(password).score;

                switch (score) {
                case 0:
                    setStrengthBar("red", "25%");
                    break;
                case 1:
                    setStrengthBar("orange", "50%");
                    break;
                case 2:
                    setStrengthBar("green", "75%");
                    break;
                case 3:
                case 4:
                    setStrengthBar("green", "100%");
                    break;
                }
            });
        });

    });
}