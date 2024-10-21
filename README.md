## Hotel Booking System - Back Office

The Hotel Booking System - Back Office is a web application built with React.js and Vite to manage and administer hotel reservations. It integrates with Supabase for data management and authentication, using modern web development practices for a smooth and dynamic admin experience.

### Features

- Role-based access control (Permanent and Anonymous users)
- Dashboard for managing reservations
- File upload capabilities for rooms images
- Real-time updates for reservation status
- Responsive design with Tailwind CSS
- Data management with Supabase

### Tech Stack

- React.js for the front-end
- Vite for a fast development experience
- React Query (Tanstack Query) for state management and data fetching
- Supabase for backend services (database, authentication, file storage)
- Tailwind CSS for styling
- Mosaic template for initial UI setup

### Installation

1 - Clone the repository:

1-1: `git clone https://github.com/OthmaneNissoukin/nextjs-hotel-booking-back-office.git`
1-1: `cd nextjs-hotel-booking-back-office`

2 - Install dependencies:

2-1: `npm install`

### Set up environment variables:

Create a .env file in the root directory and add the following configurations:

- `VITE_SUPABASE_KEY=`"your-supabase-key-here"
- `VITE_SUPABASE_IMGS_URL=`"https://your-supabase-instance-url-here/storage/v1/object/public/rooms-imgs"
- `VITE_SUPABASE_GENERAL_IMGS_URL=`"https://your-supabase-instance-url-here/storage/v1/object/public/general"

_Note:_ Replace your-supabase-key-here and the URLs with your actual Supabase configuration values.

## Run the development server:

`npm run dev`
Access the application: Open `http://localhost:5173 in your browser.

### Configuration

The project relies on the following environment variables:

- `VITE_SUPABASE_KEY:` Your Supabase project's public API key.
- `VITE_SUPABASE_IMGS_URL:` The base URL for the room images stored in Supabase storage.
- `VITE_SUPABASE_GENERAL_IMGS_URL:` The base URL for general images stored in Supabase storage.
