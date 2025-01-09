# Financial Data Filtering App

The **Financial Data Filtering App** is a responsive web application that allows users to fetch, filter, and analyze financial data for Apple Inc. The app leverages the Financial Modeling Prep API to display key financial metrics like revenue, net income, and more. Users can filter data by date, revenue, and net income ranges and sort it in ascending or descending order. The application is built using React and styled with TailwindCSS.

---

## **Features**

- Fetch annual income statements for Apple Inc. from the https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements.
- Filter data by:
  - Date range
  - Revenue range
  - Net income range
- Sort data by:
  - Date (ascending/descending)
  - Revenue (ascending/descending)
  - Net income (ascending/descending)
- Responsive design for mobile, tablet, and desktop devices.

---

## **Live Demo**

The application is deployed and available at:

- https://financial-data-filtering-app-ruby.vercel.app/

---

## **Technologies Used**

- **Frontend**: React, Axios, TailwindCSS
- **API**: https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
- **Hosting**: Vercel

---

## **Setup and Running the Application**

To set up and run the application locally, follow these instructions:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:
   - git clone https://github.com/sinha-gaurav-7/Financial-Data-Filtering-App.git
2. **Navigate to the Client Folder**: The frontend application is located in the client folder. Change your directory
   - cd client
3. **Install Dependencies**: Install the required npm packages
   - npm install
4. **Set Up Environment Variables**: The application requires an API key from the Financial Modeling Prep API to fetch data. Create a .env file in the client folder, refer to the .env.example file
5. **Run the Application**: Start the development server to launch the application
   - npm start
6. **Access the Application**: Open your browser and navigate to
   - http://localhost:3000/
