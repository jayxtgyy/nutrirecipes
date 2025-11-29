# NutriRecipes App

NutriRecipes App is a web application designed for cooking enthusiasts and health-conscious individuals.
Enter an ingredient you have on hand, and the app will generate nutritious recipes you can make at home.
xhN
## Table of Contents
**1.** [UX](#ux)  
**2.** [Features](#features)  
**3.** [Tech Stack](#tech-stack)  
**4.** [Installation & Setup](#installation-&-setup)  
**5.** [Usage](#usage)  
**6.** [Testing](#testing)  
**7.** [Deployment](#deployment)  
**8.** [Credits](#credits)  
**9.** [Contributing & License](#contributing-&-license)


## UX
### Project Goals
- Provide quick, healthy recipe ideas based on available ingredients.
- Offer intuitive browsing through cuisines and categories.
- Support users interested in improving their cooking habits and nutritional knowledge.

### Target Audience
- Home cooks
- Health-conscious users
- Busy individuals looking for quick meal ideas
- Beginner cooks

### Design Considerations
- Minimal, clean layout pair with serif font for microtext readability
- Bright, fresh colour palette associated with healthy food
- Clear call-to-action buttons
- Consistent spacing and simple navigation

### Accessibility
- Semantic HTML used throughout
- alt text applied to all images
- Sufficient colour contrast
- Clear, legible typography 

## Features
- **Ingredient-based Recipe Generation** : Input any ingredient and get recipe suggestions
- **Browse by Cuisine** : Explore recipes from various cuisines via a dropdown menu
- **Browse by Categories** : Check out recipes organized by categories for easy discovery
- **Weekly Nutrition Newsletter** : Subscribe to receive weekly updates with healthy recipe ideas
- **No API Keys Required** : Simple and hassle-free usage

## Tech Stack
- **Frontend** : HTML, CSS, Javascript
- **API** : TheMealDB for recipe data

## Installation & Setup
NutriRecipes App is fully web-based. Project accessible directly from GitHub; no local installation required. Simply open the HTML files in a web browser to use the app.

## Usage
**1. Search by Ingredients:** Enter the ingredient you have in the search form to generate recipes  
**2. Navigate through Pages:** Explore different sections of the app with the navigation menu  
**3. Select Cuisines:** Use the dropdown menu to filter recipes by cuisine  
**4. Browse Categories:** Click on category cards to view recipes within a specific category  
**5. Subscribe:** Enter your email to receive weekly nutrition newsletters

## Testing
Extensive manual testing was conducted to ensure full functionality and usability.

### Functional Testing

### Search
- Tested valid ingredient inputs (e.g., “chicken”, “egg”).
- Tested empty submissions — correct warning displays.
- Verified recipes render correctly from API results.

### Navigation
- All navbar links work and lead to correct pages.
- Cuisine dropdown loads appropriate recipe lists.
- Category cards open relevant categories successfully.

### Form Testing
- Newsletter subscription validates email input.
- Submission feedback operates correctly.

### Responsive Testing
Tested on:
- Desktop
- Tablet
- Mobile
Layouts adjust correctly using responsive CSS.

### Browser Compatibility
Confirmed working on:
- Chrome
- Firefox
- Safari
- Edge

### Error Handling
- Invalid ingredient searches show “No results” message.
- API failure handled with user-friendly error message.
Based on these tests, the site functions reliably across platforms and use cases.

## Deployment
The NutriRecipes App was deployed using GitHub Pages.

### Deployment Steps
**1.** Pushed all project files to GitHub repository.  
**2.** Navigated to Settings -> Pages.  
**3.** Selected the main branch as the source.  
**4.** Set the /root folder for deployment.  
**5.** Saved Settings and waited for GitHub Pages to publish the site.  
**6.** Final testing was performed on the live version to ensure functionality.  
Any updates pushed to the repository automatically update the live site

## Credits
### Content
- **Recipe data & images** : TheMealDB API
- **Icons (blue, purple, white, black)** : iStock, pngegg, PNGitem, kindpng

### Acknowledgements
- Thank you to open-source resources 

## Contributing & License
- This project is free to use for personal purposes.
- Contributions are **not allowed** at this time.
  
Access GitHub repo : [here](/https://github.com/jayxtgyy/nutrirecipes.git) .