# soloSphere-conceptual-v1

## Key Learnings from This Project

- **HTTP Methods Recap**: Reviewed GET, POST, Update, and Delete methods on the server-side.
- **Environment Variable Management**: Utilized `.env.local` to store API links securely.
- **Footer Fixation**: Implemented a fixed footer at the bottom of the page using `min-h-[calc(100vh-306px)]`.
- **Error Handling**: Incorporated try-catch blocks and async-await functions throughout the application for better error handling.
- **Custom Font Integration**: Learned how to integrate custom fonts with Tailwind CSS.
- **Update Method Shortcut**: Utilized `$set` with spread syntax (`...jobData`) in the HTTP PUT method to update all document data efficiently.
- **Package Integration**: Utilized npm packages like `react-tabs` and `date-fns` for the first time.
- **Image Loading Issue Resolution**: Addressed an issue where Google images sometimes didn't load after logging in with Google by adding `referrerPolicy='no-referrer'` to the `img` attribute.

### Example:

```html
<img referrerpolicy="no-referrer" .... />
```

- **Navbar Overflow Handling**: Utilized the `zen` class in Tailwind CSS to handle overflow in the navbar.
