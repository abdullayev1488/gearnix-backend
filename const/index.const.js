export const welcomeTemplate =`
 <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f4f4f9;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                    font-size: 18px;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to the API! 🎉</h1>
            <p>API version: 1.0.0</p>
            <p>Use the following endpoints to explore:</p>
            <ul>
                <li><a target="_blank" href="/category/all">/category/all</a></li>
            </ul>
        </body>
        </html>`