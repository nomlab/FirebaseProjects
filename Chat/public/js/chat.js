$(function() {
    var ref = new Firebase('https://your_project.firebaseio.com/');

    $('#messageInput').keypress(function(e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            var color = $('#colorInput').val();
            ref.push({name: name, text: text, color: color});
            $('#messageInput').val('');
            $('#colorInput').val('');
        }
    });

    $('#colorInput').keypress(function(e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            var color = $('#colorInput').val();
            console.log(name)
            ref.push({name: name, text: text, color: color});
            $('#colorInput').val('');
            $('#messageInput').val('');
        }
    });

    ref.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text, message.color);
    });

    function displayChatMessage(name, text, color) {
        $('<div/>').prepend($('<span/>').text(text).css("color", color)).prepend($('<span/>').addClass("name").text(name + ' : ')).prependTo('#messageList');
    };


    // Create user
    $('#submit-create-user').click(function(e) {
        var email = $('#create-user-email').val();
        var password = $('#create-user-password').val();
        if (!email || !password) {
            alert('メールアドレスとパスワードを入力してください');
            return false;
        }
        ref.createUser({
            email: email,
            password: password
        }, function(error, userData){
            if (error) {
                console.log("Failed to create user:", error);
            }else{
                console.log("Succeeded to create user:", userData);
                $('#create-user-modal').modal("hide");
            }
        });
    });

    // Authenticate user
    $('#submit-login').click(function(e) {
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        if (!email || !password) {
            alert('メールアドレスとパスワードを入力してください');
            return false;
        }
        ref.authWithPassword({
            email: email,
            password: password
        }, function(error, authData){
            if (error) {
                console.log("Failed to login:", error);
                alert(error)
            }else{
                console.log("Succeeded to login:", authData);
                $('#login-modal').modal("hide")
                // name = authData.password.email.split("@")[0];
                // ref.child("users/" + authData.uid).set({id: authData.uid, name: name})
            }
        });
    });
});
