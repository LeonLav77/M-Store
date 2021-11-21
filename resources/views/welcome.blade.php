<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        function logout(){
            const options = {
                url: 'http://127.0.0.1:8000/logout',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                };
                axios(options)
            .then(response => {
                console.log(response.status);
            });
    }
    </script>
    <title>Document</title>
</head>
<body>
    <h1>WELCOME</h1>
    <a href="/register">register</a>
    <a href="/login">login</a>
    <button onClick="logout()">LOGOUT</button>
</body>
</html>