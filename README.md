# Tutorium Frontend
This repository has the codebase of Tutorium's frontend part. It is implemented with ReactJS and uses RedixUI with TailwindCSS for the UI/UX implementation.
## How to Run
### Locally
0. Prerequisites:
  - You need node with version 20.1
1. Clone the repository:
    ```shell
    git clone git@github.com:TheTutorium/frontend.git
2. Change the directory:
    ```shell
    cd frontend
3. Create .env.local file with your own clerk and backend connection information
    ```
    VITE_CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
    VITE_API_URL=<link_to_backend>
4. Install dependencies:
    ```shell
    npm install
5. Run the code:
    ```shell
    npm run dev
6. Now you can access docs of the frontend from the following link:  
    `localhost:5173`
