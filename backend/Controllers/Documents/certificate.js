module.exports = ({ name, courseTitle }) => {
        const today = new Date();
        return `
        <!doctype html>
<html>
    <head>
        <style type='text/css'>
            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: black;
                display: table;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;
            }
            .container {
                border: 20px solid tan;
                width: 1300px;
                height: 863px;
                display: table-cell;
                vertical-align: middle;
            }
            .logo {
                color: red;
            }

            .marquee {
                color: red;
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
            }
            .person {
                border-bottom: 2px solid black;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
            }
            .reason {
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
            <img src="https://cancham.org.eg/upload/logo.png" height="200" width="600">    
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                ${name}
            </div>

            <div class="reason">
                For finishing the ${courseTitle} course.
            </div>
            <br/>
            Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
        </div>
    </body>
</html>
`;
};