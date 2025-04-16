# URL Shortener

A modern, feature-rich URL shortening service built with Node.js, Express, MySQL, and Tailwind CSS.

![URL Shortener Dashboard](https://i.imgur.com/example.png)

## Features

- **URL Shortening**: Create short, memorable links for long URLs
- **Custom Slugs**: Define your own custom short codes
- **Analytics**: Track clicks and view usage statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful interface with glass-morphism design
- **Copy to Clipboard**: Easily copy shortened URLs with one click
- **Pagination**: Navigate through your URLs efficiently
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Frontend**: EJS templates with Tailwind CSS
- **Icons**: Font Awesome
- **Animations**: Custom CSS animations
- **Responsive Design**: Mobile-first approach

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up the database**

Create a MySQL database and run the schema file:

```bash
mysql -u your_username -p your_database_name < src/models/schema.sql
```

4. **Configure environment variables**

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=url_shortener_db
PORT=5000
BASE_URL=http://localhost:5000
```

5. **Start the application**

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:5000`

## Usage

### Creating a Short URL

1. Enter a long URL in the input field on the home page
2. Optionally, enter a custom short code
3. Click "Shorten URL"
4. Copy the generated short URL or click "Open Link" to test it

### Managing URLs

1. Navigate to the Dashboard page
2. View all your shortened URLs
3. See click statistics for each URL
4. Copy URLs with the copy button
5. Delete URLs with the delete button
6. Navigate through pages using the pagination controls

### URL Analytics

The dashboard provides basic analytics for each URL:
- Total clicks
- Creation date
- Quick access to the original URL

## API Endpoints

### Create a Short URL
- **POST** `/api/urls/shorten`
- Body: `{ "originalUrl": "https://example.com", "customCode": "example" }`

### Get All URLs (Dashboard)
- **GET** `/api/urls/dashboard`
- Query params: `page` (default: 1), `limit` (default: 10)

### Delete a URL
- **DELETE** `/api/urls/:id`
- **POST** `/api/urls/delete/:id` (alternative for browsers)

### Redirect to Original URL
- **GET** `/:shortCode`

## Project Structure

```
url-shortener/
├── public/               # Static assets
│   ├── css/              # CSS files
│   ├── js/               # JavaScript files
│   └── images/           # Image files
├── src/
│   ├── config/           # Configuration files
│   │   └── db.js         # Database connection
│   ├── controllers/      # Route controllers
│   │   └── urlController.js
│   ├── models/           # Database models
│   │   ├── Url.js        # URL model
│   │   └── schema.sql    # Database schema
│   ├── routes/           # Route definitions
│   │   ├── index.js      # Main routes
│   │   └── urlRoutes.js  # URL-related routes
│   ├── views/            # EJS templates
│   │   ├── layouts/      # Layout templates
│   │   ├── dashboard.ejs # Dashboard page
│   │   ├── index.ejs     # Home page
│   │   └── error.ejs     # Error page
│   └── app.js            # Application entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Customization

### Changing the Theme

The application uses Tailwind CSS for styling. You can customize the colors in the `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize your color palette
        }
      }
    }
  }
}
```

### Modifying Templates

The EJS templates are located in the `src/views` directory. You can modify them to change the appearance of the application.

## Security Considerations

- The application validates URLs before shortening them
- Custom slugs are checked for uniqueness
- Database queries use parameterized statements to prevent SQL injection

## Performance

- The application uses connection pooling for database operations
- Static assets are served efficiently
- Pagination is implemented for large datasets

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/) - Web framework
- [MySQL](https://www.mysql.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [nanoid](https://github.com/ai/nanoid) - ID generation

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/url-shortener](https://github.com/yourusername/url-shortener)
